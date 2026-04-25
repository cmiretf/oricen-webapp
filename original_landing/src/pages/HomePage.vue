<script setup>
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight, ArrowRight, Brain, Target, FlaskConical } from 'lucide-vue-next'

const HERO_IMG = '/img/hero.avif'
const STUDENT_IMG = '/img/alumna.avif'
const ORIENTADOR_IMG = '/img/orientador.avif'
const ANALISIS_IMG = '/img/analisis.avif'

const tabs = [
  {
    id: 'criterio',
    label: 'Criterio claro',
    icon: Target,
    bullets: [
      ['Aquello que te', 'interesa', 'y te', 'motiva'],
      ['Aquello que', 'se te da bien', 'o', 'se te puede dar bien'],
      ['Empleabilidad', 'y', 'relevancia', 'en el mundo que viene'],
    ],
    intro: 'A la hora de hacer nuestras recomendaciones tenemos en cuenta',
    introHighlight: 'tres aspectos',
    introTail: 'principales:',
  },
  {
    id: 'personalizacion',
    label: 'Personalización',
    icon: Brain,
    bullets: [
      ['Recomendaciones adaptadas a la', 'persona', 'no al grupo'],
      ['Análisis del', 'perfil único', 'del alumno y su entorno'],
      ['Conexión directa con', 'profesionales', 'del sector'],
    ],
    intro: 'Cada estudiante es distinto. Por eso ajustamos cada informe al',
    introHighlight: 'perfil real',
    introTail: 'del alumno:',
  },
  {
    id: 'rigor',
    label: 'Rigor psicométrico',
    icon: FlaskConical,
    bullets: [
      ['Tests', 'validados científicamente', 'por psicólogos reconocidos'],
      ['Algoritmo de recomendación', 'propio', 'desarrollado con datos reales'],
      ['Informes con', 'base sólida', 'y trazabilidad'],
    ],
    intro: 'Combinamos pruebas validadas con un',
    introHighlight: 'análisis personalizado',
    introTail: 'que aporta resultados tangibles:',
  },
]
const activeTab = ref(tabs[0].id)
const currentTab = computed(() => tabs.find((t) => t.id === activeTab.value))

const testimonials = [
  {
    name: 'Ana Alameda',
    role: 'psicóloga',
    text: 'Como psicóloga, valoro profundamente el rigor científico de Oricen. Su enfoque integral, que combina tests validados con un análisis personalizado, me ha permitido guiar a mis pacientes con una base sólida y objetiva. Es el partner perfecto para cualquier profesional de la orientación que busque resultados tangibles.',
  },
  {
    name: 'Ignacio Reyero',
    role: 'director de centro educativo',
    text: 'El programa de Oricen se integró con naturalidad en nuestra dinámica de orientación. Los informes son claros y útiles, y a las familias les aportan una tranquilidad enorme cuando se enfrentan a la decisión de carrera.',
  },
  {
    name: 'Paloma Domínguez',
    role: 'madre de alumna',
    text: 'Salimos con una hoja de ruta clara. Mi hija no tenía claro qué carrera elegir, y el informe de Oricen le devolvió la confianza para tomar una decisión con criterio. El acompañamiento fue muy cercano.',
  },
  {
    name: 'Jacobo Santapau',
    role: 'alumno',
    text: 'No me esperaba un análisis tan profundo. Las conversaciones con estudiantes y profesionales reales fueron lo que más me ayudó. Hoy estudio justo lo que quería y no me arrepiento de la decisión.',
  },
]
const tIndex = ref(0)
const prev = () => { tIndex.value = (tIndex.value - 1 + testimonials.length) % testimonials.length }
const next = () => { tIndex.value = (tIndex.value + 1) % testimonials.length }
</script>

<template>
  <div class="fade-in">
    <!-- HERO -->
    <section class="bg-white">
      <div class="container-page grid items-center gap-10 py-12 md:grid-cols-2 md:py-16">
        <div>
          <h1 class="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
            Enfoca tu futuro con nuestros programas de
            <span class="text-oricen">Orientación Vocacional</span>
          </h1>
          <p class="mt-6 text-lg leading-relaxed text-gray-700">
            Guiamos a <span class="accent-blue">estudiantes</span> para
            tomar decisiones sobre su futuro
            universitario y laboral con <span class="accent-blue">claridad</span>.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <router-link to="/programas-oricen" class="btn-primary">Ver programas</router-link>
            <router-link to="/contact" class="btn-secondary">Agendar llamada</router-link>
          </div>
          <p class="mt-8 text-sm text-gray-700">
            Nuestro equipo ha acompañado a <span class="accent-blue font-bold">más de 500 estudiantes</span><br />
            a elegir su camino con criterio.
          </p>
        </div>
        <div class="relative">
          <div class="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-200 shadow-lg">
            <img
              :src="HERO_IMG"
              alt="Orientación escolar"
              class="h-full w-full object-cover"
              onerror="this.style.opacity=0.3"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- STAT BAND -->
    <section class="stat-band">
      <div class="container-page flex items-center justify-center gap-3 text-base font-semibold sm:text-lg">
        <span class="hidden h-px w-12 bg-white/60 sm:inline-block" />
        <p class="italic">
          "El 33% de los universitarios abandona su carrera"
          <span class="ml-2 not-italic text-white/80">— Fuente: CRUE, 2024</span>
        </p>
        <span class="hidden h-px w-12 bg-white/60 sm:inline-block" />
      </div>
    </section>

    <!-- DOS PERFILES -->
    <section class="section bg-white">
      <div class="container-page">
        <h2 class="heading-section">¿Cómo saber qué carrera es la tuya?</h2>
        <p class="mt-3 text-center text-base text-gray-700">
          Dos perfiles, <span class="accent-blue">un mismo rigor</span>
        </p>

        <div class="mt-12 grid gap-10 md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div class="text-center md:pr-10">
            <div class="mx-auto h-44 w-44 overflow-hidden rounded-full bg-gray-100 shadow-md">
              <img :src="STUDENT_IMG" alt="Alumna" class="h-full w-full object-cover" onerror="this.style.opacity=0.3" />
            </div>
            <h3 class="mt-6 text-xl font-bold text-gray-900">Estudiantes y familias</h3>
            <p class="mt-4 text-sm leading-relaxed text-gray-700">
              Evaluamos tus capacidades, intereses y personalidad
              <span class="accent-blue">con tests psicométricos validados</span>.
              Informe de más de 30 páginas con recomendaciones concretas y conexión directa con
              <span class="accent-blue">estudiantes y profesionales del sector</span>.
            </p>
          </div>
          <div class="text-center md:pl-10">
            <div class="mx-auto h-44 w-44 overflow-hidden rounded-full bg-gray-100 shadow-md">
              <img :src="ORIENTADOR_IMG" alt="Orientador" class="h-full w-full object-cover" onerror="this.style.opacity=0.3" />
            </div>
            <h3 class="mt-6 text-xl font-bold text-gray-900">Centros educativos</h3>
            <p class="mt-4 text-sm leading-relaxed text-gray-700">
              <span class="accent-blue">Programa completo de orientación</span>
              para tus alumnos, adaptable a las prioridades de tu centro y compatible con el orientador existente.
              <span class="accent-blue">Flexible, riguroso</span>
              y diseñado para integrarse con naturalidad en la dinámica del colegio.
            </p>
          </div>
        </div>

        <div class="mt-12 text-center">
          <router-link to="/programas-oricen" class="btn-primary">Ver programas</router-link>
        </div>
      </div>
    </section>

    <!-- POR QUÉ ELEGIR -->
    <section class="section bg-gray-50">
      <div class="container-page">
        <h2 class="heading-section">¿Por qué elegir Oricen?</h2>

        <div class="mx-auto mt-10 max-w-4xl">
          <div role="tablist" class="flex flex-wrap items-center justify-center gap-2 border-b border-gray-200 sm:gap-6">
            <button
              v-for="t in tabs"
              :key="t.id"
              role="tab"
              :aria-selected="activeTab === t.id"
              class="relative px-3 py-3 text-sm font-semibold text-gray-600 transition hover:text-oricen sm:text-base"
              :class="activeTab === t.id ? 'text-oricen' : ''"
              @click="activeTab = t.id"
            >
              {{ t.label }}
              <span
                v-if="activeTab === t.id"
                class="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-oricen"
              />
            </button>
          </div>

          <div class="mt-10 grid items-center gap-8 md:grid-cols-2">
            <div class="aspect-[4/3] overflow-hidden rounded-xl bg-gray-200 shadow-md">
              <img :src="ANALISIS_IMG" alt="Análisis orientación" class="h-full w-full object-cover" onerror="this.style.opacity=0.3" />
            </div>
            <div>
              <p class="text-base text-gray-800">
                {{ currentTab.intro }}
                <span class="accent-blue">{{ currentTab.introHighlight }}</span>
                {{ currentTab.introTail }}
              </p>
              <ul class="mt-4 space-y-3 text-sm text-gray-700">
                <li
                  v-for="(b, i) in currentTab.bullets"
                  :key="i"
                  class="flex items-start gap-2"
                >
                  <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-oricen" />
                  <span>
                    <template v-for="(piece, j) in b" :key="j">
                      <span v-if="j % 2 === 1" class="accent-blue">{{ piece }}</span>
                      <span v-else>{{ piece }}</span>
                      <span v-if="j < b.length - 1"> </span>
                    </template>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIOS -->
    <section class="section bg-white pt-10">
      <div class="container-page">
        <div class="mx-auto max-w-md text-center">
          <p class="inline-block rounded-md border-2 border-oricen px-4 py-2 text-sm font-semibold text-oricen">
            Lo que dicen de Oricen
          </p>
        </div>
      </div>

      <div class="relative mt-10 bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200">
        <div class="container-page py-16">
          <div class="relative mx-auto max-w-3xl">
            <button
              class="absolute left-0 top-1/2 -translate-x-12 -translate-y-1/2 text-white/80 hover:text-white"
              aria-label="Anterior"
              @click="prev"
            >
              <ChevronLeft class="h-12 w-12" />
            </button>
            <button
              class="absolute right-0 top-1/2 translate-x-12 -translate-y-1/2 text-white/80 hover:text-white"
              aria-label="Siguiente"
              @click="next"
            >
              <ChevronRight class="h-12 w-12" />
            </button>

            <div class="rounded-2xl bg-oricen p-10 text-center text-white shadow-xl">
              <p class="text-base italic leading-relaxed sm:text-lg">
                "{{ testimonials[tIndex].text }}"
              </p>
              <p class="mt-6 text-right text-sm font-medium">
                — {{ testimonials[tIndex].name }}, {{ testimonials[tIndex].role }}
              </p>
              <div class="mt-6 flex items-center justify-center gap-2">
                <button
                  v-for="(_, i) in testimonials"
                  :key="i"
                  class="h-2.5 w-2.5 rounded-full transition"
                  :class="i === tIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/70'"
                  :aria-label="`Ir a testimonio ${i + 1}`"
                  @click="tIndex = i"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="section bg-white">
      <div class="container-page text-center">
        <h2 class="heading-section">¿Listo para enfocar tu futuro?</h2>
        <p class="mx-auto mt-4 max-w-2xl text-base text-gray-700">
          Reserva tu sesión de descubrimiento o explora nuestros programas para encontrar el que mejor encaja contigo.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <router-link to="/contact" class="btn-primary">
            Reserva tu sesión
            <ArrowRight class="h-4 w-4" />
          </router-link>
          <router-link to="/programas-oricen" class="btn-secondary">Ver programas</router-link>
        </div>
      </div>
    </section>
  </div>
</template>
