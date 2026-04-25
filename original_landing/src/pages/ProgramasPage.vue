<script setup>
import { ref, computed } from 'vue'
import { Check, X as XIcon, Star, ArrowRight } from 'lucide-vue-next'

const filters = [
  { id: 'todos', label: 'Todos los planes' },
  { id: 'colegios', label: 'Colegios' },
  { id: 'familias', label: 'Familias' },
]
const activeFilter = ref('todos')

const plans = [
  {
    id: 'origen',
    name: 'Perfil Origen',
    price: '€120',
    badge: 'Recomendado para colegios',
    audience: 'colegios',
    img: '/img/programa-colegios.avif',
    headline: 'Para colegios',
    description: 'Orientación vocacional rigurosa a escala. Evaluamos las capacidades, intereses y personalidad de cada alumno y generamos un informe personalizado que complementa la labor del orientador del centro.',
    highlight: 'Adaptable a las necesidades de cada colegio.',
  },
  {
    id: 'brujula',
    name: 'Perfil Brújula',
    price: '€299',
    badge: 'Recomendado para familias',
    audience: 'familias',
    img: '/img/programa-familias.avif',
    headline: 'Para familias',
    description: 'El equilibrio perfecto entre profundidad y eficiencia. Combina evaluaciones psicométricas validadas con una entrevista personal con el alumno, dando como resultado un informe de más de 33 páginas con recomendaciones académicas y profesionales concretas.',
    highlight: '',
  },
  {
    id: 'atlas',
    name: 'Perfil Atlas',
    price: '€499',
    badge: 'Máxima profundidad',
    audience: 'familias',
    img: '/img/programa-atlas.avif',
    headline: 'El más completo',
    description: 'Todo lo incluido en Brújula, más una entrevista con los padres y una reunión explicativa de resultados con el equipo de Oricen. Y lo que hace único al Atlas: conversaciones con un estudiante que cursa actualmente la carrera recomendada y con profesionales en activo del sector: dos perspectivas reales que ningún test ni informe puede sustituir.',
    highlight: '',
  },
]

const visiblePlans = computed(() => {
  if (activeFilter.value === 'todos') return plans
  return plans.filter((p) => p.audience === activeFilter.value)
})

const features = [
  { section: 'Evaluación', items: [
    { label: 'Test de personalidad', values: [true, true, true] },
    { label: 'Evaluación de capacidades cognitivas', values: [true, true, true] },
    { label: 'Prueba de intereses profesionales', values: [true, true, true] },
    { label: 'Entrevista con el alumno', values: [false, true, true] },
    { label: 'Entrevista con los padres', values: [false, false, true] },
  ]},
  { section: 'Informe y seguimiento', items: [
    { label: 'Recomendaciones personalizadas de carrera', values: [true, true, true] },
    { label: 'Informe de más de 30 páginas', values: [true, true, true] },
    { label: 'Reunión de explicación de resultados', values: [false, false, true] },
    { label: 'Revisión del perfil a los 6 meses', values: [false, false, true] },
  ]},
  { section: 'Conversaciones reales — Exclusivo Atlas', items: [
    { label: 'Entrevista con estudiante de vivo carrera', values: [false, false, 'star'] },
    { label: 'Entrevista con profesional del sector en activo', values: [false, false, 'star'] },
  ]},
  { section: 'Para colegios', items: [
    { label: 'Personalización por centro educativo', values: [true, false, false] },
  ]},
]

const compare = [
  {
    label: 'Acompañamiento',
    apps: { v: 'Solo algoritmos', icon: 'x' },
    gabinetes: { v: 'Psicólogo', icon: 'check' },
    oricen: { v: 'Continuo', icon: 'check' },
  },
  {
    label: 'Fiabilidad',
    apps: { v: 'Superficial', icon: 'warn' },
    gabinetes: { v: 'Subjetivo', icon: 'warn' },
    oricen: { v: 'Científico', icon: 'check' },
  },
  {
    label: 'Precio / Valor',
    apps: { v: 'Barato', icon: 'check' },
    gabinetes: { v: 'Elevado', icon: 'x' },
    oricen: { v: 'Equilibrado', icon: 'check' },
  },
  {
    label: 'Adaptabilidad',
    apps: { v: 'Estándar', icon: 'x' },
    gabinetes: { v: 'Limitada', icon: 'x' },
    oricen: { v: 'A medida', icon: 'check' },
  },
]
</script>

<template>
  <div class="fade-in">
    <section class="section pb-8 pt-12">
      <div class="container-page text-center">
        <h1 class="heading-section">El programa adecuado para cada perfil</h1>
        <p class="mx-auto mt-4 max-w-3xl text-base text-gray-700">
          Desde <span class="accent-blue">colegios</span> hasta
          <span class="accent-blue">familias</span> que buscan un acompañamiento completo.
        </p>

        <div class="mt-8 inline-flex rounded-full border border-gray-200 bg-white p-1 shadow-sm">
          <button
            v-for="f in filters"
            :key="f.id"
            class="rounded-full px-5 py-2 text-sm font-medium transition"
            :class="activeFilter === f.id ? 'bg-oricen text-white' : 'text-gray-600 hover:text-oricen'"
            @click="activeFilter = f.id"
          >
            {{ f.label }}
          </button>
        </div>
      </div>

      <!-- Tabla comparativa -->
      <div class="container-page mt-10 overflow-x-auto">
        <table class="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              <th class="w-1/4 bg-white"></th>
              <th
                v-for="p in plans"
                :key="p.id"
                class="px-4 py-5 align-bottom"
              >
                <span class="block rounded-full border border-oricen/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-oricen">
                  {{ p.badge }}
                </span>
                <p class="mt-3 text-lg font-extrabold text-gray-900">{{ p.name }}</p>
                <p class="text-2xl font-extrabold text-oricen">{{ p.price }}</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="block in features" :key="block.section">
              <tr>
                <td colspan="4" class="bg-gray-50 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-gray-500">
                  {{ block.section }}
                </td>
              </tr>
              <tr v-for="(f, i) in block.items" :key="f.label" :class="i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'">
                <td class="border-b border-gray-100 px-4 py-3 text-left text-gray-700">{{ f.label }}</td>
                <td
                  v-for="(v, idx) in f.values"
                  :key="idx"
                  class="border-b border-gray-100 px-4 py-3 text-center"
                >
                  <Check v-if="v === true" class="mx-auto h-5 w-5 text-oricen" />
                  <Star v-else-if="v === 'star'" class="mx-auto h-5 w-5 fill-amber-400 text-amber-400" />
                  <span v-else class="text-gray-300">—</span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <div class="container-page mt-8 text-center">
        <router-link to="/contact" class="btn-secondary">Reserva tu sesión</router-link>
      </div>
    </section>

    <!-- Cards perfiles -->
    <section class="section bg-white pt-0">
      <div class="container-page space-y-6">
        <article
          v-for="(p, idx) in visiblePlans"
          :key="p.id"
          class="grid gap-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:grid-cols-2"
        >
          <div :class="['min-h-[260px] bg-gray-200', idx % 2 === 1 ? 'md:order-2' : '']">
            <img :src="p.img" :alt="p.name" class="h-full w-full object-cover" onerror="this.style.opacity=0.3" />
          </div>
          <div :class="['flex flex-col justify-center p-8', idx % 2 === 1 ? 'md:order-1' : '']">
            <h3 class="text-2xl font-extrabold text-gray-900">{{ p.name }}</h3>
            <p class="text-2xl font-extrabold text-oricen">{{ p.headline }}</p>
            <p class="mt-4 text-sm leading-relaxed text-gray-700">{{ p.description }}</p>
            <p v-if="p.highlight" class="mt-3 text-sm font-semibold text-oricen">{{ p.highlight }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- Comparación final -->
    <section class="section bg-gray-50">
      <div class="container-page">
        <h2 class="heading-section">
          ¿Por qué Oricen es la evolución de la
          <span class="text-oricen">Orientación Vocacional</span>?
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-center text-base text-gray-700">
          Combinamos la calidez humana con análisis basados en evidencia y datos reales.
        </p>

        <div class="mx-auto mt-10 max-w-4xl overflow-x-auto">
          <table class="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
            <thead>
              <tr>
                <th class="bg-white"></th>
                <th class="px-6 py-4 text-center text-sm font-bold text-gray-700">Apps / Tests Online</th>
                <th class="px-6 py-4 text-center text-sm font-bold text-gray-700">Gabinetes Tradicionales</th>
                <th class="rounded-t-xl bg-oricen px-6 py-4 text-center text-base font-extrabold text-white">Oricen</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(r, i) in compare" :key="r.label" :class="i % 2 === 0 ? 'bg-white' : 'bg-white/60'">
                <td class="border-b border-gray-200 px-6 py-5 text-left font-bold text-gray-900">{{ r.label }}</td>
                <td class="border-b border-gray-200 px-6 py-5 text-center">
                  <XIcon v-if="r.apps.icon === 'x'" class="mx-auto h-5 w-5 text-red-500" />
                  <span v-else-if="r.apps.icon === 'warn'" class="text-amber-500">⚠️</span>
                  <Check v-else class="mx-auto h-5 w-5 text-emerald-500" />
                  <p class="mt-1 text-xs text-gray-600">{{ r.apps.v }}</p>
                </td>
                <td class="border-b border-gray-200 px-6 py-5 text-center">
                  <XIcon v-if="r.gabinetes.icon === 'x'" class="mx-auto h-5 w-5 text-red-500" />
                  <span v-else-if="r.gabinetes.icon === 'warn'" class="text-amber-500">⚠️</span>
                  <Check v-else class="mx-auto h-5 w-5 text-emerald-500" />
                  <p class="mt-1 text-xs text-gray-600">{{ r.gabinetes.v }}</p>
                </td>
                <td class="border-b border-gray-200 bg-oricen/5 px-6 py-5 text-center">
                  <Check class="mx-auto h-5 w-5 text-oricen" />
                  <p class="mt-1 text-xs font-semibold text-oricen">{{ r.oricen.v }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-10 text-center">
          <router-link to="/contact" class="btn-primary">
            Elige tu Plan y Empieza Hoy
            <ArrowRight class="h-4 w-4" />
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
