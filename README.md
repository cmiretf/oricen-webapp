# Oricen - Plataforma de Orientación Vocacional Profesional

Aplicación web desarrollada con **Vue.js 3** para orientación vocacional profesional. Incluye un sitio público de marketing y un portal privado basado en Firebase para la gestión de usuarios y procesos.

---

## Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración del Entorno](#configuración-del-entorno)
- [Scripts Disponibles](#scripts-disponibles)
- [Arquitectura](#arquitectura)
- [Módulo Portal](#módulo-portal)
- [Base de Datos Firestore](#base-de-datos-firestore)
- [Planes de Servicio](#planes-de-servicio)
- [Despliegue](#despliegue)

---

## Descripción

Oricen es una plataforma profesional de orientación vocacional dirigida a estudiantes e instituciones educativas. Consta de dos partes principales:

- **Sitio público**: Páginas de marketing, información de servicios, contacto y compra.
- **Portal privado**: Área autenticada con Firebase para gestión de usuarios, documentos, formularios, evaluaciones, citas e informes.

---

## Tecnologías

### Frontend
| Tecnología | Versión | Uso |
|---|---|---|
| Vue.js | 3.5.26 | Framework principal |
| Vue Router | 4.6.4 | Enrutamiento cliente |
| Vite | 5.4.21 | Bundler y servidor de desarrollo |

### Estilos
| Tecnología | Versión | Uso |
|---|---|---|
| Tailwind CSS | 3.4.19 | Framework de utilidades CSS |
| PostCSS | 8.5.6 | Transformación CSS |
| Autoprefixer | 10.4.23 | Prefijos de vendor automáticos |

### UI
| Tecnología | Versión | Uso |
|---|---|---|
| Lucide Vue Next | 0.292.0 | Librería de iconos SVG |

### Backend y Servicios
| Tecnología | Versión | Uso |
|---|---|---|
| Firebase | 12.7.0 | Auth, Firestore, Storage |

---

## Estructura del Proyecto

```
oricen-webapp/
├── index.html                          # Punto de entrada HTML
├── package.json                        # Dependencias y scripts
├── vite.config.js                      # Configuración de Vite
├── tailwind.config.js                  # Configuración de Tailwind CSS
├── postcss.config.js                   # Configuración de PostCSS
├── .gitignore
└── src/
    ├── main.js                         # Punto de entrada de Vue
    ├── App.vue                         # Componente raíz
    ├── index.css                       # Estilos globales + Tailwind
    ├── assets/
    │   ├── logo.avif                   # Logo de Oricen
    │   ├── collaborators.png           # Imagen de colaboradores
    │   └── images/
    │       └── modern_university.jpg   # Imagen hero principal
    ├── components/                     # Componentes públicos reutilizables
    │   ├── Header.vue                  # Cabecera con navegación responsive
    │   ├── Footer.vue                  # Pie de página con redes y contacto
    │   └── Layout.vue                  # Wrapper con animación fade-in
    ├── pages/                          # Páginas del sitio público
    │   ├── HomePage.vue                # Inicio: hero, estadísticas, especialistas
    │   ├── QuienesSomosPage.vue        # Quiénes somos: misión y visión
    │   ├── ServiciosPage.vue           # Planes de servicio (Origen, Brújula, Atlas)
    │   ├── ContactoPage.vue            # Formulario de contacto
    │   ├── ComprarPage.vue             # Página de compra
    │   └── PoliticaPrivacidadPage.vue  # Política de privacidad
    ├── router/
    │   └── index.js                    # Configuración principal del router
    └── portal/                         # Módulo portal (autenticado)
        ├── firebase.js                 # Inicialización de Firebase
        ├── router.js                   # Rutas del portal
        ├── composables/
        │   └── useAuth.js              # Composable de autenticación
        ├── components/
        │   ├── PortalHeader.vue        # Cabecera del portal
        │   └── UserPortalLayout.vue    # Layout con sidebar del portal
        ├── services/                   # Capa de servicios Firestore
        │   ├── userService.js          # CRUD de usuarios
        │   ├── documentService.js      # Gestión de archivos
        │   ├── formService.js          # Formularios dinámicos
        │   ├── evaluationService.js    # Evaluaciones y claves de acceso
        │   ├── appointmentService.js   # Calendario y citas
        │   └── reportService.js        # Informes finales
        └── pages/                      # Páginas del portal
            ├── PortalLogin.vue         # Login (Google + Email/Contraseña)
            ├── UserPortal.vue          # Dashboard del usuario
            ├── UserDocuments.vue       # Gestión de documentos
            ├── UserForms.vue           # Completar formularios
            ├── UserEvaluation.vue      # Acceso a evaluaciones
            ├── UserAppointments.vue    # Reserva de citas
            ├── UserProfile.vue         # Perfil y configuración
            ├── UserReports.vue         # Descarga de informes
            ├── AdminDashboard.vue      # Panel de administración
            ├── AdminUsers.vue          # Gestión de usuarios
            ├── AdminUserDetail.vue     # Detalle de usuario individual
            ├── AdminForms.vue          # Creación de formularios
            └── AdminAppointments.vue   # Gestión de citas (admin)
```

---

## Configuración del Entorno

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de Firebase:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_APP_ID=tu_app_id
```

> Para desarrollo local también puedes crear `src/portal/firebase.config.local.js` (ya incluido en `.gitignore`).

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

---

## Scripts Disponibles

```bash
# Desarrollo — servidor en http://localhost:5000 con HMR
npm run dev

# Producción — genera carpeta dist/ optimizada
npm run build

# Preview — previsualización del build de producción
npm run preview
```

---

## Arquitectura

### Enrutamiento

#### Rutas Públicas (`src/router/index.js`)

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | HomePage | Página de inicio |
| `/quienes-somos` | QuienesSomosPage | Misión y visión |
| `/servicios` | ServiciosPage | Planes y precios |
| `/contacto` | ContactoPage | Formulario de contacto |
| `/comprar` | ComprarPage | Página de compra |
| `/politica-privacidad` | PoliticaPrivacidadPage | Política de privacidad |
| `/login` | — | Redirige a `/portal/login` |

#### Rutas del Portal (`src/portal/router.js`)

| Ruta | Componente | Protección |
|---|---|---|
| `/portal/login` | PortalLogin | Pública |
| `/portal` | UserPortal | `requiresAuth` |
| `/portal/documentos` | UserDocuments | `requiresAuth` |
| `/portal/formularios` | UserForms | `requiresAuth` |
| `/portal/evaluacion` | UserEvaluation | `requiresAuth` |
| `/portal/citas` | UserAppointments | `requiresAuth` |
| `/portal/informes` | UserReports | `requiresAuth` |
| `/portal/perfil` | UserProfile | `requiresAuth` |
| `/admin` | AdminDashboard | `requiresAdmin` |
| `/admin/usuarios` | AdminUsers | `requiresAdmin` |
| `/admin/usuarios/:id` | AdminUserDetail | `requiresAdmin` |
| `/admin/formularios` | AdminForms | `requiresAdmin` |
| `/admin/citas` | AdminAppointments | `requiresAdmin` |

### Guards de Ruta

- `meta.requiresAuth: true` — Requiere sesión activa.
- `meta.requiresAdmin: true` — Requiere rol `admin` en Firestore.

### Autenticación (`useAuth.js`)

El composable `useAuth` expone:

```javascript
const {
  user,          // Usuario Firebase actual
  userRole,      // "admin" | "user"
  userProfile,   // Documento Firestore del usuario
  loading,
  error,
  loginWithGoogle,
  loginWithEmail,
  registerWithEmail,
  logout,
  isAdmin,
  isUser,
} = useAuth()
```

---

## Módulo Portal

### Servicios (`src/portal/services/`)

#### `userService.js`
- `getAllUsers()` — Lista todos los usuarios ordenados por fecha.
- `getUserById(uid)` — Obtiene un usuario por ID.
- `updateUser(uid, data)` — Actualiza documento de usuario.
- `setUserRole(uid, role)` — Asigna rol al usuario.
- `setUserService(uid, serviceType)` — Asigna plan de servicio.
- `getUsersByService(serviceType)` — Filtra usuarios por plan.

#### `documentService.js`
- `uploadDocument(userId, file, metadata)` — Sube archivo a Storage y registra en Firestore.
- `getUserDocuments(userId)` — Obtiene documentos del usuario.
- `updateDocumentStatus(docId, status)` — Cambia estado de aprobación.
- `deleteDocument(docId, storagePath)` — Elimina de Storage y Firestore.

#### `formService.js`
- `createForm(formData)` — Crea plantilla de formulario.
- `getFormsByService(serviceType)` — Obtiene formularios por plan.
- `getUserFormResponses(userId)` — Respuestas del usuario.
- `saveFormResponse(userId, formId, responses)` — Guarda o actualiza respuesta.

#### `evaluationService.js`
- `createEvaluation(userId, evaluationData)` — Crea evaluación.
- `getUserEvaluations(userId)` — Evaluaciones del usuario.
- `updateEvaluationStatus(evalId, status)` — Actualiza estado.
- `addAccessKey(userId, keyData)` — Genera clave de acceso.
- `getUserAccessKeys(userId)` — Claves del usuario.

#### `appointmentService.js`
- `createAppointment(userId, data)` — Crea cita.
- `getUserAppointments(userId)` — Citas del usuario.
- `getAllAppointments()` — Todas las citas (admin).
- `updateAppointment(appointmentId, data)` — Actualiza cita.
- `updateAppointmentStatus(appointmentId, status)` — Cambia estado.
- `deleteAppointment(appointmentId)` — Elimina cita.
- `getAvailableSlots(date)` — Slots disponibles para fecha.
- `createAvailableSlot(slotData)` — Crea slot disponible.

#### `reportService.js`
- `uploadReport(userId, file, metadata)` — Sube informe (solo admin).
- `getUserReports(userId)` — Informes del usuario.
- `deleteReport(reportId, storagePath)` — Elimina informe.

---

## Base de Datos Firestore

### Colección `users`
```javascript
{
  uid: string,
  email: string,
  displayName: string,
  photoURL: string | null,
  role: "user" | "admin",
  serviceType: "A" | "B" | "C" | null,
  status: {
    documents: "pending" | "approved",
    forms: "pending" | "completed",
    evaluation: "pending" | "completed"
  },
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Colección `documents`
```javascript
{
  userId: string,
  uploaderId: string,
  fileName: string,
  fileType: string,
  fileSize: number,
  storagePath: string,
  downloadURL: string,
  status: "pending" | "approved",
  uploadedBy: "user" | "admin",
  category: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Colección `forms` / `formResponses`
```javascript
// forms
{ serviceType, title, fields: array, createdAt, updatedAt }

// formResponses
{ userId, formId, responses: object, status: "pending" | "completed", createdAt, updatedAt }
```

### Colección `appointments` / `availableSlots`
```javascript
// appointments
{ userId, date, time, title, description, status: "pending" | "confirmed" | "cancelled", createdAt, updatedAt }

// availableSlots
{ date, time, booked: boolean, createdAt }
```

### Colección `evaluations` / `accessKeys`
```javascript
// evaluations
{ userId, status: "pending" | "in_progress" | "completed", createdAt, updatedAt }

// accessKeys
{ userId, key: string, used: boolean, createdAt }
```

### Colección `reports`
```javascript
{
  userId, uploaderId, fileName, fileType, fileSize,
  storagePath, downloadURL, title, description,
  createdAt, updatedAt
}
```

---

## Planes de Servicio

| Plan | Código | Incluye |
|---|---|---|
| **Origen** | A | Documentos + Formularios |
| **Brújula** | B | Documentos + Evaluación |
| **Atlas** | C | Proceso completo (todo) |

---

## Sistema de Estilos

### Colores Principales
| Variable | Valor | Uso |
|---|---|---|
| Primary | `#2B4C7E` | Azul oscuro corporativo |
| Secondary | `#88C0D0` | Azul claro |
| Background | `#f8fafc` | Fondo general |

### Clases Personalizadas (`src/index.css`)
```css
.btn-primary   /* Botón azul primario */
.btn-secondary /* Botón gris secundario */
.fade-in       /* Animación de entrada de página */
```

---

## Despliegue

### Replit (Configuración Actual)

El proyecto está configurado para desplegarse en Replit con autoescalado:

```
Puerto interno 5000  →  Puerto externo 80   (aplicación web)
Puerto interno 5001  →  Puerto externo 3000 (dev server)
```

Variables de entorno configuradas en Replit Secrets:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_ID`

### Build de Producción

```bash
npm run build
# Genera dist/ con activos optimizados y minificados
```

---

## Documentación Adicional

| Archivo | Descripción |
|---|---|
| `GUIA_FIREBASE.md` | Guía paso a paso para configurar Firebase |
| `CONFIGURAR_BROWSER_TAB.md` | Configuración del tab de navegador para auth |
| `SOLUCION_INDICE_FIRESTORE.md` | Soluciones para índices de Firestore |

---

## Licencia

Proyecto privado — Todos los derechos reservados © Oricen.

