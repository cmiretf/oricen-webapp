import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import QuienesSomosPage from '../pages/QuienesSomosPage.vue'
import ServiciosPage from '../pages/ServiciosPage.vue'
import ContactoPage from '../pages/ContactoPage.vue'
import ComprarPage from '../pages/ComprarPage.vue'
import LoginPage from '../pages/LoginPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/quienes-somos', component: QuienesSomosPage },
  { path: '/servicios', component: ServiciosPage },
  { path: '/contacto', component: ContactoPage },
  { path: '/comprar', component: ComprarPage },
  { path: '/login', component: LoginPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
