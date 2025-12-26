<template>
  <div class="min-h-screen bg-gray-50">
    <PortalHeader title="Evaluación" />

    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B4C7E] mx-auto"></div>
      </div>

      <div v-else>
        <div class="bg-white rounded-lg shadow p-6 mb-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Instrucciones de Evaluación</h2>
          <div v-if="evaluations.length > 0">
            <div 
              v-for="evaluation in evaluations" 
              :key="evaluation.id"
              class="border-b last:border-0 py-4"
            >
              <h3 class="font-medium text-gray-900">{{ evaluation.title }}</h3>
              <p class="text-gray-600 text-sm mt-2 whitespace-pre-line">{{ evaluation.instructions }}</p>
              <div class="mt-3 flex items-center gap-2">
                <span 
                  :class="evaluation.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                  class="px-2 py-1 rounded text-xs font-medium"
                >
                  {{ evaluation.status === 'completed' ? 'Completada' : 'Pendiente' }}
                </span>
                <a 
                  v-if="evaluation.externalLink"
                  :href="evaluation.externalLink" 
                  target="_blank"
                  class="text-[#2B4C7E] hover:underline text-sm"
                >
                  Acceder a la prueba
                </a>
              </div>
            </div>
          </div>
          <p v-else class="text-gray-500">No hay evaluaciones asignadas todavía</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Claves de Acceso</h2>
          <p class="text-gray-600 text-sm mb-4">Estas claves son personales y únicas para ti. No las compartas con nadie.</p>
          
          <div v-if="accessKeys.length > 0" class="space-y-3">
            <div 
              v-for="key in accessKeys" 
              :key="key.id"
              class="bg-gray-50 border rounded-lg p-4"
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
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { evaluationService } from '../services/evaluationService'
import PortalHeader from '../components/PortalHeader.vue'

const { user, initAuth } = useAuth()
initAuth()

const evaluations = ref([])
const accessKeys = ref([])
const loading = ref(true)

const loadData = async () => {
  if (user.value) {
    loading.value = true
    evaluations.value = await evaluationService.getUserEvaluations(user.value.uid)
    accessKeys.value = await evaluationService.getUserAccessKeys(user.value.uid)
    loading.value = false
  }
}

onMounted(loadData)
</script>
