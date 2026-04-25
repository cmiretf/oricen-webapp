import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomePage.vue'),
    meta: { title: 'Inicio | Orientación Vocacional | Oricen' },
  },
  {
    path: '/quienes-somos',
    name: 'quienes-somos',
    component: () => import('../pages/QuienesSomosPage.vue'),
    meta: { title: 'Quiénes somos | ORICEN' },
  },
  {
    path: '/programas-oricen',
    name: 'programas',
    component: () => import('../pages/ProgramasPage.vue'),
    meta: { title: 'Programas | ORICEN' },
  },
  {
    path: '/contact',
    name: 'contacto',
    component: () => import('../pages/ContactoPage.vue'),
    meta: { title: 'Contacto | ORICEN' },
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../pages/BlogPage.vue'),
    meta: { title: 'Blog | ORICEN' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.meta?.title) document.title = to.meta.title
})

export default router
