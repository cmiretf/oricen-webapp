import PortalLogin from './pages/PortalLogin.vue'
import UserPortal from './pages/UserPortal.vue'
import UserDocuments from './pages/UserDocuments.vue'
import UserForms from './pages/UserForms.vue'
import UserEvaluation from './pages/UserEvaluation.vue'
import UserAppointments from './pages/UserAppointments.vue'
import UserReports from './pages/UserReports.vue'
import AdminDashboard from './pages/AdminDashboard.vue'
import AdminUsers from './pages/AdminUsers.vue'
import AdminUserDetail from './pages/AdminUserDetail.vue'
import AdminForms from './pages/AdminForms.vue'
import AdminAppointments from './pages/AdminAppointments.vue'

export const portalRoutes = [
  { path: '/portal/login', component: PortalLogin },
  { path: '/portal', component: UserPortal, meta: { requiresAuth: true } },
  { path: '/portal/documentos', component: UserDocuments, meta: { requiresAuth: true } },
  { path: '/portal/formularios', component: UserForms, meta: { requiresAuth: true } },
  { path: '/portal/evaluacion', component: UserEvaluation, meta: { requiresAuth: true } },
  { path: '/portal/citas', component: UserAppointments, meta: { requiresAuth: true } },
  { path: '/portal/informes', component: UserReports, meta: { requiresAuth: true } },
  { 
    path: '/admin', 
    component: AdminDashboard, 
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { path: 'usuarios', component: AdminUsers },
      { path: 'usuarios/:id', component: AdminUserDetail },
      { path: 'formularios', component: AdminForms },
      { path: 'citas', component: AdminAppointments }
    ]
  }
]
