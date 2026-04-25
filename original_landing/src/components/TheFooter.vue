<script setup>
import { ref } from 'vue'
import { Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-vue-next'

const email = ref('')
const name = ref('')
const consent = ref(false)
const submitted = ref(false)

const onSubmit = () => {
  if (!email.value || !name.value || !consent.value) return
  submitted.value = true
  setTimeout(() => {
    submitted.value = false
    email.value = ''
    name.value = ''
    consent.value = false
  }, 2500)
}

const partners = [
  { name: 'ESIC University', src: '/img/partner-esic.avif' },
  { name: 'Universo Startup', src: '/img/partner-universo.avif' },
  { name: 'Madrid Emprende', src: '/img/partner-madrid.avif' },
]
</script>

<template>
  <footer class="bg-gray-50">
    <div class="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <router-link to="/" class="font-display text-3xl font-extrabold text-oricen">
          Oricen
        </router-link>
        <ul class="mt-5 flex items-center gap-3" aria-label="Redes sociales">
          <li>
            <a
              href="https://www.instagram.com/_oricen_"
              target="_blank"
              rel="noopener"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-oricen text-oricen transition hover:bg-oricen hover:text-white"
              aria-label="Instagram"
            >
              <Instagram class="h-5 w-5" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/company/oricen/"
              target="_blank"
              rel="noopener"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-oricen text-oricen transition hover:bg-oricen hover:text-white"
              aria-label="LinkedIn"
            >
              <Linkedin class="h-5 w-5" />
            </a>
          </li>
          <li>
            <a
              href="https://www.tiktok.com/@_oricen_"
              target="_blank"
              rel="noopener"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-oricen text-oricen transition hover:bg-oricen hover:text-white"
              aria-label="TikTok"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.85A8.16 8.16 0 0 0 21.5 10.5V7.06a4.79 4.79 0 0 1-1.91-.37Z"/>
              </svg>
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="text-lg font-bold text-oricen">Contacto</h3>
        <ul class="mt-4 space-y-3 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <Mail class="mt-0.5 h-4 w-4 shrink-0 text-oricen" />
            <a href="mailto:info@oricen.com" class="hover:text-oricen">info@oricen.com</a>
          </li>
          <li class="flex items-start gap-2">
            <Phone class="mt-0.5 h-4 w-4 shrink-0 text-oricen" />
            <span>+34 656 333 373</span>
          </li>
          <li class="flex items-start gap-2">
            <MapPin class="mt-0.5 h-4 w-4 shrink-0 text-oricen" />
            <a
              href="https://maps.app.goo.gl/PD75dBfY14otDTfP7"
              target="_blank"
              rel="noopener"
              class="hover:text-oricen"
            >
              Camino Valdenigriales S/N, 28223,<br />Pozuelo de Alarcón (ESIC University)
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="text-lg font-bold text-oricen">Información</h3>
        <ul class="mt-4 space-y-3 text-sm text-gray-700">
          <li><a href="#" class="hover:text-oricen">Preguntas Frecuentes</a></li>
        </ul>
        <h3 class="mt-6 text-lg font-bold text-oricen">Legal</h3>
        <ul class="mt-4 space-y-3 text-sm text-gray-700">
          <li><a href="#" class="hover:text-oricen">Política de Privacidad</a></li>
        </ul>
      </div>

      <div>
        <p class="text-base font-semibold text-gray-800">¡Mantente informado con nosotros!</p>
        <form class="mt-4 space-y-3" @submit.prevent="onSubmit">
          <div>
            <label class="block text-xs font-semibold text-gray-600">Email *</label>
            <input
              v-model="email"
              type="email"
              required
              class="mt-1 w-full border-0 border-b border-gray-300 bg-transparent px-0 py-1.5 text-sm focus:border-oricen focus:outline-none focus:ring-0"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-600">Nombre *</label>
            <input
              v-model="name"
              type="text"
              required
              class="mt-1 w-full border-0 border-b border-gray-300 bg-transparent px-0 py-1.5 text-sm focus:border-oricen focus:outline-none focus:ring-0"
            />
          </div>
          <label class="flex items-start gap-2 text-xs text-gray-600">
            <input
              v-model="consent"
              type="checkbox"
              required
              class="mt-0.5 rounded border-gray-300 text-oricen focus:ring-oricen"
            />
            <span>Sí, quiero suscribirme a la newsletter. *</span>
          </label>
          <button
            type="submit"
            class="w-full rounded-md bg-oricen px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-oricen-dark"
          >
            {{ submitted ? '¡Gracias!' : 'Suscribirse' }}
          </button>
        </form>
      </div>
    </div>

    <div class="border-t border-gray-200">
      <div class="container-page py-10">
        <p class="text-center text-xs font-semibold uppercase tracking-widest text-gray-500">
          Colaboradores
        </p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-10">
          <img
            v-for="p in partners"
            :key="p.name"
            :src="p.src"
            :alt="p.name"
            class="h-10 max-w-[160px] object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
            onerror="this.style.display='none'"
          />
        </div>
      </div>
    </div>

    <div class="border-t border-gray-200 bg-white">
      <div class="container-page flex flex-col items-center justify-between gap-2 py-4 text-xs text-gray-500 sm:flex-row">
        <span>© {{ new Date().getFullYear() }} Oricen. Todos los derechos reservados.</span>
        <span>Réplica del sitio público en Vue 3 — original_landing</span>
      </div>
    </div>
  </footer>
</template>
