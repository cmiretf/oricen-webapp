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
        <nav class="p-4 space-y-2">
          <router-link 
            to="/admin" 
            class="block px-4 py-2 rounded hover:bg-gray-100"
            :class="{ 'bg-[#2B4C7E] text-white hover:bg-[#1e3a5f]': $route.path === '/admin' }"
          >
            Dashboard
          </router-link>
          <router-link 
            to="/admin/usuarios" 
            class="block px-4 py-2 rounded hover:bg-gray-100"
            :class="{ 'bg-[#2B4C7E] text-white hover:bg-[#1e3a5f]': $route.path.includes('/admin/usuarios') }"
          >
            Usuarios
          </router-link>
          <router-link 
            to="/admin/formularios" 
            class="block px-4 py-2 rounded hover:bg-gray-100"
            :class="{ 'bg-[#2B4C7E] text-white hover:bg-[#1e3a5f]': $route.path.includes('/admin/formularios') }"
          >
            Formularios
          </router-link>
          <router-link 
            to="/admin/citas" 
            class="block px-4 py-2 rounded hover:bg-gray-100"
            :class="{ 'bg-[#2B4C7E] text-white hover:bg-[#1e3a5f]': $route.path.includes('/admin/citas') }"
          >
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
