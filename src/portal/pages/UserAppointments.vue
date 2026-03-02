<template>
  <UserPortalLayout>
    <div class="max-w-3xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Reserva de Entrevista</h1>
      <p class="text-gray-600 mb-6">
        Reserva aquí la fecha para tu entrevista. Duración aproximada: 45 minutos.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div class="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p class="text-sm font-medium text-gray-700">Entrevista del Evaluado</p>
          <div class="flex items-center justify-center gap-2 mt-2">
            <div :class="hasBookedType('evaluado') ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'" class="w-6 h-6 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="hasBookedType('evaluado')" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01" />
              </svg>
            </div>
            <span class="text-sm">{{ hasBookedType('evaluado') ? 'Reservado' : 'No Reservado' }}</span>
          </div>
        </div>
        <div class="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p class="text-sm font-medium text-gray-700">Entrevista de Padres</p>
          <div class="flex items-center justify-center gap-2 mt-2">
            <div :class="hasBookedType('padres') ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'" class="w-6 h-6 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="hasBookedType('padres')" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01" />
              </svg>
            </div>
            <span class="text-sm">{{ hasBookedType('padres') ? 'Reservado' : 'No Reservado' }}</span>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 class="text-lg font-bold text-gray-900 mb-4">Nueva Reserva</h2>

        <div class="flex items-center gap-4 mb-4">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" v-model="newAppointment.type" value="video" class="accent-[#2B4C7E]" />
            <span class="text-sm font-medium">Online</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" v-model="newAppointment.type" value="inperson" class="accent-[#2B4C7E]" />
            <span class="text-sm font-medium">Presencial</span>
          </label>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de entrevista</label>
            <select
              v-model="newAppointment.interviewType"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
            >
              <option value="evaluado">Entrevista del Evaluado</option>
              <option value="padres">Entrevista de Padres</option>
            </select>
          </div>

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
            <div class="flex flex-wrap gap-2">
              <button
                v-for="slot in availableSlots"
                :key="slot"
                @click="newAppointment.time = slot"
                :class="newAppointment.time === slot ? 'bg-[#2B4C7E] text-white border-[#2B4C7E]' : 'bg-white text-gray-700 border-gray-300 hover:border-[#2B4C7E]'"
                class="px-4 py-2 border rounded-lg text-sm font-medium transition-colors"
              >
                {{ slot }}
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Notas adicionales</label>
            <textarea
              v-model="newAppointment.notes"
              rows="2"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E] resize-none"
              placeholder="Información adicional..."
            ></textarea>
          </div>

          <button
            @click="createAppointment"
            class="w-full py-3 bg-[#2B4C7E] text-white rounded-lg font-medium hover:bg-[#1a3a61] transition-colors disabled:opacity-50"
            :disabled="!canBook || booking"
          >
            {{ booking ? 'Reservando...' : 'Reservar cita' }}
          </button>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-200">
        <div class="p-5 border-b border-gray-200">
          <h2 class="text-lg font-bold text-gray-900">Mis Citas</h2>
        </div>

        <div v-if="loading" class="p-6 text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2B4C7E] mx-auto"></div>
        </div>

        <div v-else-if="appointments.length === 0" class="p-6 text-center text-gray-500">
          No tienes citas programadas
        </div>

        <div v-else class="divide-y divide-gray-100">
          <div v-for="apt in appointments" :key="apt.id" class="p-4">
            <div class="flex justify-between items-start">
              <div>
                <p class="font-medium text-gray-900">{{ formatDate(apt.date) }} - {{ apt.time }}</p>
                <p class="text-sm text-gray-600">{{ getTypeLabel(apt.type) }} {{ apt.interviewType ? '(' + getInterviewLabel(apt.interviewType) + ')' : '' }}</p>
                <p v-if="apt.notes" class="text-sm text-gray-500 mt-1">{{ apt.notes }}</p>
              </div>
              <span :class="getStatusClass(apt.status)" class="px-2 py-1 rounded text-xs font-medium">
                {{ getStatusLabel(apt.status) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserPortalLayout>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useAuth } from '../composables/useAuth'
import { appointmentService } from '../services/appointmentService'
import UserPortalLayout from '../components/UserPortalLayout.vue'

const { user, initAuth } = useAuth()
initAuth()

const appointments = ref([])
const loading = ref(true)
const booking = ref(false)

const newAppointment = reactive({
  date: '',
  time: '',
  type: 'video',
  interviewType: 'evaluado',
  notes: ''
})

const availableSlots = ['09:00', '10:00', '11:00', '12:00', '16:00', '17:00', '18:00']

const minDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
})

const canBook = computed(() => newAppointment.date && newAppointment.time && newAppointment.type)

const hasBookedType = (interviewType) => {
  return appointments.value.some(a => a.interviewType === interviewType && a.status !== 'cancelled')
}

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
      interviewType: newAppointment.interviewType,
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
  return new Date(dateStr).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

const getTypeLabel = (type) => ({ call: 'Llamada', video: 'Videollamada', inperson: 'Presencial' }[type] || type)
const getInterviewLabel = (type) => ({ evaluado: 'Evaluado', padres: 'Padres' }[type] || type)
const getStatusLabel = (status) => ({ pending: 'Pendiente', confirmed: 'Confirmada', cancelled: 'Cancelada', completed: 'Completada' }[status] || status)
const getStatusClass = (status) => ({ pending: 'bg-yellow-100 text-yellow-800', confirmed: 'bg-green-100 text-green-800', cancelled: 'bg-red-100 text-red-800', completed: 'bg-blue-100 text-blue-800' }[status] || 'bg-gray-100 text-gray-800')

onMounted(loadAppointments)
</script>
