# Guia de Configuracion de Firebase para Oricen

Esta guia te explica paso a paso como configurar Firebase para el modulo de portal personalizado.

## Paso 1: Crear un proyecto en Firebase

1. Ve a la [Consola de Firebase](https://console.firebase.google.com/)
2. Haz clic en **"Agregar proyecto"** o **"Add project"**
3. Escribe un nombre para tu proyecto (por ejemplo: "oricen-portal")
4. Puedes desactivar Google Analytics si no lo necesitas
5. Haz clic en **"Crear proyecto"**

## Paso 2: Registrar tu aplicacion web

1. En la pagina principal de tu proyecto, haz clic en el icono **"Web"** (`</>`)
2. Escribe un nombre para la app (por ejemplo: "oricen-web")
3. NO marques la opcion de Firebase Hosting (no lo necesitamos)
4. Haz clic en **"Registrar app"**
5. **IMPORTANTE**: Copia los valores que aparecen:
   - `apiKey` -> Este es tu **VITE_FIREBASE_API_KEY**
   - `projectId` -> Este es tu **VITE_FIREBASE_PROJECT_ID**
   - `appId` -> Este es tu **VITE_FIREBASE_APP_ID**

## Paso 3: Activar Authentication

1. En el menu lateral izquierdo, ve a **"Build"** > **"Authentication"**
2. Haz clic en **"Comenzar"** o **"Get started"**
3. En la pestana **"Sign-in method"**, haz clic en **"Google"**
4. Activa el interruptor de **"Habilitar"**
5. Selecciona un correo de soporte del proyecto
6. Haz clic en **"Guardar"**

## Paso 4: Configurar dominios autorizados

1. Dentro de Authentication, ve a la pestana **"Settings"** (Configuracion)
2. Busca la seccion **"Authorized domains"** (Dominios autorizados)
3. Haz clic en **"Add domain"** y agrega la URL de tu Replit:
   - Para desarrollo: La URL que aparece en la barra de direcciones cuando ejecutas tu app (algo como `xxxx.replit.dev`)
   - Para produccion: Tu dominio personalizado o la URL de despliegue

## Paso 5: Crear la base de datos Firestore

1. En el menu lateral, ve a **"Build"** > **"Firestore Database"**
2. Haz clic en **"Crear base de datos"**
3. Selecciona **"Modo de produccion"** (Production mode)
4. Elige la ubicacion mas cercana a tus usuarios (Europa o USA)
5. Haz clic en **"Habilitar"**

## Paso 6: Configurar reglas de seguridad en Firestore

1. En Firestore, ve a la pestana **"Reglas"** (Rules)
2. Reemplaza el contenido por estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    function isOwner(userId) {
      return request.auth != null && request.auth.uid == userId;
    }
    
    // Usuarios: pueden leer sus datos, crear perfil inicial, pero NO cambiar role/serviceType
    match /users/{userId} {
      allow read: if isOwner(userId) || isAdmin();
      allow create: if request.auth != null && 
        request.auth.uid == userId &&
        request.resource.data.role == 'user' &&
        request.resource.data.serviceType == null;
      allow update: if isOwner(userId) && 
        request.resource.data.role == resource.data.role &&
        request.resource.data.serviceType == resource.data.serviceType;
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }
    
    // Documentos: propietario puede crear (status pendiente), admin todo
    match /documents/{docId} {
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || isAdmin());
      allow create: if isAdmin() || (
        request.auth != null &&
        request.resource.data.userId == request.auth.uid &&
        request.resource.data.status == 'pending' &&
        request.resource.data.uploadedBy == 'user'
      );
      allow update, delete: if isAdmin();
    }
    
    // Formularios: solo admin puede crear/editar, usuarios autenticados pueden leer
    match /forms/{formId} {
      allow read: if request.auth != null;
      allow write: if isAdmin();
    }
    
    // Respuestas a formularios: propietario puede crear/leer, admin todo
    match /formResponses/{responseId} {
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || isAdmin());
      allow create: if request.auth != null && 
        request.resource.data.userId == request.auth.uid;
      allow update: if request.auth != null && 
        (resource.data.userId == request.auth.uid || isAdmin());
      allow delete: if isAdmin();
    }
    
    // Evaluaciones: solo admin puede escribir, propietario puede leer
    match /evaluations/{evalId} {
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || isAdmin());
      allow write: if isAdmin();
    }
    
    // Claves de acceso: solo admin puede escribir, propietario puede leer
    match /accessKeys/{keyId} {
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || isAdmin());
      allow write: if isAdmin();
    }
    
    // Citas: propietario puede crear/leer, admin todo
    match /appointments/{aptId} {
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || isAdmin());
      allow create: if request.auth != null && 
        request.resource.data.userId == request.auth.uid;
      allow update, delete: if isAdmin();
    }
    
    // Slots disponibles: todos autenticados pueden leer, solo admin puede escribir
    match /availableSlots/{slotId} {
      allow read: if request.auth != null;
      allow write: if isAdmin();
    }
    
    // Informes: solo admin puede escribir, propietario puede leer
    match /reports/{reportId} {
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || isAdmin());
      allow write: if isAdmin();
    }
  }
}
```

3. Haz clic en **"Publicar"**

## Paso 7: Configurar Storage

1. En el menu lateral, ve a **"Build"** > **"Storage"**
2. Haz clic en **"Comenzar"**
3. Acepta las reglas de seguridad por defecto
4. Selecciona la ubicacion (la misma que Firestore)
5. Ve a la pestana **"Rules"** y reemplaza por:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

**Nota sobre el funcionamiento**: 
- Los usuarios suben archivos a su propia carpeta (`users/{userId}/`)
- Los administradores tambien suben archivos a su propia carpeta, pero el sistema guarda la referencia (URL) en Firestore asociada al usuario destino
- Los usuarios pueden ver y descargar todos los documentos/informes que les corresponden a traves de las URLs almacenadas en Firestore
- Esta arquitectura permite que las reglas de Storage sean simples mientras Firestore maneja los permisos de acceso a los metadatos

6. Haz clic en **"Publicar"**

## Paso 8: Crear el primer usuario administrador

1. Una vez configurado todo, accede al portal de tu aplicacion
2. Inicia sesion con Google
3. Ve a la consola de Firebase > Firestore Database
4. Busca la coleccion `users`
5. Haz clic en el documento de tu usuario
6. Cambia el campo `role` de `"user"` a `"admin"`
7. Guarda los cambios

Ahora tienes acceso al panel de administracion en `/admin`

## Resumen de URLs del portal

- **/portal/login** - Pagina de inicio de sesion
- **/portal** - Area personal del usuario
- **/portal/documentos** - Seccion de documentos
- **/portal/formularios** - Seccion de formularios
- **/portal/evaluacion** - Seccion de evaluaciones
- **/portal/citas** - Seccion de calendario y citas
- **/portal/informes** - Seccion de informes finales
- **/admin** - Panel de administracion (solo admins)
- **/admin/usuarios** - Gestion de usuarios
- **/admin/formularios** - Gestion de formularios
- **/admin/citas** - Gestion de citas

## Servicios y secciones

Cada tipo de servicio muestra secciones diferentes:

| Servicio | Documentos | Formularios | Evaluacion | Calendario | Informes |
|----------|------------|-------------|------------|------------|----------|
| A (Origen) | Si | Si | No | No | No |
| B (Brujula) | Si | No | Si | No | No |
| C (Atlas) | Si | Si | Si | Si | Si |

## Soporte

Si tienes problemas con la configuracion, verifica:
1. Que los dominios estan correctamente autorizados en Authentication
2. Que las reglas de Firestore y Storage estan publicadas
3. Que los secretos estan correctamente configurados en Replit
