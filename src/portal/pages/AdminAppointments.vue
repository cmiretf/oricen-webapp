<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Gestión de Citas</h2>
      <button 
        @click="openCreateModal"
        class="px-4 py-2 bg-[#2B4C7E] text-white rounded-lg hover:bg-[#1a3a61] transition-colors flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Nueva Cita
      </button>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B4C7E] mx-auto"></div>
    </div>

    <div v-else-if="appointments.length === 0" class="bg-white rounded-lg shadow p-12 text-center text-gray-500">
      No hay citas programadas
    </div>

    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha y Hora</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notas</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="apt in appointments" :key="apt.id" class="hover:bg-gray-50">
            <td class="px-6 py-4">
              <p class="font-medium text-gray-900">{{ getUserName(apt.userId) }}</p>
            </td>
            <td class="px-6 py-4">
              <p class="text-gray-900">{{ formatDate(apt.date) }}</p>
              <p class="text-sm text-gray-500">{{ apt.time }}</p>
            </td>
            <td class="px-6 py-4">
              <span class="text-gray-600">{{ getTypeLabel(apt.type) }}</span>
            </td>
            <td class="px-6 py-4">
              <select 
                v-model="apt.status"
                @change="updateStatus(apt)"
                :class="getStatusClass(apt.status)"
                class="px-2 py-1 rounded text-xs font-medium border-0 cursor-pointer"
              >
                <option value="pending">Pendiente</option>
                <option value="confirmed">Confirmada</option>
                <option value="cancelled">Cancelada</option>
                <option value="completed">Completada</option>
              </select>
            </td>
            <td class="px-6 py-4">
              <p v-if="apt.notes" class="text-sm text-gray-500 max-w-xs truncate">{{ apt.notes }}</p>
              <span v-else class="text-sm text-gray-400">Sin notas</span>
            </td>
            <td class="px-6 py-4">
              <div class="flex gap-2">
                <button 
                  @click="openEditModal(apt)"
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Editar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button 
                  @click="confirmDelete(apt)"
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-xl font-bold text-gray-900">
            {{ editingAppointment ? 'Editar Cita' : 'Nueva Cita' }}
          </h3>
        </div>
        
        <form @submit.prevent="saveAppointment" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
            <select 
              v-model="formData.userId" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B4C7E] focus:border-transparent"
            >
              <option value="">Seleccionar usuario</option>
              <option v-for="u in usersList" :key="u.id" :value="u.id">
                {{ u.displayName || u.email }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
            <input 
              v-model="formData.date" 
              type="date" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B4C7E] focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Hora</label>
            <input 
              v-model="formData.time" 
              type="time" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B4C7E] focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de cita</label>
            <select 
              v-model="formData.type" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B4C7E] focus:border-transparent"
            >
              <option value="call">Llamada</option>
              <option value="video">Videollamada</option>
              <option value="inperson">Presencial</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select 
              v-model="formData.status"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B4C7E] focus:border-transparent"
            >
              <option value="pending">Pendiente</option>
              <option value="confirmed">Confirmada</option>
              <option value="cancelled">Cancelada</option>
              <option value="completed">Completada</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Notas (opcional)</label>
            <textarea 
              v-model="formData.notes"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B4C7E] focus:border-transparent resize-none"
              placeholder="Añadir notas sobre la cita..."
            ></textarea>
          </div>

          <div class="flex gap-3 pt-4">
            <button 
              type="button"
              @click="closeModal"
              class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              :disabled="saving"
              class="flex-1 px-4 py-2 bg-[#2B4C7E] text-white rounded-lg hover:bg-[#1a3a61] transition-colors disabled:opacity-50"
            >
              {{ saving ? 'Guardando...' : (editingAppointment ? 'Actualizar' : 'Crear') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-2">Eliminar Cita</h3>
        <p class="text-gray-600 mb-6">¿Estás seguro de que deseas eliminar esta cita? Esta acción no se puede deshacer.</p>
        <div class="flex gap-3">
          <button 
            @click="showDeleteConfirm = false"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button 
            @click="deleteAppointment"
            :disabled="deleting"
            class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {{ deleting ? 'Eliminando...' : 'Eliminar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { appointmentService } from '../services/appointmentService'
import { userService } from '../services/userService'

const appointments = ref([])
const users = ref({})
const usersList = ref([])
const loading = ref(true)
const saving = ref(false)
const deleting = ref(false)

const showModal = ref(false)
const showDeleteConfirm = ref(false)
const editingAppointment = ref(null)
const appointmentToDelete = ref(null)

const formData = ref({
  userId: '',
  date: '',
  time: '',
  type: 'video',
  status: 'pending',
  notes: ''
})

const loadData = async () => {
  loading.value = true
  appointments.value = await appointmentService.getAllAppointments()
  
  const allUsers = await userService.getAllUsers()
  usersList.value = allUsers.filter(u => u.role !== 'admin')
  allUsers.forEach(u => { users.value[u.id] = u })
  
  loading.value = false
}

const getUserName = (userId) => {
  return users.value[userId]?.displayName || users.value[userId]?.email || 'Usuario desconocido'
}

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('es-ES', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short' 
  })
}

const getTypeLabel = (type) => ({
  call: 'Llamada',
  video: 'Videollamada',
  inperson: 'Presencial'
}[type] || type)

const getStatusClass = (status) => ({
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800'
}[status] || 'bg-gray-100 text-gray-800')

const updateStatus = async (apt) => {
  await appointmentService.updateAppointmentStatus(apt.id, apt.status)
}

const openCreateModal = () => {
  editingAppointment.value = null
  formData.value = {
    userId: '',
    date: '',
    time: '',
    type: 'video',
    status: 'pending',
    notes: ''
  }
  showModal.value = true
}

const openEditModal = (apt) => {
  editingAppointment.value = apt
  formData.value = {
    userId: apt.userId,
    date: apt.date,
    time: apt.time,
    type: apt.type,
    status: apt.status,
    notes: apt.notes || ''
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingAppointment.value = null
}

const saveAppointment = async () => {
  saving.value = true
  try {
    if (editingAppointment.value) {
      await appointmentService.updateAppointment(editingAppointment.value.id, {
        userId: formData.value.userId,
        date: formData.value.date,
        time: formData.value.time,
        type: formData.value.type,
        status: formData.value.status,
        notes: formData.value.notes
      })
    } else {
      await appointmentService.createAppointment(formData.value.userId, {
        date: formData.value.date,
        time: formData.value.time,
        type: formData.value.type,
        status: formData.value.status,
        notes: formData.value.notes
      })
    }
    await loadData()
    closeModal()
  } catch (err) {
    console.error('Error saving appointment:', err)
    alert('Error al guardar la cita')
  }
  saving.value = false
}

const confirmDelete = (apt) => {
  appointmentToDelete.value = apt
  showDeleteConfirm.value = true
}

const deleteAppointment = async () => {
  deleting.value = true
  try {
    await appointmentService.deleteAppointment(appointmentToDelete.value.id)
    await loadData()
    showDeleteConfirm.value = false
    appointmentToDelete.value = null
  } catch (err) {
    console.error('Error deleting appointment:', err)
    alert('Error al eliminar la cita')
  }
  deleting.value = false
}

onMounted(loadData)
</script>
