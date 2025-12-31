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

        <div v-else-if="error" class="p-6 text-center">
          <p class="text-red-600 mb-2">{{ error }}</p>
          <button @click="loadDocuments" class="text-[#2B4C7E] hover:underline text-sm">
            Intentar de nuevo
          </button>
        </div>

        <div v-else-if="documents.length === 0" class="p-6 text-center text-gray-500">
          No hay documentos todavía
        </div>

        <div v-else class="divide-y">
          <div 
            v-for="doc in documents" 
            :key="doc.id"
            class="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors"
            @click="openPreview(doc)"
          >
            <div class="flex items-center gap-3 flex-1">
              <span class="text-2xl">📄</span>
              <div class="flex-1">
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
              @click.stop
              class="text-[#2B4C7E] hover:underline text-sm ml-4"
            >
              Descargar
            </a>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal de Previsualización -->
    <Teleport to="body">
      <Transition name="preview">
        <div 
          v-if="previewDocument"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="closePreview"
        >
          <!-- Overlay con blur -->
          <div 
            class="absolute inset-0 bg-black/60 backdrop-blur-sm"
            @click="closePreview"
          ></div>
          
          <!-- Contenedor del preview -->
          <div 
            class="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col transform transition-all duration-300"
            :class="previewDocument ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
          >
            <!-- Header del modal -->
            <div class="flex items-center justify-between p-6 border-b border-gray-200">
              <div class="flex-1 min-w-0">
                <h3 class="text-xl font-bold text-gray-900 truncate">
                  {{ previewDocument.fileName }}
                </h3>
                <p class="text-sm text-gray-500 mt-1">
                  {{ formatDate(previewDocument.createdAt) }} - 
                  <span :class="getStatusClass(previewDocument.status)">
                    {{ getStatusText(previewDocument.status) }}
                  </span>
                </p>
              </div>
              <div class="flex items-center gap-3 ml-4">
                <a 
                  :href="previewDocument.downloadURL" 
                  target="_blank"
                  class="px-4 py-2 bg-[#2B4C7E] text-white rounded-lg hover:bg-[#1e3a5e] transition-colors text-sm font-medium"
                >
                  Descargar
                </a>
                <button 
                  @click="closePreview"
                  class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Cerrar"
                >
                  <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Contenido del preview -->
            <div class="flex-1 overflow-auto p-6">
              <!-- Imagen -->
              <div v-if="isImage(previewDocument.fileType)" class="flex items-center justify-center">
                <img 
                  :src="previewDocument.downloadURL" 
                  :alt="previewDocument.fileName"
                  class="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
                />
              </div>

              <!-- PDF -->
              <div v-else-if="isPDF(previewDocument.fileType)" class="w-full h-[70vh]">
                <iframe 
                  :src="previewDocument.downloadURL"
                  class="w-full h-full border-0 rounded-lg shadow-lg"
                  frameborder="0"
                ></iframe>
              </div>

              <!-- Word u otros -->
              <div v-else class="flex flex-col items-center justify-center h-[70vh] text-center">
                <div class="text-6xl mb-4">📄</div>
                <p class="text-lg text-gray-700 mb-2">
                  Vista previa no disponible para este tipo de archivo
                </p>
                <p class="text-sm text-gray-500 mb-6">
                  {{ previewDocument.fileName }}
                </p>
                <a 
                  :href="previewDocument.downloadURL" 
                  target="_blank"
                  class="px-6 py-3 bg-[#2B4C7E] text-white rounded-lg hover:bg-[#1e3a5e] transition-colors font-medium"
                >
                  Descargar para ver
                </a>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { documentService } from '../services/documentService'
import PortalHeader from '../components/PortalHeader.vue'

const { user, initAuth, loading: authLoading } = useAuth()
initAuth()

const documents = ref([])
const loadingDocs = ref(true)
const uploading = ref(false)
const error = ref(null)
const previewDocument = ref(null)

const loadDocuments = async () => {
  if (!user.value) {
    loadingDocs.value = false
    return
  }

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

// Cargar documentos cuando el usuario esté disponible
watch([user, authLoading], ([newUser, newLoading]) => {
  if (!newLoading && newUser) {
    loadDocuments()
  } else if (!newLoading && !newUser) {
    loadingDocs.value = false
  }
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
  pending: 'Pendiente',
  approved: 'Aprobado',
  rejected: 'Rechazado'
}[status] || status)

const isImage = (fileType) => {
  return fileType?.startsWith('image/')
}

const isPDF = (fileType) => {
  return fileType === 'application/pdf' || fileType?.includes('pdf')
}

const handleEscape = (e) => {
  if (e.key === 'Escape' && previewDocument.value) {
    closePreview()
  }
}

const openPreview = (doc) => {
  previewDocument.value = doc
  // Prevenir scroll del body cuando el modal está abierto
  document.body.style.overflow = 'hidden'
  // Agregar listener para Escape
  window.addEventListener('keydown', handleEscape)
}

const closePreview = () => {
  previewDocument.value = null
  // Restaurar scroll del body
  document.body.style.overflow = ''
  // Remover listener de Escape
  window.removeEventListener('keydown', handleEscape)
}

// Limpiar listener al desmontar el componente
onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Transiciones modernas para el modal */
.preview-enter-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.preview-leave-active {
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.preview-enter-active .relative {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}

.preview-leave-active .relative {
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease;
}

.preview-enter-from {
  opacity: 0;
}

.preview-leave-to {
  opacity: 0;
}

.preview-enter-from .relative {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

.preview-leave-to .relative {
  transform: scale(0.95) translateY(-10px);
  opacity: 0;
}

.preview-enter-to .relative {
  transform: scale(1) translateY(0);
  opacity: 1;
}
</style>
