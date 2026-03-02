<template>
  <UserPortalLayout>
    <div class="max-w-3xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Evaluación</h1>
      <p class="text-gray-600 mb-6">
        Hay varias pruebas distintas, cada una con instrucciones específicas en sus documentos asociados.
      </p>

      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B4C7E] mx-auto"></div>
      </div>

      <div v-else-if="error" class="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
        <p class="text-yellow-800 font-medium mb-2">{{ error }}</p>
        <button @click="loadData" class="text-[#2B4C7E] hover:underline text-sm font-medium">Reintentar</button>
      </div>

      <div v-else>
        <div v-if="evaluations.length > 0" class="space-y-4 mb-8">
          <div
            v-for="evaluation in evaluations"
            :key="evaluation.id"
            class="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div class="flex items-start justify-between">
              <div class="flex items-start gap-4 flex-1">
                <div class="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="font-bold text-gray-900">{{ evaluation.title }}</h3>
                  <p v-if="evaluation.instructions" class="text-gray-600 text-sm mt-1 whitespace-pre-line">{{ evaluation.instructions }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3 ml-4">
                <span
                  :class="evaluation.status === 'completed' ? 'text-green-600' : 'text-gray-400'"
                  class="flex items-center gap-1 text-sm font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" stroke-width="2" />
                    <path v-if="evaluation.status === 'completed'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" />
                  </svg>
                  {{ evaluation.status === 'completed' ? 'Completado' : 'Pendiente' }}
                </span>
                <a
                  v-if="evaluation.externalLink"
                  :href="evaluation.externalLink"
                  target="_blank"
                  class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Ver Instrucciones
                </a>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500 mb-8">
          No hay evaluaciones asignadas todavía
        </div>

        <div class="bg-white rounded-xl border border-gray-200 p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-2">Claves de Acceso</h2>
          <p class="text-gray-600 text-sm mb-4">Estas claves son personales y únicas para ti. No las compartas con nadie.</p>

          <div v-if="accessKeys.length > 0" class="space-y-3">
            <div
              v-for="key in accessKeys"
              :key="key.id"
              class="bg-gray-50 border border-gray-200 rounded-lg p-4"
            >
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-medium text-gray-900">{{ key.testName }}</p>
                  <p class="text-sm text-gray-500 mt-1">{{ key.description }}</p>
                </div>
                <div class="text-right">
                  <p class="font-mono bg-white px-3 py-1 rounded border text-lg">{{ key.accessCode }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ key.used ? 'Usada' : 'Sin usar' }}</p>
                </div>
              </div>
            </div>
          </div>
          <p v-else class="text-gray-500">No hay claves de acceso asignadas</p>
        </div>
      </div>
    </div>
  </UserPortalLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { evaluationService } from '../services/evaluationService'
import UserPortalLayout from '../components/UserPortalLayout.vue'

const { user, initAuth } = useAuth()
initAuth()

const evaluations = ref([])
const accessKeys = ref([])
const loading = ref(true)
const error = ref(null)

const loadData = async () => {
  if (user.value) {
    loading.value = true
    error.value = null
    try {
      evaluations.value = await evaluationService.getUserEvaluations(user.value.uid)
      accessKeys.value = await evaluationService.getUserAccessKeys(user.value.uid)
    } catch (err) {
      console.error('Error loading evaluations:', err)
      if (err.code === 'failed-precondition' || err.message?.includes('index')) {
        error.value = 'El índice de Firestore se está creando. Espera unos minutos y recarga la página.'
      } else {
        error.value = err.message || 'Error al cargar las evaluaciones'
      }
    } finally {
      loading.value = false
    }
  }
}

onMounted(loadData)
</script>
