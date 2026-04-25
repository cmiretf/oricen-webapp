<script setup>
import { reactive, ref } from 'vue'
import { Phone, Mail, ThumbsUp, MapPin, Instagram, Linkedin, Quote } from 'lucide-vue-next'

const form = reactive({
  nombre: '',
  apellidos: '',
  email: '',
  telefono: '',
  perfil: '',
  mensaje: '',
})
const sent = ref(false)
const errorMsg = ref('')

const onSubmit = () => {
  errorMsg.value = ''
  if (!form.nombre || !form.email || !form.telefono || !form.perfil || !form.mensaje) {
    errorMsg.value = 'Completa los campos obligatorios.'
    return
  }
  sent.value = true
  setTimeout(() => {
    sent.value = false
    Object.keys(form).forEach((k) => (form[k] = ''))
  }, 3000)
}
</script>

<template>
  <div class="fade-in">
    <section class="section pb-10 pt-14">
      <div class="container-page text-center">
        <h1 class="heading-section">Habla con un orientador de Oricen</h1>
        <p class="mx-auto mt-4 max-w-3xl text-base text-gray-700">
          Reserva tu <span class="accent-blue">sesión gratuita</span> en el calendario y únete a los
          <span class="accent-blue">más de 500 alumnos</span> que ya han diseñado su futuro con nosotros.
        </p>
      </div>
    </section>

    <!-- Calendly placeholder -->
    <section class="container-page">
      <div class="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
        <div class="grid gap-6 md:grid-cols-2">
          <div class="flex flex-col items-center justify-center border-b border-gray-200 pb-6 md:border-b-0 md:border-r md:pb-0 md:pr-6">
            <div class="flex h-20 w-20 items-center justify-center rounded-full bg-oricen text-3xl font-extrabold text-white">
              O
            </div>
            <p class="mt-4 text-base font-bold text-oricen">Oricen</p>
            <p class="mt-2 text-lg font-bold text-gray-900">Llamada de Descubrimiento</p>
            <p class="mt-1 text-sm text-gray-600">⏱️ 30 min · Videollamada</p>
          </div>
          <div>
            <p class="text-base font-bold text-gray-900">Selecciona una fecha y hora</p>
            <iframe
              src="https://calendar.google.com/calendar/embed?src=es-es.spain%23holiday%40group.v.calendar.google.com&ctz=Europe%2FMadrid"
              class="mt-3 h-72 w-full rounded-md border border-gray-200"
              loading="lazy"
            />
            <p class="mt-3 text-xs text-gray-500">
              Zona horaria: Europa Central
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Otras vías + formulario -->
    <section class="section">
      <div class="container-page grid gap-10 lg:grid-cols-2">
        <div>
          <h2 class="text-2xl font-extrabold text-gray-900">Otras vías de contacto</h2>
          <ul class="mt-8 space-y-7 text-center">
            <li>
              <Phone class="mx-auto h-6 w-6 text-oricen" />
              <p class="mt-2 text-sm font-semibold text-gray-800">Teléfono / Whatsapp</p>
              <p class="text-sm text-gray-600">+34 656 333 373</p>
            </li>
            <li>
              <Mail class="mx-auto h-6 w-6 text-oricen" />
              <p class="mt-2 text-sm font-semibold text-gray-800">Email</p>
              <a href="mailto:info@oricen.com" class="text-sm text-gray-600 hover:text-oricen">info@oricen.com</a>
            </li>
            <li>
              <ThumbsUp class="mx-auto h-6 w-6 text-oricen" />
              <p class="mt-2 text-sm font-semibold text-gray-800">Redes sociales</p>
              <div class="mt-2 flex items-center justify-center gap-3">
                <a href="https://www.instagram.com/_oricen_" target="_blank" rel="noopener" class="text-oricen hover:opacity-70" aria-label="Instagram">
                  <Instagram class="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/company/oricen/" target="_blank" rel="noopener" class="text-oricen hover:opacity-70" aria-label="LinkedIn">
                  <Linkedin class="h-5 w-5" />
                </a>
                <a href="https://www.tiktok.com/@_oricen_" target="_blank" rel="noopener" class="text-oricen hover:opacity-70" aria-label="TikTok">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.85A8.16 8.16 0 0 0 21.5 10.5V7.06a4.79 4.79 0 0 1-1.91-.37Z"/></svg>
                </a>
              </div>
            </li>
            <li>
              <MapPin class="mx-auto h-6 w-6 text-oricen" />
              <p class="mt-2 text-sm font-semibold text-gray-800">Oficinas</p>
              <p class="text-sm text-gray-600">
                Camino Valdenigriales S/N, 28223,<br />
                Pozuelo de Alarcón (ESIC University)
              </p>
            </li>
          </ul>

          <div class="mt-12 max-w-md text-sm text-gray-600">
            <Quote class="h-5 w-5 text-oricen" />
            <p class="mt-2 italic">
              "En menos de 24h me llamó Juan para explicarme cómo funciona el proceso. Sin presión, muy cercano."
            </p>
            <p class="mt-3 text-right text-xs font-semibold text-gray-700">— Madre de alumno, 17 años, Madrid</p>
          </div>
        </div>

        <div class="rounded-2xl bg-oricen/10 p-8 sm:p-10">
          <h2 class="text-center text-2xl font-extrabold text-gray-900">¿Prefieres que te contactemos nosotros?</h2>
          <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
            <div class="grid gap-4 sm:grid-cols-2">
              <label class="block">
                <span class="text-xs font-semibold text-gray-700">Nombre *</span>
                <input v-model="form.nombre" type="text" required class="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-oricen focus:outline-none focus:ring-1 focus:ring-oricen" />
              </label>
              <label class="block">
                <span class="text-xs font-semibold text-gray-700">Apellidos *</span>
                <input v-model="form.apellidos" type="text" class="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-oricen focus:outline-none focus:ring-1 focus:ring-oricen" />
              </label>
            </div>
            <label class="block">
              <span class="text-xs font-semibold text-gray-700">Email *</span>
              <input v-model="form.email" type="email" required class="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-oricen focus:outline-none focus:ring-1 focus:ring-oricen" />
            </label>
            <label class="block">
              <span class="text-xs font-semibold text-gray-700">Teléfono *</span>
              <input v-model="form.telefono" type="tel" required class="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-oricen focus:outline-none focus:ring-1 focus:ring-oricen" />
            </label>
            <label class="block">
              <span class="text-xs font-semibold text-gray-700">Familia / Colegio *</span>
              <select v-model="form.perfil" required class="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-oricen focus:outline-none focus:ring-1 focus:ring-oricen">
                <option value="">Elige una opción</option>
                <option value="familia">Familia</option>
                <option value="colegio">Colegio</option>
                <option value="otro">Otro</option>
              </select>
            </label>
            <label class="block">
              <span class="text-xs font-semibold text-gray-700">¿En qué podemos ayudarte? *</span>
              <textarea v-model="form.mensaje" required rows="4" class="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-oricen focus:outline-none focus:ring-1 focus:ring-oricen" />
            </label>
            <p v-if="errorMsg" class="text-xs text-red-600">{{ errorMsg }}</p>
            <button type="submit" class="w-full rounded-md bg-oricen px-4 py-3 text-sm font-bold text-white transition hover:bg-oricen-dark">
              {{ sent ? '¡Recibido! Te contactaremos pronto.' : 'Enviar consulta' }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
