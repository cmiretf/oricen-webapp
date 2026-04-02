<template>
  <UserPortalLayout>
    <div class="max-w-3xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Reserva de Entrevista</h1>
      <p class="text-gray-600 mb-6">
        Reserva aquí la fecha para tu entrevista. Duración aproximada: 1 hora.
      </p>

      <!-- TABS: Tipo de entrevista -->
      <div class="grid grid-cols-2 gap-3 mb-6">
        <button
          @click="selectedTab = 'evaluado'"
          class="rounded-xl border p-4 text-center transition-all"
          :class="selectedTab === 'evaluado'
            ? 'border-[#2B4C7E] bg-blue-50 ring-1 ring-[#2B4C7E]'
            : 'border-gray-200 bg-white hover:border-gray-300'"
        >
          <p class="text-sm font-medium" :class="selectedTab === 'evaluado' ? 'text-[#2B4C7E]' : 'text-gray-700'">Entrevista del Evaluado</p>
          <div class="flex items-center justify-center gap-1.5 mt-2">
            <div class="w-5 h-5 rounded-full flex items-center justify-center"
              :class="hasBookedType('evaluado') ? 'bg-green-100' : 'bg-yellow-100'">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" :class="hasBookedType('evaluado') ? 'text-green-600' : 'text-yellow-600'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="hasBookedType('evaluado')" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01" />
              </svg>
            </div>
            <span class="text-xs" :class="hasBookedType('evaluado') ? 'text-green-600 font-medium' : 'text-yellow-600'">
              {{ hasBookedType('evaluado') ? 'Reservado' : 'No Reservado' }}
            </span>
          </div>
        </button>
        <button
          @click="selectedTab = 'padres'"
          class="rounded-xl border p-4 text-center transition-all"
          :class="selectedTab === 'padres'
            ? 'border-[#2B4C7E] bg-blue-50 ring-1 ring-[#2B4C7E]'
            : 'border-gray-200 bg-white hover:border-gray-300'"
        >
          <p class="text-sm font-medium" :class="selectedTab === 'padres' ? 'text-[#2B4C7E]' : 'text-gray-700'">Entrevista de Padres</p>
          <div class="flex items-center justify-center gap-1.5 mt-2">
            <div class="w-5 h-5 rounded-full flex items-center justify-center"
              :class="hasBookedType('padres') ? 'bg-green-100' : 'bg-yellow-100'">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" :class="hasBookedType('padres') ? 'text-green-600' : 'text-yellow-600'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="hasBookedType('padres')" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01" />
              </svg>
            </div>
            <span class="text-xs" :class="hasBookedType('padres') ? 'text-green-600 font-medium' : 'text-yellow-600'">
              {{ hasBookedType('padres') ? 'Reservado' : 'No Reservado' }}
            </span>
          </div>
        </button>
      </div>

      <!-- BOOKING CARD -->
      <div class="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <!-- Online / Presencial toggle -->
        <div class="flex items-center gap-1 mb-5 bg-gray-100 rounded-lg p-1 w-fit">
          <button
            @click="newAppointment.type = 'video'"
            class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
            :class="newAppointment.type === 'video' ? 'bg-[#2B4C7E] text-white shadow-sm' : 'text-gray-600 hover:text-gray-800'"
          >
            Online
          </button>
          <button
            @click="newAppointment.type = 'inperson'"
            class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
            :class="newAppointment.type === 'inperson' ? 'bg-[#2B4C7E] text-white shadow-sm' : 'text-gray-600 hover:text-gray-800'"
          >
            Presencial
          </button>
        </div>

        <!-- Direccion condicional -->
        <div v-if="newAppointment.type === 'inperson'" class="mb-5 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <div class="flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#2B4C7E] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p class="text-sm font-medium text-[#2B4C7E]">Dirección de la oficina</p>
              <p class="text-sm text-gray-700 mt-0.5">Camino de Valdenigriales, s/n, 28223 Pozuelo de Alarcón, Madrid</p>
              <p class="text-xs text-gray-500 mt-0.5">ESIC University</p>
            </div>
          </div>
        </div>

        <!-- CALENDARIO -->
        <div class="mb-5">
          <div class="flex items-center justify-between mb-4">
            <button @click="prevMonth" class="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 class="text-base font-bold text-gray-900">{{ monthYearLabel }}</h3>
            <button @click="nextMonth" class="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-7 mb-2">
            <div v-for="day in weekDays" :key="day" class="text-center text-xs font-medium text-gray-500 py-2">{{ day }}</div>
          </div>

          <div class="grid grid-cols-7">
            <div v-for="(day, i) in calendarDays" :key="i" class="text-center py-1">
              <button
                v-if="day"
                @click="selectDate(day)"
                :disabled="isPastDate(day)"
                class="w-9 h-9 rounded-full text-sm font-medium transition-all mx-auto flex items-center justify-center"
                :class="getDayClass(day)"
              >
                {{ day.getDate() }}
              </button>
              <div v-else class="w-9 h-9"></div>
            </div>
          </div>
        </div>

        <!-- TIME SLOTS -->
        <div v-if="newAppointment.date" class="mb-5">
          <p class="text-sm font-medium text-gray-700 mb-3">Horarios disponibles</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="slot in availableSlots"
              :key="slot"
              @click="newAppointment.time = slot"
              class="px-4 py-2.5 border rounded-lg text-sm font-medium transition-all"
              :class="newAppointment.time === slot
                ? 'bg-[#2B4C7E] text-white border-[#2B4C7E] shadow-sm'
                : 'bg-white text-gray-700 border-gray-200 hover:border-[#2B4C7E] hover:text-[#2B4C7E]'"
            >
              {{ slot }}
            </button>
          </div>
        </div>

        <!-- NOTAS -->
        <div v-if="newAppointment.date && newAppointment.time" class="mb-5">
          <label class="block text-sm font-medium text-gray-700 mb-2">Notas adicionales</label>
          <textarea
            v-model="newAppointment.notes"
            rows="2"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E] resize-none text-sm"
            placeholder="Información adicional (opcional)..."
          ></textarea>
        </div>

        <!-- BOTON RESERVAR -->
        <button
          @click="createAppointment"
          class="w-full py-3 bg-[#2B4C7E] text-white rounded-lg font-medium hover:bg-[#1a3a61] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="!canBook || booking"
        >
          {{ booking ? 'Reservando...' : 'Reservar cita' }}
        </button>

        <div v-if="calendarSuccess" class="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p class="text-sm text-green-700 font-medium">{{ calendarSuccess }}</p>
        </div>

        <p v-if="!googleAccessToken" class="mt-2 text-xs text-gray-400 text-center">
          Inicia sesión con Google para sincronizar con Google Calendar y Meet
        </p>
      </div>

      <!-- MIS CITAS -->
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
                <p class="font-medium text-gray-900">{{ formatDisplayDate(apt.date) }} - {{ apt.time }}</p>
                <p class="text-sm text-gray-600">{{ getTypeLabel(apt.type) }} ({{ getInterviewLabel(apt.interviewType) }})</p>
                <p v-if="apt.notes" class="text-sm text-gray-500 mt-1">{{ apt.notes }}</p>
                <div v-if="apt.meetLink" class="mt-2">
                  <a :href="apt.meetLink" target="_blank" class="inline-flex items-center gap-1.5 text-sm font-medium text-[#2B4C7E] hover:text-[#1a3a61]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Unirse a Google Meet
                  </a>
                </div>
                <a v-if="apt.calendarLink" :href="apt.calendarLink" target="_blank" class="text-xs text-gray-400 hover:text-gray-600 mt-1 inline-block">
                  Ver en Google Calendar
                </a>
              </div>
              <span :class="getStatusClass(apt.status)" class="px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0">
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
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { useAuth } from '../composables/useAuth'
import { appointmentService } from '../services/appointmentService'
import { calendarService } from '../services/calendarService'
import UserPortalLayout from '../components/UserPortalLayout.vue'

const { user, googleAccessToken, initAuth } = useAuth()
initAuth()

const appointments = ref([])
const loading = ref(true)
const booking = ref(false)
const calendarSuccess = ref(null)
const selectedTab = ref('evaluado')

const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())

const newAppointment = reactive({
  date: '',
  time: '',
  type: 'video',
  notes: ''
})

const availableSlots = ['09:00', '10:00', '11:00', '12:00', '16:00', '17:00', '18:00']

const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

const monthYearLabel = computed(() => `${monthNames[currentMonth.value]} ${currentYear.value}`)

const calendarDays = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  let startDay = firstDay.getDay() - 1
  if (startDay < 0) startDay = 6

  const days = []
  for (let i = 0; i < startDay; i++) days.push(null)
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d))
  }
  return days
})

const selectedDate = computed(() => {
  if (!newAppointment.date) return null
  return new Date(newAppointment.date + 'T00:00:00')
})

const isPastDate = (date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date <= today
}

const isWeekend = (date) => {
  const day = date.getDay()
  return day === 0 || day === 6
}

const getDayClass = (date) => {
  if (isPastDate(date) || isWeekend(date)) {
    return 'text-gray-300 cursor-not-allowed'
  }
  if (selectedDate.value && date.toDateString() === selectedDate.value.toDateString()) {
    return 'bg-[#2B4C7E] text-white shadow-sm'
  }
  const today = new Date()
  if (date.toDateString() === today.toDateString()) {
    return 'bg-gray-100 text-gray-900 hover:bg-[#2B4C7E] hover:text-white'
  }
  return 'text-gray-700 hover:bg-gray-100'
}

const selectDate = (date) => {
  if (isPastDate(date) || isWeekend(date)) return
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  newAppointment.date = `${y}-${m}-${d}`
  newAppointment.time = ''
}

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const canBook = computed(() => newAppointment.date && newAppointment.time)

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
  calendarSuccess.value = null
  try {
    const interviewLabel = selectedTab.value === 'evaluado' ? 'Entrevista del Evaluado' : 'Entrevista de Padres'
    const appointmentData = {
      date: newAppointment.date,
      time: newAppointment.time,
      type: newAppointment.type,
      interviewType: selectedTab.value,
      notes: newAppointment.notes
    }

    // Create Google Calendar event if token available
    if (googleAccessToken.value) {
      try {
        const calEvent = await calendarService.createEvent(googleAccessToken.value, {
          summary: `${interviewLabel} - Oricen`,
          description: `Reserva de ${interviewLabel.toLowerCase()} para orientación vocacional.\n${newAppointment.notes || ''}`,
          date: newAppointment.date,
          time: newAppointment.time,
          duration: 60,
          attendeeEmail: user.value.email,
          type: newAppointment.type
        })
        appointmentData.calendarEventId = calEvent.eventId
        appointmentData.meetLink = calEvent.meetLink
        appointmentData.calendarLink = calEvent.htmlLink
        calendarSuccess.value = calEvent.meetLink
          ? `Evento creado en Google Calendar con enlace de Google Meet`
          : `Evento creado en Google Calendar`
      } catch (calErr) {
        console.warn('Google Calendar event not created:', calErr.message)
      }
    }

    await appointmentService.createAppointment(user.value.uid, appointmentData)
    newAppointment.date = ''
    newAppointment.time = ''
    newAppointment.notes = ''
    await loadAppointments()
  } catch (err) {
    console.error('Booking error:', err)
  }
  booking.value = false
}

const formatDisplayDate = (dateStr) => {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

const getTypeLabel = (type) => ({ call: 'Llamada', video: 'Online', inperson: 'Presencial' }[type] || type)
const getInterviewLabel = (type) => ({ evaluado: 'Evaluado', padres: 'Padres' }[type] || type)
const getStatusLabel = (status) => ({ pending: 'Pendiente', confirmed: 'Confirmada', cancelled: 'Cancelada', completed: 'Completada' }[status] || status)
const getStatusClass = (status) => ({
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800'
}[status] || 'bg-gray-100 text-gray-800')

watch(selectedTab, () => {
  newAppointment.date = ''
  newAppointment.time = ''
  newAppointment.notes = ''
})

onMounted(loadAppointments)
watch(user, (val) => { if (val) loadAppointments() })
</script>
