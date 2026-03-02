<template>
  <UserPortalLayout>
    <div class="max-w-3xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Entrega del Informe</h1>
      <p class="text-gray-600 mb-6">
        <span class="font-semibold">Instrucciones:</span> El informe de orientación vocacional se cargará en esta sección en plazo máximo 7 días hábiles a partir de la finalización de todas las evaluaciones.
      </p>

      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B4C7E] mx-auto"></div>
      </div>

      <div v-else-if="error" class="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
        <p class="text-yellow-800 font-medium mb-2">{{ error }}</p>
        <button @click="loadReports" class="text-[#2B4C7E] hover:underline text-sm font-medium">Reintentar</button>
      </div>

      <div v-else-if="reports.length === 0" class="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 class="text-lg font-bold text-gray-900 mb-2">Descargar Informe</h2>
        <p class="text-gray-500">Disponible a partir de [Fecha Aproximada]</p>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="report in reports"
          :key="report.id"
          class="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900">{{ report.title }}</h3>
                <p v-if="report.description" class="text-gray-600 text-sm mt-1">{{ report.description }}</p>
                <p class="text-gray-500 text-xs mt-2">Subido el {{ formatDate(report.createdAt) }}</p>
              </div>
            </div>
            <a
              :href="report.downloadURL"
              target="_blank"
              class="px-5 py-2.5 bg-[#2B4C7E] text-white rounded-lg font-medium hover:bg-[#1a3a61] transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Descargar
            </a>
          </div>
        </div>
      </div>
    </div>
  </UserPortalLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { reportService } from '../services/reportService'
import UserPortalLayout from '../components/UserPortalLayout.vue'

const { user, initAuth } = useAuth()
initAuth()

const reports = ref([])
const loading = ref(true)
const error = ref(null)

const loadReports = async () => {
  if (user.value) {
    loading.value = true
    error.value = null
    try {
      reports.value = await reportService.getUserReports(user.value.uid)
    } catch (err) {
      console.error('Error loading reports:', err)
      if (err.code === 'failed-precondition' || err.message?.includes('index')) {
        error.value = 'El índice de Firestore se está creando. Espera unos minutos y recarga la página.'
      } else {
        error.value = err.message || 'Error al cargar los informes'
      }
    } finally {
      loading.value = false
    }
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(loadReports)
</script>
