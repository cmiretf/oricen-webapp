<template>
  <div class="min-h-screen bg-gray-50">
    <PortalHeader title="Informe Final" />

    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B4C7E] mx-auto"></div>
      </div>

      <div v-else-if="reports.length === 0" class="bg-white rounded-lg shadow p-12 text-center">
        <div class="text-6xl mb-4">📄</div>
        <h2 class="text-xl font-bold text-gray-900 mb-2">Informe no disponible</h2>
        <p class="text-gray-600">Tu informe personalizado estará disponible aquí cuando esté listo.</p>
      </div>

      <div v-else class="space-y-4">
        <div 
          v-for="report in reports" 
          :key="report.id"
          class="bg-white rounded-lg shadow p-6"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-start gap-4">
              <div class="text-4xl">📄</div>
              <div>
                <h3 class="text-lg font-bold text-gray-900">{{ report.title }}</h3>
                <p class="text-gray-600 text-sm mt-1">{{ report.description }}</p>
                <p class="text-gray-500 text-xs mt-2">
                  Subido el {{ formatDate(report.createdAt) }}
                </p>
              </div>
            </div>
            <a 
              :href="report.downloadURL" 
              target="_blank"
              class="btn-primary flex items-center gap-2"
            >
              <span>Descargar</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { reportService } from '../services/reportService'
import PortalHeader from '../components/PortalHeader.vue'

const { user, initAuth } = useAuth()
initAuth()

const reports = ref([])
const loading = ref(true)

const loadReports = async () => {
  if (user.value) {
    loading.value = true
    reports.value = await reportService.getUserReports(user.value.uid)
    loading.value = false
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

onMounted(loadReports)
</script>
