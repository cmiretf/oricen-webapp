<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Gestión de Citas</h2>

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
                class="px-2 py-1 rounded text-xs font-medium border-0"
              >
                <option value="pending">Pendiente</option>
                <option value="confirmed">Confirmada</option>
                <option value="cancelled">Cancelada</option>
                <option value="completed">Completada</option>
              </select>
            </td>
            <td class="px-6 py-4">
              <p v-if="apt.notes" class="text-sm text-gray-500">{{ apt.notes }}</p>
              <span v-else class="text-sm text-gray-400">Sin notas</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { appointmentService } from '../services/appointmentService'
import { userService } from '../services/userService'

const appointments = ref([])
const users = ref({})
const loading = ref(true)

const loadData = async () => {
  loading.value = true
  appointments.value = await appointmentService.getAllAppointments()
  
  const allUsers = await userService.getAllUsers()
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

onMounted(loadData)
</script>
