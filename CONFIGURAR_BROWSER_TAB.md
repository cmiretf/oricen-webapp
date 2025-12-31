# Configurar Browser Tab en Firebase

Esta guía te explica cómo configurar los dominios autorizados en Firebase para poder usar browser tab (pestañas del navegador) con autenticación.

## ¿Qué es Browser Tab?

Browser tab es la funcionalidad que permite que Firebase Authentication abra una nueva pestaña del navegador para completar el proceso de autenticación, especialmente útil cuando tu aplicación está en un iframe o necesita redirecciones.

## Pasos para Configurar

### 1. Acceder a Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto (en este caso: `oricen-project`)

### 2. Ir a Authentication Settings

1. En el menú lateral izquierdo, haz clic en **"Build"** > **"Authentication"**
2. Haz clic en la pestaña **"Settings"** (Configuración)
3. Desplázate hasta la sección **"Authorized domains"** (Dominios autorizados)

### 3. Agregar Dominios

Haz clic en **"Add domain"** y agrega los siguientes dominios uno por uno:

#### Para Desarrollo Local:
```
localhost
```

#### Para Replit (si aplica):
```
tu-app.replit.dev
```
*(Reemplaza `tu-app` con el nombre real de tu aplicación en Replit)*

#### Para Producción:
```
tudominio.com
```
*(Reemplaza con tu dominio real)*

### 4. Formato Correcto de Dominios

**✅ CORRECTO:**
- `localhost`
- `oricen-webapp.xxxx.replit.dev`
- `tudominio.com`

**❌ INCORRECTO:**
- `http://localhost` (no incluir protocolo)
- `https://tudominio.com` (no incluir protocolo)
- `localhost:5173` (no incluir puerto)
- `tudominio.com/portal` (no incluir rutas)

### 5. Verificar Configuración

Después de agregar los dominios:

1. Verifica que aparezcan en la lista de dominios autorizados
2. Los cambios se aplican inmediatamente, pero pueden tardar 1-2 minutos en propagarse
3. Si estás probando localmente, asegúrate de que `localhost` esté en la lista

### 6. Probar la Configuración

1. Abre tu aplicación en el navegador
2. Intenta iniciar sesión con Google
3. Si todo está configurado correctamente, deberías poder:
   - Ver la página de autenticación de Google
   - Completar el login
   - Ser redirigido de vuelta a tu aplicación

## Solución de Problemas

### Error: "auth/unauthorized-domain"

**Causa**: El dominio desde el que intentas autenticarte no está en la lista de dominios autorizados.

**Solución**:
1. Verifica la URL exacta en la barra de direcciones de tu navegador
2. Copia solo el dominio (sin `http://`, `https://`, puerto o rutas)
3. Agrega ese dominio exacto en Firebase Console
4. Espera 1-2 minutos y vuelve a intentar

### Error: "auth/operation-not-allowed"

**Causa**: El método de autenticación (Google) no está habilitado.

**Solución**:
1. Ve a Authentication > Sign-in method
2. Haz clic en "Google"
3. Activa el interruptor "Enable"
4. Guarda los cambios

### Browser Tab no se abre

**Causa**: Puede ser un problema de configuración del navegador o del código.

**Solución**:
1. Verifica que estés usando `signInWithRedirect` en lugar de `signInWithPopup`
2. Asegúrate de que el dominio esté autorizado
3. Verifica que no haya bloqueadores de popups activos
4. Revisa la consola del navegador para ver errores específicos

## Dominios Pre-configurados

Firebase incluye automáticamente estos dominios:
- `localhost` (a veces, pero es mejor agregarlo manualmente)
- `[tu-proyecto].firebaseapp.com`
- `[tu-proyecto].web.app`

## Notas Importantes

- ⚠️ **No agregues dominios de terceros** que no controles
- ⚠️ **No incluyas protocolos** (http:// o https://)
- ⚠️ **No incluyas puertos** en los dominios
- ⚠️ **No incluyas rutas** (/portal, /admin, etc.)
- ✅ **Solo el dominio base** es necesario

## Ejemplo Completo

Si tu aplicación está en:
- Desarrollo: `http://localhost:5173/portal/login`
- Replit: `https://oricen-webapp.xxxx.replit.dev/portal/login`
- Producción: `https://oricen.com/portal/login`

Debes agregar:
- `localhost`
- `oricen-webapp.xxxx.replit.dev`
- `oricen.com`

## Referencias

- [Documentación oficial de Firebase - Authorized domains](https://firebase.google.com/docs/auth/web/redirect-best-practices)
- [Firebase Authentication - Browser Tab](https://firebase.google.com/docs/auth/web/redirect-best-practices)

