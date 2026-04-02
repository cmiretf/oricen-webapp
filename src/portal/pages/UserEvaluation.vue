<template>
  <UserPortalLayout>
    <div class="max-w-3xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Evaluación</h1>
      <p class="text-gray-600 mb-6">
        Hay cuatro pruebas distintas, cada una con instrucciones específicas en sus documentos asociados.
      </p>

      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B4C7E] mx-auto"></div>
      </div>

      <div v-else-if="error" class="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
        <p class="text-yellow-800 font-medium mb-2">{{ error }}</p>
        <button @click="loadData" class="text-[#2B4C7E] hover:underline text-sm font-medium">Reintentar</button>
      </div>

      <div v-else>
        <!-- 4 PRUEBAS -->
        <div class="space-y-4 mb-8">
          <div
            v-for="test in testTypes"
            :key="test.key"
            class="bg-white rounded-xl border border-gray-200 p-5"
          >
            <div class="flex items-start gap-3 sm:gap-4">
              <div class="w-10 h-10 sm:w-11 sm:h-11 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
                <span class="text-lg sm:text-xl">{{ test.icon }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                  <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-gray-900 text-sm sm:text-base">{{ test.title }}</h3>
                    <p v-if="test.platform" class="text-xs sm:text-sm text-gray-500 mt-0.5">{{ test.platform }}</p>
                    <p v-if="test.description" class="text-gray-600 text-xs sm:text-sm mt-1">{{ test.description }}</p>
                  </div>
                  <div class="flex items-center gap-3 flex-shrink-0">
                    <a
                      v-if="test.hasInstructions"
                      :href="getTestExternalLink(test.key)"
                      target="_blank"
                      class="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
                    >
                      Ver Instrucciones
                    </a>
                    <div v-if="test.hasStatus" class="flex items-center gap-2">
                      <button
                        @click="toggleTestStatus(test.key)"
                        class="flex items-center gap-2 text-xs sm:text-sm font-medium transition-colors"
                        :class="isTestCompleted(test.key) ? 'text-green-600' : 'text-gray-400'"
                      >
                        <div class="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-colors"
                          :class="isTestCompleted(test.key) ? 'border-green-500 bg-green-50' : 'border-gray-300'">
                          <svg v-if="isTestCompleted(test.key)" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        Completado
                      </button>
                    </div>
                    <button
                      v-if="test.hasForm"
                      @click="toggleFormSection(test.key)"
                      class="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
                      :class="isSectoresCompleted ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-[#2B4C7E] text-white hover:bg-[#1a3a61]'"
                    >
                      {{ isSectoresCompleted ? 'Completado' : (activeFormSection === test.key ? 'Cerrar' : 'Rellenar formulario') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Archivos descargables del admin -->
            <div v-if="getTestFiles(test.key).length > 0" class="mt-4 border-t border-gray-100 pt-3">
              <p class="text-xs font-medium text-gray-500 mb-2">Documentos disponibles:</p>
              <div class="space-y-1">
                <a
                  v-for="file in getTestFiles(test.key)"
                  :key="file.id"
                  :href="file.downloadURL"
                  target="_blank"
                  class="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#2B4C7E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span class="text-sm text-[#2B4C7E] font-medium">{{ file.fileName || file.title }}</span>
                </a>
              </div>
            </div>

            <!-- Formulario embebido para Sectores -->
            <div v-if="test.hasForm && activeFormSection === test.key" class="mt-4 border-t border-gray-100 pt-4">
              <div v-if="sectoresFormFields.length > 0" class="space-y-3">
                <div v-for="(field, idx) in sectoresFormFields" :key="idx">
                  <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">{{ field.label }}</label>
                  <input
                    v-if="field.type === 'text'"
                    v-model="sectoresResponses[field.name]"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
                  />
                  <textarea
                    v-else-if="field.type === 'textarea'"
                    v-model="sectoresResponses[field.name]"
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
                  ></textarea>
                  <select
                    v-else-if="field.type === 'select'"
                    v-model="sectoresResponses[field.name]"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
                  >
                    <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
                  </select>
                </div>
                <button
                  @click="saveSectoresForm"
                  class="px-4 py-2 bg-[#2B4C7E] text-white rounded-lg text-sm font-medium hover:bg-[#1a3a61] transition-colors"
                  :disabled="savingSectores"
                >
                  {{ savingSectores ? 'Guardando...' : 'Guardar respuestas' }}
                </button>
              </div>
              <p v-else class="text-sm text-gray-500">El administrador aún no ha creado el formulario de sectores.</p>
            </div>
          </div>
        </div>

        <!-- CLAVES DE ACCESO -->
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
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useAuth } from '../composables/useAuth'
import { evaluationService } from '../services/evaluationService'
import { formService } from '../services/formService'
import UserPortalLayout from '../components/UserPortalLayout.vue'

const { user, initAuth } = useAuth()
initAuth()

const evaluations = ref([])
const accessKeys = ref([])
const loading = ref(true)
const error = ref(null)
const activeFormSection = ref(null)
const sectoresFormFields = ref([])
const sectoresResponses = reactive({})
const savingSectores = ref(false)
const sectoresFormId = ref(null)
const isSectoresCompleted = ref(false)

const testTypes = [
  {
    key: 'intereses',
    title: 'Prueba de Intereses Profesionales',
    description: 'Descubre tus intereses vocacionales a través de este test especializado.',
    icon: '🧭',
    hasInstructions: true,
    hasStatus: false
  },
  {
    key: 'aptitudes',
    title: 'Prueba de Aptitudes Cognitivas',
    description: 'Evalúa tus capacidades cognitivas y aptitudes principales.',
    icon: '🧠',
    hasInstructions: true,
    hasStatus: false
  },
  {
    key: 'personalidad',
    title: 'Prueba de Personalidad',
    description: 'Completa el test de personalidad en la plataforma externa.',
    icon: '🎭',
    platform: 'Plataforma externa',
    hasInstructions: false,
    hasStatus: true
  },
  {
    key: 'sectores',
    title: 'Prueba de Intereses por Sectores',
    description: 'Completa el formulario de intereses sectoriales directamente en la plataforma.',
    icon: '🏢',
    hasInstructions: false,
    hasStatus: false,
    hasForm: true
  }
]

const completedTests = ref({})

const getTestExternalLink = (testKey) => {
  const eval_ = evaluations.value.find(e => e.category === testKey && e.externalLink)
  return eval_?.externalLink || '#'
}

const getTestFiles = (testKey) => {
  return evaluations.value.filter(e => e.category === testKey && e.downloadURL)
}

const isTestCompleted = (testKey) => {
  if (completedTests.value[testKey] !== undefined) return completedTests.value[testKey]
  return evaluations.value.some(e => e.category === testKey && e.status === 'completed')
}

const toggleTestStatus = async (testKey) => {
  const current = isTestCompleted(testKey)
  completedTests.value[testKey] = !current
  const eval_ = evaluations.value.find(e => e.category === testKey)
  if (eval_) {
    try {
      await evaluationService.updateEvaluationStatus(eval_.id, current ? 'pending' : 'completed')
    } catch (err) {
      console.error('Error updating status:', err)
      completedTests.value[testKey] = current
    }
  }
}

const toggleFormSection = (key) => {
  activeFormSection.value = activeFormSection.value === key ? null : key
}

const saveSectoresForm = async () => {
  if (!user.value || !sectoresFormId.value) return
  savingSectores.value = true
  try {
    await formService.saveFormResponse(user.value.uid, sectoresFormId.value, { ...sectoresResponses })
    isSectoresCompleted.value = true
    activeFormSection.value = null
  } catch (err) {
    console.error('Error saving sectores form:', err)
  }
  savingSectores.value = false
}

const loadSectoresForm = async () => {
  try {
    const allForms = [
      ...(await formService.getFormsByService('A')),
      ...(await formService.getFormsByService('B')),
      ...(await formService.getFormsByService('C'))
    ]
    const sectoresForm = allForms.find(f => (f.title || '').toLowerCase().includes('sector'))
    if (sectoresForm) {
      sectoresFormId.value = sectoresForm.id
      sectoresFormFields.value = sectoresForm.fields || []
      if (user.value) {
        const responses = await formService.getUserFormResponses(user.value.uid)
        const existing = responses.find(r => r.formId === sectoresForm.id)
        if (existing?.responses) {
          Object.assign(sectoresResponses, existing.responses)
          isSectoresCompleted.value = existing.status === 'completed'
        }
      }
    }
  } catch (err) {
    console.error('Error loading sectores form:', err)
  }
}

const loadData = async () => {
  if (user.value) {
    loading.value = true
    error.value = null
    try {
      evaluations.value = await evaluationService.getUserEvaluations(user.value.uid)
      accessKeys.value = await evaluationService.getUserAccessKeys(user.value.uid)
      await loadSectoresForm()
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
watch(user, (val) => { if (val) loadData() })
</script>
