<template>
  <div class="min-h-screen bg-gray-50">
    <PortalHeader title="Formularios" />

    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B4C7E] mx-auto"></div>
      </div>

      <div v-else-if="forms.length === 0" class="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        No hay formularios disponibles para tu servicio
      </div>

      <div v-else class="space-y-6">
        <div 
          v-for="form in forms" 
          :key="form.id"
          class="bg-white rounded-lg shadow p-6"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-bold text-gray-900">{{ form.title }}</h3>
              <p class="text-gray-600 text-sm">{{ form.description }}</p>
            </div>
            <span 
              :class="getFormStatusClass(form.id)"
              class="px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ getFormStatus(form.id) }}
            </span>
          </div>

          <div v-if="activeForm === form.id" class="mt-6 space-y-4">
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

            <div class="flex gap-4 mt-6">
              <button @click="saveForm(form.id)" class="btn-primary" :disabled="saving">
                {{ saving ? 'Guardando...' : 'Guardar respuestas' }}
              </button>
              <button @click="activeForm = null" class="btn-secondary">
                Cancelar
              </button>
            </div>
          </div>

          <button 
            v-else
            @click="openForm(form)"
            class="mt-4 text-[#2B4C7E] hover:underline text-sm font-medium"
          >
            {{ isFormCompleted(form.id) ? 'Ver respuestas' : 'Completar formulario' }}
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useAuth } from '../composables/useAuth'
import { formService } from '../services/formService'
import PortalHeader from '../components/PortalHeader.vue'

const { user, userProfile, initAuth } = useAuth()
initAuth()

const forms = ref([])
const responses = ref([])
const loading = ref(true)
const saving = ref(false)
const activeForm = ref(null)
const formResponses = reactive({})

const loadForms = async () => {
  if (user.value && userProfile.value?.serviceType) {
    loading.value = true
    forms.value = await formService.getFormsByService(userProfile.value.serviceType)
    responses.value = await formService.getUserFormResponses(user.value.uid)
    
    forms.value.forEach(form => {
      const existingResponse = responses.value.find(r => r.formId === form.id)
      formResponses[form.id] = existingResponse?.responses || {}
    })
    
    loading.value = false
  }
}

const openForm = (form) => {
  activeForm.value = form.id
  if (!formResponses[form.id]) {
    formResponses[form.id] = {}
  }
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

const getFormStatus = (formId) => {
  return isFormCompleted(formId) ? 'Completado' : 'Pendiente'
}

const getFormStatusClass = (formId) => {
  return isFormCompleted(formId) 
    ? 'bg-green-100 text-green-800' 
    : 'bg-yellow-100 text-yellow-800'
}

onMounted(loadForms)
</script>
