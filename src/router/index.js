import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import QuienesSomosPage from '../pages/QuienesSomosPage.vue'
import ServiciosPage from '../pages/ServiciosPage.vue'
import ContactoPage from '../pages/ContactoPage.vue'
import ComprarPage from '../pages/ComprarPage.vue'
import PoliticaPrivacidadPage from '../pages/PoliticaPrivacidadPage.vue'
import { portalRoutes } from '../portal/router'
import { auth, db } from '../portal/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const routes = [
  { path: '/', redirect: '/portal/login' },
  { path: '/quienes-somos', component: QuienesSomosPage },
  { path: '/servicios', component: ServiciosPage },
  { path: '/contacto', component: ContactoPage },
  { path: '/comprar', component: ComprarPage },
  { path: '/login', redirect: '/portal/login' },
  { path: '/politica-privacidad', component: PoliticaPrivacidadPage },
  ...portalRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

const waitForAuth = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}

const getUserRole = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid))
    return userDoc.exists() ? userDoc.data().role : 'user'
  } catch (e) {
    return 'user'
  }
}

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)

  if (!requiresAuth) {
    next()
    return
  }

  const user = await waitForAuth()
  
  if (!user) {
    next('/portal/login')
    return
  }

  if (requiresAdmin) {
    const role = await getUserRole(user.uid)
    if (role !== 'admin') {
      next('/portal')
      return
    }
  }

  next()
})

export default router
