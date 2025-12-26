<template>
  <div class="min-h-screen bg-gray-50">
    <PortalHeader title="Calendario y Citas" />

    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Reservar Cita</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
              <input 
                type="date" 
                v-model="newAppointment.date"
                :min="minDate"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Hora</label>
              <select 
                v-model="newAppointment.time"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
              >
                <option value="">Selecciona una hora</option>
                <option v-for="slot in availableSlots" :key="slot" :value="slot">{{ slot }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de cita</label>
              <select 
                v-model="newAppointment.type"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
              >
                <option value="call">Llamada telefónica</option>
                <option value="video">Videollamada</option>
                <option value="inperson">Presencial</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Notas adicionales</label>
              <textarea 
                v-model="newAppointment.notes"
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
                placeholder="Información adicional..."
              ></textarea>
            </div>

            <button 
              @click="createAppointment"
              class="w-full btn-primary"
              :disabled="!canBook || booking"
            >
              {{ booking ? 'Reservando...' : 'Reservar cita' }}
            </button>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Mis Citas</h2>
          
          <div v-if="loading" class="text-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2B4C7E] mx-auto"></div>
          </div>

          <div v-else-if="appointments.length === 0" class="text-center py-8 text-gray-500">
            No tienes citas programadas
          </div>

          <div v-else class="space-y-4">
            <div 
              v-for="apt in appointments" 
              :key="apt.id"
              class="border rounded-lg p-4"
            >
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-medium text-gray-900">{{ formatDate(apt.date) }} - {{ apt.time }}</p>
                  <p class="text-sm text-gray-600">{{ getTypeLabel(apt.type) }}</p>
                  <p v-if="apt.notes" class="text-sm text-gray-500 mt-1">{{ apt.notes }}</p>
                </div>
                <span 
                  :class="getStatusClass(apt.status)"
                  class="px-2 py-1 rounded text-xs font-medium"
                >
                  {{ getStatusLabel(apt.status) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useAuth } from '../composables/useAuth'
import { appointmentService } from '../services/appointmentService'
import PortalHeader from '../components/PortalHeader.vue'

const { user, initAuth } = useAuth()
initAuth()

const appointments = ref([])
const loading = ref(true)
const booking = ref(false)

const newAppointment = reactive({
  date: '',
  time: '',
  type: 'video',
  notes: ''
})

const availableSlots = ['09:00', '10:00', '11:00', '12:00', '16:00', '17:00', '18:00']

const minDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
})

const canBook = computed(() => {
  return newAppointment.date && newAppointment.time && newAppointment.type
})

const loadAppointments = async () => {
  if (user.value) {
    loading.value = true
    appointments.value = await appointmentService.getUserAppointments(user.value.uid)
    loading.value = false
  }
}

const createAppointment = async () => {
  if (!user.value || !canBook.value) return
  
  booking.value = true
  try {
    await appointmentService.createAppointment(user.value.uid, {
      date: newAppointment.date,
      time: newAppointment.time,
      type: newAppointment.type,
      notes: newAppointment.notes
    })
    newAppointment.date = ''
    newAppointment.time = ''
    newAppointment.notes = ''
    await loadAppointments()
  } catch (err) {
    console.error('Booking error:', err)
  }
  booking.value = false
}

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const getTypeLabel = (type) => ({
  call: 'Llamada telefónica',
  video: 'Videollamada',
  inperson: 'Presencial'
}[type] || type)

const getStatusLabel = (status) => ({
  pending: 'Pendiente',
  confirmed: 'Confirmada',
  cancelled: 'Cancelada',
  completed: 'Completada'
}[status] || status)

const getStatusClass = (status) => ({
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800'
}[status] || 'bg-gray-100 text-gray-800')

onMounted(loadAppointments)
</script>
