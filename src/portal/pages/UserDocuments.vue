<template>
  <UserPortalLayout>
    <div class="max-w-3xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Buzón de Documentos</h1>
      <p class="text-gray-600 mb-6">
        <span class="font-semibold">Instrucciones:</span> Sube aquí todos los documentos necesarios para tu evaluación. Esto incluye notas escolares de los últimos años, certificados de idiomas y cualquier otro informe psicopedagógico relevante que tengas.
      </p>

      <div class="mb-6">
        <input
          type="file"
          ref="fileInput"
          @change="handleFileUpload"
          class="hidden"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
        <button
          @click="$refs.fileInput.click()"
          class="px-6 py-3 bg-[#2B4C7E] text-white rounded-lg font-medium hover:bg-[#1a3a61] transition-colors flex items-center gap-2"
          :disabled="uploading"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          {{ uploading ? 'Subiendo...' : 'Subir Documento' }}
        </button>
        <p class="text-sm text-gray-500 mt-2">PDF, Word o imágenes (máx. 10MB)</p>
      </div>

      <div class="bg-white rounded-xl border border-gray-200">
        <div class="p-5 border-b border-gray-200">
          <h2 class="text-lg font-bold text-gray-900">Documentos Subidos</h2>
        </div>

        <div v-if="loadingDocs" class="p-6 text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2B4C7E] mx-auto"></div>
        </div>

        <div v-else-if="error" class="p-6 text-center">
          <p class="text-red-600 mb-2">{{ error }}</p>
          <button @click="loadDocuments" class="text-[#2B4C7E] hover:underline text-sm">
            Intentar de nuevo
          </button>
        </div>

        <div v-else-if="documents.length === 0" class="p-6 text-center text-gray-500">
          No hay documentos todavía
        </div>

        <div v-else class="divide-y divide-gray-100">
          <div
            v-for="doc in documents"
            :key="doc.id"
            class="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
            @click="openPreview(doc)"
          >
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-gray-900 truncate">{{ doc.fileName }}</p>
                <p class="text-sm text-gray-500">
                  {{ formatDate(doc.createdAt) }}
                  <span class="mx-1">-</span>
                  <span :class="getStatusClass(doc.status)">{{ getStatusText(doc.status) }}</span>
                </p>
              </div>
            </div>
            <a
              :href="doc.downloadURL"
              target="_blank"
              @click.stop
              class="text-[#2B4C7E] hover:text-[#1a3a61] ml-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="preview">
        <div
          v-if="previewDocument"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="closePreview"
        >
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closePreview"></div>
          <div class="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
            <div class="flex items-center justify-between p-6 border-b border-gray-200">
              <div class="flex-1 min-w-0">
                <h3 class="text-xl font-bold text-gray-900 truncate">{{ previewDocument.fileName }}</h3>
                <p class="text-sm text-gray-500 mt-1">
                  {{ formatDate(previewDocument.createdAt) }} -
                  <span :class="getStatusClass(previewDocument.status)">{{ getStatusText(previewDocument.status) }}</span>
                </p>
              </div>
              <div class="flex items-center gap-3 ml-4">
                <a :href="previewDocument.downloadURL" target="_blank" class="px-4 py-2 bg-[#2B4C7E] text-white rounded-lg hover:bg-[#1e3a5e] transition-colors text-sm font-medium">Descargar</a>
                <button @click="closePreview" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
            <div class="flex-1 overflow-auto p-6">
              <div v-if="isImage(previewDocument.fileType)" class="flex items-center justify-center">
                <img :src="previewDocument.downloadURL" :alt="previewDocument.fileName" class="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg" />
              </div>
              <div v-else-if="isPDF(previewDocument.fileType)" class="w-full h-[70vh]">
                <iframe :src="previewDocument.downloadURL" class="w-full h-full border-0 rounded-lg shadow-lg"></iframe>
              </div>
              <div v-else class="flex flex-col items-center justify-center h-[70vh] text-center">
                <div class="text-6xl mb-4">📄</div>
                <p class="text-lg text-gray-700 mb-2">Vista previa no disponible para este tipo de archivo</p>
                <a :href="previewDocument.downloadURL" target="_blank" class="px-6 py-3 bg-[#2B4C7E] text-white rounded-lg hover:bg-[#1e3a5e] transition-colors font-medium">Descargar para ver</a>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </UserPortalLayout>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { documentService } from '../services/documentService'
import UserPortalLayout from '../components/UserPortalLayout.vue'

const { user, initAuth, loading: authLoading } = useAuth()
initAuth()

const documents = ref([])
const loadingDocs = ref(true)
const uploading = ref(false)
const error = ref(null)
const previewDocument = ref(null)

const loadDocuments = async () => {
  if (!user.value) { loadingDocs.value = false; return }
  try {
    loadingDocs.value = true
    error.value = null
    documents.value = await documentService.getUserDocuments(user.value.uid)
  } catch (err) {
    console.error('Error loading documents:', err)
    error.value = err.message || 'Error al cargar los documentos'
    documents.value = []
  } finally {
    loadingDocs.value = false
  }
}

watch([user, authLoading], ([newUser, newLoading]) => {
  if (!newLoading && newUser) loadDocuments()
  else if (!newLoading && !newUser) loadingDocs.value = false
}, { immediate: true })

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file || !user.value) return
  uploading.value = true
  try {
    await documentService.uploadDocument(user.value.uid, file, { uploadedBy: 'user' })
    await loadDocuments()
  } catch (err) {
    console.error('Upload error:', err)
    error.value = err.message || 'Error al subir el documento'
  } finally {
    uploading.value = false
  }
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
  pending: 'Pendiente', approved: 'Aprobado', rejected: 'Rechazado'
}[status] || status)

const isImage = (fileType) => fileType?.startsWith('image/')
const isPDF = (fileType) => fileType === 'application/pdf' || fileType?.includes('pdf')

const handleEscape = (e) => { if (e.key === 'Escape' && previewDocument.value) closePreview() }

const openPreview = (doc) => {
  previewDocument.value = doc
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleEscape)
}

const closePreview = () => {
  previewDocument.value = null
  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleEscape)
}

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.preview-enter-active { transition: opacity 0.3s ease; }
.preview-leave-active { transition: opacity 0.25s ease; }
.preview-enter-from, .preview-leave-to { opacity: 0; }
</style>
