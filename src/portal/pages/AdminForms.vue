<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Gestión de Formularios</h2>
      <button @click="showCreate = true" class="btn-primary">
        + Crear formulario
      </button>
    </div>

    <!-- CREAR FORMULARIO -->
    <div v-if="showCreate" class="bg-white rounded-lg shadow p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-900 mb-4">Nuevo Formulario</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="newForm.title" type="text" class="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="newForm.description" rows="2" class="w-full px-3 py-2 border rounded"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Servicio</label>
          <select v-model="newForm.serviceType" class="w-full px-3 py-2 border rounded">
            <option value="A">Origen</option>
            <option value="B">Brújula</option>
            <option value="C">Atlas</option>
          </select>
        </div>

        <div class="border-t pt-4">
          <div class="flex justify-between items-center mb-3">
            <h4 class="font-medium">Campos del formulario</h4>
            <button @click="addField" class="text-[#2B4C7E] text-sm hover:underline">+ Añadir campo</button>
          </div>

          <div v-for="(field, index) in newForm.fields" :key="index" class="flex gap-2 mb-2">
            <input v-model="field.label" placeholder="Etiqueta" class="flex-1 px-2 py-1 border rounded text-sm" />
            <input v-model="field.name" placeholder="Nombre interno" class="w-32 px-2 py-1 border rounded text-sm" />
            <select v-model="field.type" class="w-28 px-2 py-1 border rounded text-sm">
              <option value="text">Texto</option>
              <option value="textarea">Texto largo</option>
              <option value="select">Selección</option>
            </select>
            <button @click="removeField(index)" class="text-red-500 text-sm">×</button>
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="createForm" class="btn-primary" :disabled="!newForm.title">
            Crear formulario
          </button>
          <button @click="showCreate = false" class="btn-secondary">
            Cancelar
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B4C7E] mx-auto"></div>
    </div>

    <div v-else-if="forms.length === 0" class="bg-white rounded-lg shadow p-12 text-center text-gray-500">
      No hay formularios creados
    </div>

    <!-- LISTA DE FORMULARIOS -->
    <div v-else class="space-y-4">
      <div v-for="form in forms" :key="form.id" class="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <!-- Header del formulario -->
        <div class="p-5">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-1">
                <h3 class="text-lg font-bold text-gray-900">{{ form.title }}</h3>
                <span class="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium text-gray-600">
                  {{ getServiceName(form.serviceType) }}
                </span>
              </div>
              <p class="text-gray-600 text-sm">{{ form.description }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ form.fields?.length || 0 }} campos</p>
            </div>
            <button
              @click="toggleFormDetail(form.id)"
              class="px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
              :class="openFormId === form.id ? 'bg-[#2B4C7E] text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ openFormId === form.id ? 'Ocultar' : 'Ver respuestas' }}
            </button>
          </div>
        </div>

        <!-- DETALLE: Respuestas por usuario -->
        <div v-if="openFormId === form.id" class="border-t border-gray-200 bg-gray-50">
          <div v-if="loadingResponses" class="p-6 text-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2B4C7E] mx-auto"></div>
          </div>

          <div v-else-if="formUserResponses.length === 0" class="p-6 text-center text-gray-500 text-sm">
            Ningún usuario ha respondido este formulario todavía
          </div>

          <div v-else class="divide-y divide-gray-200">
            <div v-for="resp in formUserResponses" :key="resp.id" class="p-5">
              <!-- Header del usuario -->
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 bg-[#2B4C7E] text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {{ getUserInitial(resp.userId) }}
                  </div>
                  <div>
                    <p class="font-medium text-gray-900 text-sm">{{ getUserName(resp.userId) }}</p>
                    <p class="text-xs text-gray-500">{{ getUserEmail(resp.userId) }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-xs font-medium" :class="resp.status === 'completed' ? 'text-green-600' : 'text-yellow-600'">
                    {{ getAnsweredCount(resp, form) }}/{{ form.fields?.length || 0 }} preguntas
                  </span>
                  <span :class="resp.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'" class="px-2 py-0.5 rounded-full text-xs font-medium">
                    {{ resp.status === 'completed' ? 'Completado' : 'En progreso' }}
                  </span>
                </div>
              </div>

              <!-- Toggle respuestas -->
              <button
                @click="toggleUserResponse(resp.id)"
                class="text-sm font-medium transition-colors mb-2"
                :class="resp.status === 'completed' ? 'text-green-700 hover:text-green-800' : 'text-yellow-700 hover:text-yellow-800'"
              >
                {{ expandedResponses[resp.id] ? 'Ocultar respuestas' : (resp.status === 'completed' ? 'Ver Respuestas' : 'Ver Progreso Parcial') }}
              </button>

              <!-- Respuestas expandidas -->
              <div v-if="expandedResponses[resp.id]" class="mt-3 bg-white rounded-lg border border-gray-200 p-4 space-y-3">
                <div v-for="field in form.fields" :key="field.name">
                  <p class="text-xs font-medium text-gray-500">{{ field.label }}</p>
                  <p class="text-sm text-gray-900 mt-0.5">{{ resp.responses?.[field.name] || '—' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { formService } from '../services/formService'
import { userService } from '../services/userService'

const forms = ref([])
const loading = ref(true)
const showCreate = ref(false)
const openFormId = ref(null)
const loadingResponses = ref(false)
const formUserResponses = ref([])
const expandedResponses = reactive({})
const usersCache = ref({})

const newForm = reactive({
  title: '',
  description: '',
  serviceType: 'A',
  fields: []
})

const serviceNames = { A: 'Origen', B: 'Brújula', C: 'Atlas' }
const getServiceName = (type) => serviceNames[type]

const getUserName = (userId) => usersCache.value[userId]?.displayName || 'Usuario'
const getUserEmail = (userId) => usersCache.value[userId]?.email || ''
const getUserInitial = (userId) => (getUserName(userId)?.charAt(0) || '?').toUpperCase()

const getAnsweredCount = (resp, form) => {
  if (!resp.responses || !form.fields) return 0
  return Object.keys(resp.responses).filter(k => resp.responses[k]).length
}

const toggleFormDetail = async (formId) => {
  if (openFormId.value === formId) {
    openFormId.value = null
    return
  }
  openFormId.value = formId
  loadingResponses.value = true
  try {
    const responses = await formService.getFormResponses(formId)
    formUserResponses.value = responses

    // Load user data for each response
    const userIds = [...new Set(responses.map(r => r.userId))]
    for (const uid of userIds) {
      if (!usersCache.value[uid]) {
        try {
          const u = await userService.getUserById(uid)
          if (u) usersCache.value[uid] = u
        } catch (e) { /* skip */ }
      }
    }
  } catch (err) {
    console.error('Error loading responses:', err)
    formUserResponses.value = []
  }
  loadingResponses.value = false
}

const toggleUserResponse = (responseId) => {
  expandedResponses[responseId] = !expandedResponses[responseId]
}

const loadForms = async () => {
  loading.value = true
  const formsA = await formService.getFormsByService('A')
  const formsB = await formService.getFormsByService('B')
  const formsC = await formService.getFormsByService('C')
  forms.value = [...formsA, ...formsB, ...formsC]
  loading.value = false
}

const addField = () => {
  newForm.fields.push({ label: '', name: '', type: 'text', options: [] })
}

const removeField = (index) => {
  newForm.fields.splice(index, 1)
}

const createForm = async () => {
  await formService.createForm({ ...newForm })
  showCreate.value = false
  newForm.title = ''
  newForm.description = ''
  newForm.fields = []
  await loadForms()
}

onMounted(loadForms)
</script>
