<template>
  <UserPortalLayout>
    <div class="max-w-3xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Formularios</h1>
      <p class="text-gray-600 mb-6">
        Completa los siguientes cuestionarios designados para ti y, si aplica, tus padres. Las preguntas recaban información esencial y se completan de forma sencilla.
      </p>

      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B4C7E] mx-auto"></div>
      </div>

      <div v-else-if="forms.length === 0" class="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">
        No hay formularios disponibles para tu servicio
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="form in forms"
          :key="form.id"
          class="bg-white rounded-xl border border-gray-200 p-6"
        >
          <h3 class="text-lg font-bold text-gray-900 mb-3">{{ form.title }}</h3>

          <div v-if="isFormCompleted(form.id)" class="flex items-center gap-2 mb-3">
            <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="text-green-600 font-medium">Completado</span>
          </div>
          <div v-else class="mb-3">
            <div class="flex items-center gap-2">
              <div class="flex-1 bg-gray-200 rounded-full h-2">
                <div class="bg-red-500 h-2 rounded-full" :style="{ width: getFormProgress(form) + '%' }"></div>
              </div>
              <span class="text-sm text-red-600 font-medium">{{ getFormProgressText(form) }}</span>
            </div>
          </div>

          <div v-if="activeForm === form.id" class="mt-4 space-y-4 border-t pt-4">
            <div v-for="(field, index) in form.fields" :key="index">
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ field.label }}</label>
              <input
                v-if="field.type === 'text'"
                v-model="formResponses[form.id][field.name]"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
              />
              <textarea
                v-else-if="field.type === 'textarea'"
                v-model="formResponses[form.id][field.name]"
                rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
              ></textarea>
              <select
                v-else-if="field.type === 'select'"
                v-model="formResponses[form.id][field.name]"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
              >
                <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div class="flex gap-3">
              <button @click="saveForm(form.id)" class="px-4 py-2 bg-[#2B4C7E] text-white rounded-lg text-sm font-medium hover:bg-[#1a3a61] transition-colors" :disabled="saving">
                {{ saving ? 'Guardando...' : 'Guardar respuestas' }}
              </button>
              <button @click="activeForm = null" class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
            </div>
          </div>
          <button
            v-else
            @click="openForm(form)"
            class="mt-2 text-[#2B4C7E] hover:text-[#1a3a61] text-sm font-medium transition-colors"
          >
            {{ isFormCompleted(form.id) ? 'Ver respuestas' : 'Completar formulario' }}
          </button>
        </div>
      </div>
    </div>
  </UserPortalLayout>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from 'vue'
import { useAuth } from '../composables/useAuth'
import { formService } from '../services/formService'
import UserPortalLayout from '../components/UserPortalLayout.vue'

const { user, userProfile, initAuth } = useAuth()
initAuth()

const forms = ref([])
const responses = ref([])
const loading = ref(true)
const saving = ref(false)
const activeForm = ref(null)
const formResponses = reactive({})

const loadForms = async () => {
  if (!user.value) return
  if (!userProfile.value?.serviceType) {
    loading.value = false
    return
  }
  loading.value = true
  forms.value = await formService.getFormsByService(userProfile.value.serviceType)
  responses.value = await formService.getUserFormResponses(user.value.uid)
  forms.value.forEach(form => {
    const existingResponse = responses.value.find(r => r.formId === form.id)
    formResponses[form.id] = existingResponse?.responses || {}
  })
  loading.value = false
}

const openForm = (form) => {
  activeForm.value = form.id
  if (!formResponses[form.id]) formResponses[form.id] = {}
}

const saveForm = async (formId) => {
  saving.value = true
  try {
    await formService.saveFormResponse(user.value.uid, formId, formResponses[formId])
    responses.value = await formService.getUserFormResponses(user.value.uid)
    activeForm.value = null
  } catch (err) {
    console.error('Save error:', err)
  }
  saving.value = false
}

const isFormCompleted = (formId) => {
  return responses.value.some(r => r.formId === formId && r.status === 'completed')
}

const getFormProgress = (form) => {
  const response = responses.value.find(r => r.formId === form.id)
  if (!response || !form.fields) return 0
  const answered = Object.keys(response.responses || {}).filter(k => response.responses[k]).length
  return Math.round((answered / form.fields.length) * 100)
}

const getFormProgressText = (form) => {
  const response = responses.value.find(r => r.formId === form.id)
  if (!response || !form.fields) return `0/${form.fields?.length || 0}`
  const answered = Object.keys(response.responses || {}).filter(k => response.responses[k]).length
  return `${answered}/${form.fields.length}`
}

onMounted(loadForms)
watch([user, userProfile], () => loadForms())
</script>
