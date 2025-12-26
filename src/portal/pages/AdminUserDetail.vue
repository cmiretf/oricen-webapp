<template>
  <div>
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B4C7E] mx-auto"></div>
    </div>

    <div v-else-if="!userDetail" class="text-center py-12 text-gray-500">
      Usuario no encontrado
    </div>

    <div v-else>
      <div class="flex items-center gap-4 mb-6">
        <router-link to="/admin/usuarios" class="text-[#2B4C7E] hover:underline">
          ← Volver a usuarios
        </router-link>
      </div>

      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="flex items-center gap-4 mb-6">
          <img v-if="userDetail.photoURL" :src="userDetail.photoURL" class="w-16 h-16 rounded-full" />
          <div v-else class="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-medium">
            {{ userDetail.displayName?.charAt(0) || '?' }}
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900">{{ userDetail.displayName || 'Sin nombre' }}</h2>
            <p class="text-gray-600">{{ userDetail.email }}</p>
            <span 
              :class="userDetail.serviceType ? 'bg-[#2B4C7E] text-white' : 'bg-yellow-100 text-yellow-800'"
              class="inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ getServiceName(userDetail.serviceType) || 'Sin servicio' }}
            </span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Subir Documento</h3>
          <input type="file" ref="docInput" @change="uploadDocument" class="hidden" />
          <button @click="$refs.docInput.click()" class="btn-primary" :disabled="uploading">
            {{ uploading ? 'Subiendo...' : 'Subir documento' }}
          </button>
          
          <div class="mt-4 space-y-2">
            <div v-for="doc in documents" :key="doc.id" class="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span class="text-sm">{{ doc.fileName }}</span>
              <div class="flex items-center gap-2">
                <select 
                  v-model="doc.status"
                  @change="updateDocStatus(doc)"
                  class="text-xs border rounded px-2 py-1"
                >
                  <option value="pending">Pendiente</option>
                  <option value="approved">Aprobado</option>
                  <option value="rejected">Rechazado</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Añadir Clave de Acceso</h3>
          <div class="space-y-3">
            <input 
              v-model="newKey.testName"
              type="text"
              placeholder="Nombre del test"
              class="w-full px-3 py-2 border rounded"
            />
            <input 
              v-model="newKey.accessCode"
              type="text"
              placeholder="Código de acceso"
              class="w-full px-3 py-2 border rounded"
            />
            <input 
              v-model="newKey.description"
              type="text"
              placeholder="Descripción (opcional)"
              class="w-full px-3 py-2 border rounded"
            />
            <button @click="addAccessKey" class="btn-primary" :disabled="!newKey.testName || !newKey.accessCode">
              Añadir clave
            </button>
          </div>
          
          <div class="mt-4 space-y-2">
            <div v-for="key in accessKeys" :key="key.id" class="p-2 bg-gray-50 rounded">
              <p class="font-medium text-sm">{{ key.testName }}</p>
              <p class="font-mono text-xs">{{ key.accessCode }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Añadir Evaluación</h3>
          <div class="space-y-3">
            <input 
              v-model="newEval.title"
              type="text"
              placeholder="Título de la evaluación"
              class="w-full px-3 py-2 border rounded"
            />
            <textarea 
              v-model="newEval.instructions"
              placeholder="Instrucciones"
              rows="3"
              class="w-full px-3 py-2 border rounded"
            ></textarea>
            <input 
              v-model="newEval.externalLink"
              type="text"
              placeholder="Enlace externo (opcional)"
              class="w-full px-3 py-2 border rounded"
            />
            <button @click="addEvaluation" class="btn-primary" :disabled="!newEval.title">
              Añadir evaluación
            </button>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Subir Informe Final</h3>
          <input type="file" ref="reportInput" @change="uploadReport" class="hidden" accept=".pdf" />
          <div class="space-y-3">
            <input 
              v-model="reportTitle"
              type="text"
              placeholder="Título del informe"
              class="w-full px-3 py-2 border rounded"
            />
            <button @click="$refs.reportInput.click()" class="btn-primary" :disabled="uploadingReport">
              {{ uploadingReport ? 'Subiendo...' : 'Subir informe PDF' }}
            </button>
          </div>
          
          <div class="mt-4 space-y-2">
            <div v-for="report in reports" :key="report.id" class="p-2 bg-gray-50 rounded">
              <p class="font-medium text-sm">{{ report.title }}</p>
              <a :href="report.downloadURL" target="_blank" class="text-[#2B4C7E] text-xs hover:underline">Descargar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { userService } from '../services/userService'
import { documentService } from '../services/documentService'
import { evaluationService } from '../services/evaluationService'
import { reportService } from '../services/reportService'

const route = useRoute()
const userId = route.params.id

const userDetail = ref(null)
const documents = ref([])
const accessKeys = ref([])
const reports = ref([])
const loading = ref(true)
const uploading = ref(false)
const uploadingReport = ref(false)
const reportTitle = ref('')

const newKey = reactive({ testName: '', accessCode: '', description: '' })
const newEval = reactive({ title: '', instructions: '', externalLink: '' })

const serviceNames = { A: 'Origen', B: 'Brújula', C: 'Atlas' }
const getServiceName = (type) => serviceNames[type]

const loadData = async () => {
  loading.value = true
  userDetail.value = await userService.getUserById(userId)
  documents.value = await documentService.getUserDocuments(userId)
  accessKeys.value = await evaluationService.getUserAccessKeys(userId)
  reports.value = await reportService.getUserReports(userId)
  loading.value = false
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

const addAccessKey = async () => {
  await evaluationService.addAccessKey(userId, { ...newKey })
  accessKeys.value = await evaluationService.getUserAccessKeys(userId)
  newKey.testName = ''
  newKey.accessCode = ''
  newKey.description = ''
}

const addEvaluation = async () => {
  await evaluationService.createEvaluation(userId, { ...newEval })
  newEval.title = ''
  newEval.instructions = ''
  newEval.externalLink = ''
}

const uploadReport = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  uploadingReport.value = true
  await reportService.uploadReport(userId, file, { title: reportTitle.value || file.name })
  reports.value = await reportService.getUserReports(userId)
  reportTitle.value = ''
  uploadingReport.value = false
}

onMounted(loadData)
</script>
