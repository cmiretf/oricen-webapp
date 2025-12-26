<template>
  <div class="min-h-screen bg-gray-50">
    <PortalHeader title="Documentación" />

    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Subir Documento</h2>
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input 
            type="file" 
            ref="fileInput"
            @change="handleFileUpload"
            class="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <button 
            @click="$refs.fileInput.click()"
            class="btn-primary"
            :disabled="uploading"
          >
            {{ uploading ? 'Subiendo...' : 'Seleccionar archivo' }}
          </button>
          <p class="text-sm text-gray-500 mt-2">PDF, Word o imágenes (máx. 10MB)</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b">
          <h2 class="text-xl font-bold text-gray-900">Mis Documentos</h2>
        </div>
        
        <div v-if="loadingDocs" class="p-6 text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2B4C7E] mx-auto"></div>
        </div>

        <div v-else-if="documents.length === 0" class="p-6 text-center text-gray-500">
          No hay documentos todavía
        </div>

        <div v-else class="divide-y">
          <div 
            v-for="doc in documents" 
            :key="doc.id"
            class="p-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div class="flex items-center gap-3">
              <span class="text-2xl">📄</span>
              <div>
                <p class="font-medium text-gray-900">{{ doc.fileName }}</p>
                <p class="text-sm text-gray-500">
                  {{ formatDate(doc.createdAt) }} - 
                  <span :class="getStatusClass(doc.status)">{{ getStatusText(doc.status) }}</span>
                </p>
              </div>
            </div>
            <a 
              :href="doc.downloadURL" 
              target="_blank"
              class="text-[#2B4C7E] hover:underline text-sm"
            >
              Descargar
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
import { documentService } from '../services/documentService'
import PortalHeader from '../components/PortalHeader.vue'

const { user, initAuth } = useAuth()
initAuth()

const documents = ref([])
const loadingDocs = ref(true)
const uploading = ref(false)

const loadDocuments = async () => {
  if (user.value) {
    loadingDocs.value = true
    documents.value = await documentService.getUserDocuments(user.value.uid)
    loadingDocs.value = false
  }
}

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file || !user.value) return

  uploading.value = true
  try {
    await documentService.uploadDocument(user.value.uid, file, { uploadedBy: 'user' })
    await loadDocuments()
  } catch (err) {
    console.error('Upload error:', err)
  }
  uploading.value = false
}

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('es-ES')
}

const getStatusClass = (status) => ({
  'text-yellow-600': status === 'pending',
  'text-green-600': status === 'approved',
  'text-red-600': status === 'rejected'
})

const getStatusText = (status) => ({
  pending: 'Pendiente',
  approved: 'Aprobado',
  rejected: 'Rechazado'
}[status] || status)

onMounted(loadDocuments)
</script>
