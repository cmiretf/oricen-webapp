<template>
  <div>
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B4C7E] mx-auto"></div>
    </div>

    <div v-else-if="!userDetail" class="text-center py-12 text-gray-500">
      Usuario no encontrado
    </div>

    <div v-else>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Detalle de Usuario - {{ userDetail.displayName || userDetail.email }}</h2>
        <router-link to="/admin/usuarios" class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          Volver
        </router-link>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div class="flex items-center gap-4">
          <img v-if="userDetail.photoURL" :src="userDetail.photoURL" class="w-16 h-16 rounded-full" />
          <div v-else class="w-16 h-16 bg-[#2B4C7E] text-white rounded-full flex items-center justify-center text-2xl font-medium">
            {{ userDetail.displayName?.charAt(0) || '?' }}
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900">{{ userDetail.displayName || 'Sin nombre' }}</h3>
            <p class="text-gray-600">{{ userDetail.email }}</p>
            <p class="text-sm text-gray-500">Plan Contratado: {{ getServiceName(userDetail.serviceType) || 'Sin asignar' }}</p>
          </div>
        </div>
      </div>

      <div class="space-y-3">
        <!-- DOCUMENTOS -->
        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button @click="toggleSection('documents')" class="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
            <div class="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
              </svg>
              <span class="font-bold text-gray-900">Documentos Subidos</span>
              <span class="text-sm text-gray-500">({{ documents.length }})</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" :class="openSections.documents ? 'rotate-180' : ''" class="w-5 h-5 text-gray-400 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-if="openSections.documents" class="border-t border-gray-200 p-5">
            <div v-if="documents.length > 0" class="space-y-2 mb-4">
              <div v-for="doc in documents" :key="doc.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span class="text-sm font-medium text-gray-900 truncate">{{ doc.fileName }}</span>
                  <span class="text-xs text-gray-500">{{ formatDate(doc.createdAt) }}</span>
                </div>
                <div class="flex items-center gap-2 ml-4">
                  <select v-model="doc.status" @change="updateDocStatus(doc)" class="text-xs border rounded px-2 py-1">
                    <option value="pending">Pendiente</option>
                    <option value="approved">Aprobado</option>
                    <option value="rejected">Rechazado</option>
                  </select>
                  <a :href="doc.downloadURL" target="_blank" class="text-[#2B4C7E] hover:text-[#1a3a61]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <p v-else class="text-gray-500 text-sm mb-4">No hay documentos subidos</p>
            <div>
              <input type="file" ref="docInput" @change="uploadDocument" class="hidden" />
              <button @click="$refs.docInput.click()" class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2" :disabled="uploading">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                {{ uploading ? 'Subiendo...' : 'Añadir Documento' }}
              </button>
            </div>
          </div>
        </div>

        <!-- FORMULARIOS -->
        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button @click="toggleSection('forms')" class="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
            <div class="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span class="font-bold text-gray-900">Formularios</span>
              <span class="text-sm text-gray-500">({{ forms.length }})</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" :class="openSections.forms ? 'rotate-180' : ''" class="w-5 h-5 text-gray-400 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-if="openSections.forms" class="border-t border-gray-200 p-5">
            <div v-if="forms.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="form in forms" :key="form.id" class="border border-gray-200 rounded-lg p-5">
                <div class="flex items-start gap-3 mb-3">
                  <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    :class="getFormIcon(form).bg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" :class="getFormIcon(form).text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path v-if="isParentForm(form)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-bold text-gray-900 text-sm">{{ form.title }}</h4>
                    <p v-if="form.description" class="text-xs text-gray-500 mt-0.5">{{ form.description }}</p>
                  </div>
                </div>

                <div class="mb-3">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs font-medium" :class="getFormCompletionClass(form)">
                      {{ getFormCompletionPercent(form) }}% {{ getFormResponse(form)?.status === 'completed' ? 'Completado' : 'Pendiente' }}
                    </span>
                    <span class="text-xs text-gray-500">({{ getFormAnsweredCount(form) }}/{{ form.fields?.length || 0 }} preguntas)</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="h-2 rounded-full transition-all" :class="getFormResponse(form)?.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'" :style="{ width: getFormCompletionPercent(form) + '%' }"></div>
                  </div>
                </div>

                <button @click="toggleFormResponses(form.id)" class="text-sm font-medium transition-colors"
                  :class="getFormResponse(form)?.status === 'completed' ? 'text-green-700 hover:text-green-800' : 'text-yellow-700 hover:text-yellow-800'">
                  {{ expandedForms[form.id] ? 'Ocultar' : (getFormResponse(form)?.status === 'completed' ? 'Ver Respuestas' : 'Ver Progreso Parcial') }}
                </button>

                <div v-if="expandedForms[form.id]" class="mt-3 space-y-2 border-t pt-3">
                  <div v-if="getFormResponse(form)" v-for="field in form.fields" :key="field.name" class="text-sm">
                    <p class="font-medium text-gray-700">{{ field.label }}:</p>
                    <p class="text-gray-600">{{ getFormResponse(form).responses?.[field.name] || '—' }}</p>
                  </div>
                  <p v-else class="text-sm text-gray-500">Sin respuestas todavía</p>
                </div>
              </div>
            </div>
            <p v-else class="text-gray-500 text-sm">No hay formularios disponibles</p>
          </div>
        </div>

        <!-- EVALUACION -->
        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button @click="toggleSection('evaluation')" class="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
            <div class="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span class="font-bold text-gray-900">Evaluación</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" :class="openSections.evaluation ? 'rotate-180' : ''" class="w-5 h-5 text-gray-400 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-if="openSections.evaluation" class="border-t border-gray-200 p-5 space-y-4">
            <div v-for="evalType in evaluationTypes" :key="evalType.key" class="p-4 bg-gray-50 rounded-lg">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                    <span class="text-lg">{{ evalType.icon }}</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ evalType.title }}</p>
                    <p class="text-sm text-gray-500">{{ evalType.description }}</p>
                  </div>
                </div>
                <div>
                  <input type="file" :ref="el => evalInputs[evalType.key] = el" @change="uploadEvalFile($event, evalType)" class="hidden" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
                  <button @click="evalInputs[evalType.key]?.click()" class="px-4 py-2 bg-[#2B4C7E] text-white rounded-lg text-sm font-medium hover:bg-[#1a3a61] transition-colors flex items-center gap-2" :disabled="uploadingEval === evalType.key">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    {{ uploadingEval === evalType.key ? 'Subiendo...' : 'Subir Archivo' }}
                  </button>
                </div>
              </div>
              <div v-if="getEvalFilesByCategory(evalType.key).length > 0" class="mt-3 space-y-1">
                <div v-for="evalFile in getEvalFilesByCategory(evalType.key)" :key="evalFile.id" class="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                  <span class="text-sm text-gray-700 truncate">{{ evalFile.fileName || evalFile.title }}</span>
                  <a v-if="evalFile.downloadURL" :href="evalFile.downloadURL" target="_blank" class="text-[#2B4C7E] hover:text-[#1a3a61] text-sm font-medium flex-shrink-0 ml-2">Descargar</a>
                </div>
              </div>
            </div>

            <div class="border-t pt-4">
              <h4 class="font-medium text-gray-900 mb-3">Claves de Acceso</h4>
              <div class="space-y-2 mb-3">
                <div v-for="key in accessKeys" :key="key.id" class="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                  <div>
                    <p class="font-medium text-sm">{{ key.testName }}</p>
                    <p class="font-mono text-xs text-gray-600">{{ key.accessCode }}</p>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-2">
                <input v-model="newKey.testName" type="text" placeholder="Nombre del test" class="px-3 py-2 border rounded-lg text-sm" />
                <input v-model="newKey.accessCode" type="text" placeholder="Código de acceso" class="px-3 py-2 border rounded-lg text-sm" />
                <button @click="addAccessKey" class="px-3 py-2 bg-[#2B4C7E] text-white rounded-lg text-sm font-medium hover:bg-[#1a3a61] transition-colors" :disabled="!newKey.testName || !newKey.accessCode">
                  Añadir
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ENTREVISTA -->
        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button @click="toggleSection('interview')" class="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
            <div class="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="font-bold text-gray-900">Entrevista</span>
            </div>
            <router-link :to="`/admin/citas`" class="text-[#2B4C7E] text-sm font-medium hover:underline" @click.stop>
              Ver Detalle >
            </router-link>
          </button>
        </div>

        <!-- INFORME FINAL -->
        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button @click="toggleSection('report')" class="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
            <div class="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span class="font-bold text-gray-900">Informe Final</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" :class="openSections.report ? 'rotate-180' : ''" class="w-5 h-5 text-gray-400 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-if="openSections.report" class="border-t border-gray-200 p-5">
            <div v-if="reports.length > 0" class="space-y-2 mb-4">
              <div v-for="report in reports" :key="report.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p class="font-medium text-sm">{{ report.title }}</p>
                  <p class="text-xs text-gray-500">{{ report.fileName }}</p>
                </div>
                <a :href="report.downloadURL" target="_blank" class="text-[#2B4C7E] hover:underline text-sm">Descargar</a>
              </div>
            </div>
            <p v-else class="text-sm text-gray-500 mb-4">Estado: Ningún informe subido</p>

            <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50"
              @dragover.prevent="dragOver = true"
              @dragleave="dragOver = false"
              @drop.prevent="handleReportDrop"
              :class="{ 'border-[#2B4C7E] bg-blue-50': dragOver }"
            >
              <input type="file" ref="reportInput" @change="uploadReport" class="hidden" accept=".pdf,.docx" />
              <div class="mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <p class="font-bold text-gray-700 mb-1">Carga del Informe Vocacional Final</p>
              <p class="text-sm text-gray-500 mb-3">Arrastra el archivo aquí o</p>
              <button @click="$refs.reportInput.click()" class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors" :disabled="uploadingReport">
                {{ uploadingReport ? 'Subiendo...' : 'Subir Informe' }}
              </button>
              <p class="text-xs text-gray-400 mt-2">Formatos aceptados: PDF o DOCX (máx. 25MB)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { userService } from '../services/userService'
import { documentService } from '../services/documentService'
import { evaluationService } from '../services/evaluationService'
import { reportService } from '../services/reportService'
import { formService } from '../services/formService'

const route = useRoute()
const userId = route.params.id

const userDetail = ref(null)
const documents = ref([])
const accessKeys = ref([])
const reports = ref([])
const evaluationFiles = ref([])
const formResponses = ref([])
const forms = ref([])
const loading = ref(true)
const uploading = ref(false)
const uploadingReport = ref(false)
const uploadingEval = ref(null)
const dragOver = ref(false)

const openSections = reactive({
  documents: false,
  forms: false,
  evaluation: false,
  interview: false,
  report: false
})

const expandedForms = reactive({})
const evalInputs = reactive({})

const newKey = reactive({ testName: '', accessCode: '' })

const evaluationTypes = [
  { key: 'intereses', title: 'Prueba de Intereses Profesionales', description: 'Sube aquí el informe de resultados de intereses vocacionales', icon: '🧭' },
  { key: 'aptitudes', title: 'Prueba de Aptitudes Cognitivas', description: 'Sube aquí el informe de resultados de las pruebas cognitivas', icon: '🧠' },
  { key: 'personalidad', title: 'Prueba de Personalidad', description: 'Sube aquí el informe de resultados de la prueba de personalidad', icon: '🎭' },
  { key: 'sectores', title: 'Prueba de Intereses por Sectores', description: 'Sube aquí el informe de resultados de los intereses sectoriales', icon: '🏢' }
]

const serviceNames = { A: 'Origen', B: 'Brújula', C: 'Atlas' }
const getServiceName = (type) => serviceNames[type]

const isParentForm = (form) => {
  const title = (form.title || '').toLowerCase()
  return title.includes('padre') || title.includes('parent')
}

const getFormIcon = (form) => {
  if (isParentForm(form)) {
    return { bg: 'bg-purple-50', text: 'text-purple-600' }
  }
  return { bg: 'bg-blue-50', text: 'text-blue-600' }
}

const getFormResponse = (form) => {
  return formResponses.value.find(r => r.formId === form.id)
}

const getFormAnsweredCount = (form) => {
  const response = getFormResponse(form)
  if (!response?.responses || !form.fields) return 0
  return Object.keys(response.responses).filter(k => response.responses[k]).length
}

const getFormCompletionPercent = (form) => {
  if (!form.fields?.length) return 0
  return Math.round((getFormAnsweredCount(form) / form.fields.length) * 100)
}

const getFormCompletionClass = (form) => {
  const response = getFormResponse(form)
  return response?.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
}

const getEvalFilesByCategory = (category) => {
  return evaluationFiles.value.filter(e => e.category === category && e.downloadURL)
}

const loadData = async () => {
  loading.value = true
  userDetail.value = await userService.getUserById(userId)
  documents.value = await documentService.getUserDocuments(userId)
  accessKeys.value = await evaluationService.getUserAccessKeys(userId)
  reports.value = await reportService.getUserReports(userId)
  evaluationFiles.value = await evaluationService.getUserEvaluations(userId)

  const allForms = [...(await formService.getFormsByService('A')), ...(await formService.getFormsByService('B')), ...(await formService.getFormsByService('C'))]
  forms.value = allForms

  formResponses.value = await formService.getUserFormResponses(userId)

  loading.value = false
}

const toggleSection = (section) => {
  openSections[section] = !openSections[section]
}

const toggleFormResponses = (formId) => {
  expandedForms[formId] = !expandedForms[formId]
}

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
}

const uploadDocument = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  uploading.value = true
  await documentService.uploadDocument(userId, file, { uploadedBy: 'admin' })
  documents.value = await documentService.getUserDocuments(userId)
  uploading.value = false
}

const updateDocStatus = async (doc) => {
  await documentService.updateDocumentStatus(doc.id, doc.status)
}

const uploadEvalFile = async (event, evalType) => {
  const file = event.target.files[0]
  if (!file) return
  uploadingEval.value = evalType.key
  try {
    await evaluationService.uploadEvaluationFile(userId, file, {
      title: evalType.title,
      instructions: `Resultado de ${evalType.title}`,
      category: evalType.key
    })
    evaluationFiles.value = await evaluationService.getUserEvaluations(userId)
  } catch (err) {
    console.error('Error uploading evaluation file:', err)
  }
  uploadingEval.value = null
}

const addAccessKey = async () => {
  await evaluationService.addAccessKey(userId, { ...newKey })
  accessKeys.value = await evaluationService.getUserAccessKeys(userId)
  newKey.testName = ''
  newKey.accessCode = ''
}

const uploadReport = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  uploadingReport.value = true
  await reportService.uploadReport(userId, file, { title: file.name })
  reports.value = await reportService.getUserReports(userId)
  uploadingReport.value = false
}

const handleReportDrop = async (event) => {
  dragOver.value = false
  const file = event.dataTransfer.files[0]
  if (!file) return
  uploadingReport.value = true
  await reportService.uploadReport(userId, file, { title: file.name })
  reports.value = await reportService.getUserReports(userId)
  uploadingReport.value = false
}

onMounted(loadData)
</script>
