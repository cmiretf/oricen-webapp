<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <img :src="logo" alt="Oricen Logo" class="h-12 w-auto" />
          <h1 class="text-xl font-bold text-gray-900">Mi Portal Personal</h1>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <img v-if="user?.photoURL" :src="user.photoURL" alt="Avatar" class="w-8 h-8 rounded-full" />
            <span class="text-sm text-gray-600">{{ user?.displayName }}</span>
          </div>
          <button @click="handleLogout" class="text-sm text-red-600 hover:text-red-800">
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B4C7E] mx-auto"></div>
      </div>

      <div v-else-if="!userProfile?.serviceType" class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <h2 class="text-xl font-bold text-yellow-800 mb-2">Servicio no asignado</h2>
        <p class="text-yellow-700">Tu cuenta está pendiente de asignación de servicio. El administrador te asignará un plan pronto.</p>
      </div>

      <div v-else>
        <div class="mb-8">
          <span class="inline-block px-3 py-1 bg-[#2B4C7E] text-white rounded-full text-sm font-medium">
            Servicio: {{ getServiceName(userProfile.serviceType) }}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link 
            v-if="hasSection('documents')"
            to="/portal/documentos" 
            class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div class="text-4xl mb-4">📁</div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Documentación</h3>
            <p class="text-gray-600 text-sm">Sube y gestiona tus documentos</p>
          </router-link>

          <router-link 
            v-if="hasSection('forms')"
            to="/portal/formularios" 
            class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div class="text-4xl mb-4">📝</div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Formularios</h3>
            <p class="text-gray-600 text-sm">Completa los formularios requeridos</p>
          </router-link>

          <router-link 
            v-if="hasSection('evaluation')"
            to="/portal/evaluacion" 
            class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div class="text-4xl mb-4">🧪</div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Evaluación</h3>
            <p class="text-gray-600 text-sm">Accede a tus pruebas y evaluaciones</p>
          </router-link>

          <router-link 
            v-if="hasSection('calendar')"
            to="/portal/citas" 
            class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div class="text-4xl mb-4">📅</div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Calendario y Citas</h3>
            <p class="text-gray-600 text-sm">Reserva y gestiona tus citas</p>
          </router-link>

          <router-link 
            v-if="hasSection('reports')"
            to="/portal/informes" 
            class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div class="text-4xl mb-4">📄</div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Informe Final</h3>
            <p class="text-gray-600 text-sm">Descarga tu informe personalizado</p>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import logo from '../../assets/logo.avif'

const router = useRouter()
const { user, userProfile, loading, logout, initAuth } = useAuth()

initAuth()

const serviceConfig = {
  A: { sections: ['documents', 'forms'], name: 'Origen' },
  B: { sections: ['documents', 'evaluation'], name: 'Brújula' },
  C: { sections: ['documents', 'forms', 'evaluation', 'calendar', 'reports'], name: 'Atlas' }
}

const hasSection = (section) => {
  const service = userProfile.value?.serviceType
  if (!service) return false
  return serviceConfig[service]?.sections.includes(section)
}

const getServiceName = (type) => {
  return serviceConfig[type]?.name || type
}

const handleLogout = async () => {
  await logout()
  router.push('/portal/login')
}
</script>
