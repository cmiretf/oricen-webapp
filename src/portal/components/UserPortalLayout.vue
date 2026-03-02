<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <router-link to="/portal" class="flex items-center gap-3">
            <img :src="logo" alt="Oricen Logo" class="h-10 w-auto" />
            <span class="text-lg font-bold text-[#2B4C7E] hidden sm:inline">ORICEN</span>
          </router-link>
        </div>
        <div class="flex items-center gap-4">
          <div class="hidden sm:flex items-center gap-2 text-sm text-gray-600">
            <div class="w-8 h-8 bg-[#2B4C7E] text-white rounded-full flex items-center justify-center text-sm font-medium">
              {{ userInitial }}
            </div>
            <span>{{ user?.displayName || user?.email }}</span>
          </div>
          <button @click="handleLogout" class="text-sm text-gray-500 hover:text-red-600 transition-colors">
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>

    <div class="flex flex-1">
      <button
        @click="sidebarOpen = !sidebarOpen"
        class="md:hidden fixed bottom-4 left-4 z-40 bg-[#2B4C7E] text-white p-3 rounded-full shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div
        v-if="sidebarOpen"
        class="md:hidden fixed inset-0 bg-black/40 z-30"
        @click="sidebarOpen = false"
      ></div>

      <aside
        :class="[
          'fixed md:sticky top-0 md:top-[57px] left-0 z-30 md:z-0',
          'w-64 bg-white border-r border-gray-200 md:min-h-[calc(100vh-57px)] h-full md:h-auto',
          'transform transition-transform duration-200 md:transform-none',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        ]"
      >
        <nav class="p-4 pt-6 space-y-1">
          <router-link
            to="/portal"
            @click="sidebarOpen = false"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
            :class="isActive('/portal') ? 'bg-[#2B4C7E] text-white' : 'text-gray-700 hover:bg-gray-100'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Inicio
          </router-link>

          <router-link
            v-if="hasSection('documents')"
            to="/portal/documentos"
            @click="sidebarOpen = false"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
            :class="isActive('/portal/documentos') ? 'bg-[#2B4C7E] text-white' : 'text-gray-700 hover:bg-gray-100'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Buzón
          </router-link>

          <router-link
            v-if="hasSection('forms')"
            to="/portal/formularios"
            @click="sidebarOpen = false"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
            :class="isActive('/portal/formularios') ? 'bg-[#2B4C7E] text-white' : 'text-gray-700 hover:bg-gray-100'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Formularios
          </router-link>

          <router-link
            v-if="hasSection('evaluation')"
            to="/portal/evaluacion"
            @click="sidebarOpen = false"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
            :class="isActive('/portal/evaluacion') ? 'bg-[#2B4C7E] text-white' : 'text-gray-700 hover:bg-gray-100'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Evaluación
          </router-link>

          <router-link
            v-if="hasSection('calendar')"
            to="/portal/citas"
            @click="sidebarOpen = false"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
            :class="isActive('/portal/citas') ? 'bg-[#2B4C7E] text-white' : 'text-gray-700 hover:bg-gray-100'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Reserva
          </router-link>

          <router-link
            v-if="hasSection('reports')"
            to="/portal/informes"
            @click="sidebarOpen = false"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
            :class="isActive('/portal/informes') ? 'bg-[#2B4C7E] text-white' : 'text-gray-700 hover:bg-gray-100'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Informe
          </router-link>

          <div class="pt-4 border-t border-gray-200 mt-4">
            <router-link
              to="/portal/perfil"
              @click="sidebarOpen = false"
              class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
              :class="isActive('/portal/perfil') ? 'bg-[#2B4C7E] text-white' : 'text-gray-700 hover:bg-gray-100'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Perfil
            </router-link>
          </div>
        </nav>
      </aside>

      <main class="flex-1 p-6 md:p-8 overflow-auto">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import logo from '../../assets/logo.avif'

const route = useRoute()
const router = useRouter()
const { user, userProfile, logout } = useAuth()

const sidebarOpen = ref(false)

const serviceConfig = {
  A: ['documents', 'forms'],
  B: ['documents', 'evaluation'],
  C: ['documents', 'forms', 'evaluation', 'calendar', 'reports']
}

const hasSection = (section) => {
  const service = userProfile.value?.serviceType
  if (!service) return false
  return serviceConfig[service]?.includes(section)
}

const isActive = (path) => {
  if (path === '/portal') {
    return route.path === '/portal'
  }
  return route.path.startsWith(path)
}

const userInitial = computed(() => {
  const name = user.value?.displayName || user.value?.email || '?'
  return name.charAt(0).toUpperCase()
})

const handleLogout = async () => {
  await logout()
  router.push('/portal/login')
}
</script>
