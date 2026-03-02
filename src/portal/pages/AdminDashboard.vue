<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-[#2B4C7E] text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <img :src="logo" alt="Oricen Logo" class="h-12 w-auto" />
          <h1 class="text-xl font-bold">Panel de Administración</h1>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-sm opacity-80">{{ user?.email }}</span>
          <button @click="handleLogout" class="text-sm hover:underline">
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>

    <div class="flex">
      <aside class="w-64 bg-white shadow-sm min-h-[calc(100vh-72px)]">
        <nav class="p-4 space-y-1">
          <router-link 
            to="/admin" 
            class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            :class="$route.path === '/admin' ? 'bg-[#2B4C7E] text-white' : 'text-gray-700 hover:bg-gray-100'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            Dashboard
          </router-link>
          <router-link 
            to="/admin/usuarios" 
            class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            :class="$route.path.includes('/admin/usuarios') ? 'bg-[#2B4C7E] text-white' : 'text-gray-700 hover:bg-gray-100'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            Usuarios
          </router-link>
          <router-link 
            to="/admin/formularios" 
            class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            :class="$route.path.includes('/admin/formularios') ? 'bg-[#2B4C7E] text-white' : 'text-gray-700 hover:bg-gray-100'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Formularios
          </router-link>
          <router-link 
            to="/admin/citas" 
            class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            :class="$route.path.includes('/admin/citas') ? 'bg-[#2B4C7E] text-white' : 'text-gray-700 hover:bg-gray-100'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Citas
          </router-link>
        </nav>
      </aside>

      <main class="flex-1 p-8">
        <router-view v-if="$route.path !== '/admin'" />
        
        <div v-else>
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Resumen General</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-lg shadow p-6">
              <p class="text-3xl font-bold text-[#2B4C7E]">{{ stats.totalUsers }}</p>
              <p class="text-gray-600">Usuarios registrados</p>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
              <p class="text-3xl font-bold text-green-600">{{ stats.activeServices }}</p>
              <p class="text-gray-600">Servicios activos</p>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
              <p class="text-3xl font-bold text-yellow-600">{{ stats.pendingAppointments }}</p>
              <p class="text-gray-600">Citas pendientes</p>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
              <p class="text-3xl font-bold text-blue-600">{{ stats.pendingDocuments }}</p>
              <p class="text-gray-600">Documentos por revisar</p>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Últimos usuarios registrados</h3>
            <div v-if="recentUsers.length > 0" class="space-y-3">
              <div 
                v-for="user in recentUsers" 
                :key="user.id"
                class="flex items-center justify-between p-3 bg-gray-50 rounded"
              >
                <div class="flex items-center gap-3">
                  <img v-if="user.photoURL" :src="user.photoURL" class="w-10 h-10 rounded-full" />
                  <div v-else class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    {{ user.displayName?.charAt(0) || '?' }}
                  </div>
                  <div>
                    <p class="font-medium">{{ user.displayName || user.email }}</p>
                    <p class="text-sm text-gray-500">{{ user.email }}</p>
                  </div>
                </div>
                <span 
                  :class="user.serviceType ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                  class="px-2 py-1 rounded text-xs font-medium"
                >
                  {{ user.serviceType || 'Sin servicio' }}
                </span>
              </div>
            </div>
            <p v-else class="text-gray-500">No hay usuarios registrados</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { userService } from '../services/userService'
import { appointmentService } from '../services/appointmentService'
import { db } from '../firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import logo from '../../assets/logo.avif'

const router = useRouter()
const { user, userRole, logout, initAuth } = useAuth()
initAuth()

const stats = ref({
  totalUsers: 0,
  activeServices: 0,
  pendingAppointments: 0,
  pendingDocuments: 0
})

const recentUsers = ref([])

const loadDashboard = async () => {
  try {
    const users = await userService.getAllUsers()
    const appointments = await appointmentService.getAllAppointments()
    
    const docsRef = collection(db, 'documents')
    const pendingDocsQuery = query(docsRef, where('status', '==', 'pending'))
    const pendingDocsSnapshot = await getDocs(pendingDocsQuery)
    
    stats.value.totalUsers = users.length
    stats.value.activeServices = users.filter(u => u.serviceType).length
    stats.value.pendingAppointments = appointments.filter(a => a.status === 'pending').length
    stats.value.pendingDocuments = pendingDocsSnapshot.docs.length
    
    recentUsers.value = users.slice(0, 5)
  } catch (err) {
    console.error('Error loading dashboard:', err)
  }
}

const handleLogout = async () => {
  await logout()
  router.push('/portal/login')
}

onMounted(loadDashboard)
</script>
