# Solución: Error de Índice en Firestore

## Problema

Estás viendo este error en la consola del navegador:
```
FirebaseError: The query requires an index. You can create it here: [URL]
```

Este error ocurre porque la consulta en `documentService.js` combina un filtro (`where`) con un ordenamiento (`orderBy`), lo que requiere un índice compuesto en Firestore.

## Solución Rápida (2 minutos)

### Opción 1: Usar el enlace del error (RECOMENDADO)

1. **Abre la consola del navegador** (F12 o clic derecho > Inspeccionar > Console)
2. **Busca el error** que dice "The query requires an index"
3. **Copia la URL completa** que aparece después del mensaje (es una URL larga de Firebase Console)
4. **Abre esa URL en una nueva pestaña** del navegador
5. **Inicia sesión** en Firebase si es necesario
6. **Haz clic en el botón "Crear índice"** o **"Create index"**
7. **Espera 1-2 minutos** mientras Firebase crea el índice
8. **Recarga la página** de tu aplicación

¡Listo! El error debería desaparecer.

### Opción 2: Crear el índice manualmente

Si prefieres hacerlo manualmente o el enlace no funciona:

1. **Abre Firebase Console**: https://console.firebase.google.com/
2. **Selecciona tu proyecto** (oricen-project)
3. **Ve a Firestore Database**:
   - En el menú lateral izquierdo, haz clic en **"Build"** > **"Firestore Database"**
4. **Abre la pestaña "Indexes"** (Índices):
   - Haz clic en la pestaña **"Indexes"** en la parte superior
5. **Crea el índice**:
   - Haz clic en el botón **"+ Create Index"** o **"+ Crear índice"**
   - Completa el formulario:
     - **Collection ID**: `documents`
     - **Query scope**: Deja "Collection" (por defecto)
   - **Agrega los campos del índice**:
     - Haz clic en **"Add field"** o **"Agregar campo"**
     - Campo 1:
       - **Field path**: `userId`
       - **Order**: `Ascending` (Ascendente)
     - Campo 2:
       - **Field path**: `createdAt`
       - **Order**: `Descending` (Descendente)
   - Haz clic en **"Create"** o **"Crear"**
6. **Espera a que se cree**:
   - Verás el índice en estado "Building" (Construyendo)
   - Espera 1-2 minutos hasta que cambie a "Enabled" (Habilitado)
7. **Recarga tu aplicación** y el error debería desaparecer

## Verificación

Después de crear el índice:

1. Recarga la página de tu aplicación
2. Abre la consola del navegador (F12)
3. El error debería desaparecer
4. La sección "Mis Documentos" debería cargar correctamente

## Índices adicionales que podrías necesitar

Si más adelante ves errores similares para otras colecciones, crea estos índices:

### Para evaluaciones (`evaluations`)
- Collection: `evaluations`
- Campo 1: `userId` (Ascending)
- Campo 2: `createdAt` (Descending)

### Para citas (`appointments`)
- Collection: `appointments`
- Campo 1: `userId` (Ascending)
- Campo 2: `date` (Ascending)

### Para informes (`reports`)
- Collection: `reports`
- Campo 1: `userId` (Ascending)
- Campo 2: `createdAt` (Descending)

## ¿Por qué ocurre esto?

Firestore requiere índices compuestos cuando:
- Usas un filtro `where()` junto con un ordenamiento `orderBy()` en la misma consulta
- Esto es necesario para que las consultas sean eficientes en grandes volúmenes de datos

En tu código, la consulta problemática es:
```javascript
query(docsRef, where('userId', '==', userId), orderBy('createdAt', 'desc'))
```

Esta consulta filtra por `userId` y ordena por `createdAt`, por lo que necesita un índice compuesto en ambos campos.

## Solución permanente

Una vez creados los índices, no necesitarás crearlos de nuevo. Firebase los mantiene automáticamente y estarán disponibles para todas las consultas que los necesiten.

