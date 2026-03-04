# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server on port 5000
npm run build     # Production build
npm run preview   # Preview production build
```

No test suite is configured.

## Architecture

**Oricen** is a Vue 3 SPA for vocational guidance services. Backend is entirely Firebase (Auth, Firestore, Storage).

### Tech Stack
- Vue 3 with `<script setup>` (Composition API throughout)
- Vue Router 4 for client-side routing
- Firebase 12 (Auth, Firestore, Storage)
- Tailwind CSS 3
- Lucide Vue Next for icons
- Vite 5 as build tool

### Project Layout

```
src/
├── components/      # Global components: Header, Footer, Layout
├── pages/           # Public-facing pages (home, services, contact, etc.)
├── router/          # Main router with route guards
├── portal/          # All authenticated functionality
│   ├── firebase.js  # Firebase SDK init; reads env vars, falls back to firebase.config.local.js
│   ├── router.js    # Portal/admin routes with meta.requiresAuth / meta.requiresAdmin
│   ├── composables/
│   │   └── useAuth.js       # All auth logic (Google popup, email/password, user profile)
│   ├── components/          # PortalHeader, UserPortalLayout (sidebar nav)
│   ├── pages/               # 8 user pages + 5 admin pages
│   └── services/            # Firestore abstraction layer
│       ├── userService.js
│       ├── documentService.js
│       ├── appointmentService.js
│       ├── evaluationService.js
│       ├── formService.js
│       └── reportService.js
├── main.js          # App entry point
├── App.vue          # Root: conditionally shows Header/Footer for public vs portal routes
└── index.css        # Global styles + custom classes (.btn-primary, .btn-secondary, .fade-in)
```

### Routing & Layout

`App.vue` hides the public Header/Footer when the route path starts with `/portal` or `/admin`. Route guards in `src/router/index.js` check `meta.requiresAuth` and `meta.requiresAdmin`, call `waitForAuth()` (waits for Firebase auth state), then fetch role from Firestore before allowing navigation.

Public routes: `/`, `/quienes-somos`, `/servicios`, `/contacto`, `/comprar`, `/politica-privacidad`

Portal routes (authenticated): `/portal/login`, `/portal`, `/portal/documentos`, `/portal/formularios`, `/portal/evaluacion`, `/portal/citas`, `/portal/informes`, `/portal/perfil`

Admin routes (admin role required): `/admin`, `/admin/usuarios`, `/admin/usuarios/:id`, `/admin/formularios`, `/admin/citas`

### Authentication & User Model

`useAuth.js` manages auth state. On first login a user document is created in Firestore `users/{uid}` with:
- `role`: `'user'` | `'admin'`
- `serviceType`: `'A'` | `'B'` | `'C'` | `null` (assigned by admin)
- `status.documents`, `status.forms`, `status.evaluation`: `'pending'` | `'approved'` | `'completed'`

### Service Type Gating

Portal workflow sections unlock based on the user's `serviceType`:
- **A (Origen)**: Documents, Forms
- **B (Brújula)**: Documents, Evaluations
- **C (Atlas)**: Documents, Forms, Evaluations, Appointments, Reports

### Service Layer Pattern

All Firestore/Storage operations are in `src/portal/services/`. Components import from services and never call Firebase SDK directly. Each service exports named async functions.

### Environment Variables

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
```

`firebase.js` falls back to `src/portal/firebase.config.local.js` if env vars are absent (useful for local dev without a `.env` file).

### Styling Conventions

- Tailwind utility classes for all layout/spacing
- Brand primary blue: `#2B4C7E`, accent: `#88C0D0`
- Custom global classes defined in `index.css`: `.btn-primary`, `.btn-secondary`, `.fade-in`
- All UI text is in Spanish
