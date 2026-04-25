<script setup>
import { Linkedin, Brain, Map, Puzzle, Check, ArrowRight } from 'lucide-vue-next'

const founders = [
  {
    name: 'Juan González',
    role: 'Cofundador y CEO',
    img: '/img/founder-juan.avif',
    bio: [
      ['', 'Psicólogo', '(UFV) con +5 años en gabinetes de orientación.'],
      ['', 'Visión Global', ': Formado en 6 países y graduado con IB (Bachillerato Internacional).'],
      ['', 'Responsable de orientación', 'y la recomendación final del alumno.'],
    ],
    linkedin: '#',
  },
  {
    name: 'Enrique Núñez',
    role: 'Cofundador y CTO',
    img: '/img/founder-enrique.avif',
    bio: [
      ['Máster por ', 'UC Berkeley', ', Ingeniero Industrial (UPM) y becario Fulbright.'],
      ['', 'Arquitecto Tecnológico', ': Creador del algoritmo de recomendación y los procesos de datos de Oricen.'],
      ['Aporta el estándar de ', 'excelencia', 'de las instituciones líderes del mundo.'],
    ],
    linkedin: '#',
  },
  {
    name: 'Pablo Fernández',
    role: 'Cofundador y CCO',
    img: '/img/founder-pablo.avif',
    bio: [
      ['', 'Estrategia en ADE y Marketing', '(ESIC), experto en mercado laboral.'],
      ['', 'Visión de Mercado', ': Analiza la demanda real para asegurar que el modelo de Oricen evolucione con el mercado laboral.'],
      ['Impulsa el ', 'crecimiento estratégico', 'de la empresa.'],
    ],
    linkedin: '#',
  },
]

const universities = [
  { name: 'IB', src: '/img/uni-ib.avif' },
  { name: 'UFV', src: '/img/uni-ufv.avif' },
  { name: 'Fulbright', src: '/img/uni-fulbright.avif' },
  { name: 'Berkeley', src: '/img/uni-berkeley.avif' },
  { name: 'UPM', src: '/img/uni-upm.avif' },
  { name: 'ESIC', src: '/img/uni-esic.avif' },
  { name: 'Colegio Estudio', src: '/img/uni-estudio.avif' },
]

const experts = [
  {
    name: 'Mónica Pérez-Hurtado',
    role: 'Experta en Orientación',
    detail: 'PhD, Cofundadora en Experience Ahead',
    img: '/img/expert-monica.avif',
  },
  {
    name: 'Ana Isabel Moreno Ramos',
    role: 'Experta en Marketing',
    detail: 'CEO en Inverta Mentor',
    img: '/img/expert-ana.avif',
  },
  {
    name: 'Dionisio Fernández Muñoz',
    role: 'Experto en Dirección de Empresas',
    detail: 'CEO en On Rent',
    img: '/img/expert-dionisio.avif',
  },
  {
    name: 'Carlos Miret Fiuza',
    role: 'Experto programador',
    detail: 'Ingeniero de Software en BBVA',
    img: '/img/expert-carlos.avif',
  },
]

const fourCs = [
  {
    n: 1,
    title: 'Conocer',
    icon: Brain,
    text: 'No nos quedamos en las notas escolares. Evaluamos a fondo la personalidad, las aptitudes y los verdaderos intereses del alumno.',
  },
  {
    n: 2,
    title: 'Clarificar',
    icon: Map,
    text: 'Transformamos la ansiedad y la complejidad del mercado educativo en un mapa de decisiones claras, objetivas y fáciles de entender.',
  },
  {
    n: 3,
    title: 'Conectar',
    icon: Puzzle,
    text: 'Trazamos el puente entre el talento único del estudiante, su propósito vital y las carreras que realmente demanda el mundo de hoy.',
  },
  {
    n: 4,
    title: 'Compromiso',
    icon: Check,
    text: 'Nos involucramos en el éxito de cada alumno con absoluta responsabilidad, acompañándolos con rigor hasta que encuentran su sitio.',
  },
]
</script>

<template>
  <div class="fade-in">
    <!-- Banner azul -->
    <section class="bg-oricen py-4 text-center text-white">
      <div class="container-page">
        <p class="text-base font-semibold sm:text-lg">El equipo detrás de Oricen</p>
      </div>
    </section>

    <!-- Heading principal -->
    <section class="section pb-10 pt-12">
      <div class="container-page text-center">
        <h1 class="heading-section">¿Por qué confiar tu futuro en Oricen?</h1>
        <p class="mx-auto mt-4 max-w-3xl text-base text-gray-700">
          Somos el equipo que nos habría gustado tener: expertos en
          <span class="accent-blue">psicología</span>,
          <span class="accent-blue">ingeniería</span> y
          <span class="accent-blue">visión de mercado</span>
          para diseñar tu futuro con seguridad.
        </p>
      </div>
    </section>

    <!-- Equipo fundador -->
    <section class="container-page pb-12">
      <h2 class="text-2xl font-extrabold text-gray-900">El equipo fundador</h2>
      <div class="mt-8 grid gap-10 md:grid-cols-3">
        <article
          v-for="m in founders"
          :key="m.name"
          class="text-center"
        >
          <div class="relative mx-auto h-44 w-44 overflow-hidden rounded-full bg-gray-100 shadow-md">
            <img :src="m.img" :alt="m.name" class="h-full w-full object-cover" onerror="this.style.opacity=0.3" />
            <a
              :href="m.linkedin"
              class="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-oricen text-white shadow-md hover:bg-oricen-dark"
              aria-label="LinkedIn"
            >
              <Linkedin class="h-4 w-4" />
            </a>
          </div>
          <h3 class="mt-5 text-lg font-bold text-gray-900">{{ m.name }}</h3>
          <p class="text-sm text-gray-600">{{ m.role }}</p>
          <ul class="mt-4 space-y-2 text-left text-sm leading-relaxed text-gray-700">
            <li v-for="(l, i) in m.bio" :key="i" class="flex gap-1">
              <span class="text-oricen">—</span>
              <span>
                <span>{{ l[0] }}</span>
                <span class="accent-blue">{{ l[1] }}</span>
                <span>{{ l[2] }}</span>
              </span>
            </li>
          </ul>
        </article>
      </div>

      <!-- Logos -->
      <div class="mt-12 flex flex-wrap items-center justify-center gap-6 rounded-full border border-gray-200 bg-white px-8 py-5 shadow-sm">
        <img
          v-for="u in universities"
          :key="u.name"
          :src="u.src"
          :alt="u.name"
          class="h-10 max-w-[120px] object-contain opacity-80"
          onerror="this.style.display='none'"
        />
      </div>

      <div class="mt-10 text-center">
        <router-link to="/contact" class="btn-primary">
          Reserva tu sesión
          <ArrowRight class="h-4 w-4" />
        </router-link>
      </div>
    </section>

    <!-- Expertos -->
    <section class="container-page pb-16">
      <h2 class="text-2xl font-extrabold text-gray-900">Nuestros expertos</h2>
      <div class="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        <article
          v-for="e in experts"
          :key="e.name"
          class="text-center"
        >
          <div class="mx-auto h-28 w-28 overflow-hidden rounded-full bg-gray-100 shadow-sm">
            <img :src="e.img" :alt="e.name" class="h-full w-full object-cover" onerror="this.style.opacity=0.3" />
          </div>
          <h3 class="mt-4 text-base font-bold text-gray-900">{{ e.name }}</h3>
          <p class="text-xs text-gray-700">{{ e.role }}</p>
          <p class="mt-1 text-xs text-gray-500">{{ e.detail }}</p>
        </article>
      </div>
    </section>

    <!-- Banner Filosofía -->
    <section class="bg-oricen py-4 text-center text-white">
      <div class="container-page">
        <p class="text-base font-semibold sm:text-lg">Nuestra filosofía</p>
      </div>
    </section>

    <!-- Filosofía + 4Cs -->
    <section class="section">
      <div class="container-page max-w-4xl space-y-5 text-base leading-relaxed text-gray-700">
        <p>
          Vivimos en un momento de <span class="accent-blue">cambio acelerado</span>. El mercado laboral
          se transforma a un ritmo que hace cada vez más difícil planificar el futuro con claridad,
          especialmente para un <span class="accent-blue">adolescente que todavía esté construyendo su identidad</span>.
        </p>
        <p>
          En Oricen creemos que la orientación vocacional no es elegir una carrera en un formulario. Es
          <span class="accent-blue">conocerse a uno mismo con rigor</span>,
          <span class="accent-blue">entender el mundo que viene</span> y
          <span class="accent-blue">tomar decisiones con criterio</span>.
          Por eso combinamos psicología, tecnología y visión de mercado en un mismo proceso.
        </p>
        <p>
          Trabajamos con un principio sencillo:
          <span class="accent-blue">no orientamos para el mundo de ayer, sino para el que viene</span>.
        </p>
      </div>

      <div class="container-page mt-14">
        <h2 class="heading-section">El Método Oricen</h2>
        <p class="mx-auto mt-4 max-w-3xl text-center text-base text-gray-700">
          Un simple test de 10 minutos no basta. Guiamos a los estudiantes con un
          <span class="accent-blue">enfoque profundamente humano, respaldado por datos científicos</span>.
          Nuestra cultura de trabajo se basa en las 4C's:
        </p>

        <div class="mt-10 grid gap-6 sm:grid-cols-2">
          <article
            v-for="c in fourCs"
            :key="c.title"
            class="rounded-xl border-2 border-oricen/20 bg-white p-8 text-center shadow-sm transition hover:border-oricen hover:shadow-md"
          >
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-oricen/10 text-oricen">
              <component :is="c.icon" class="h-8 w-8" />
            </div>
            <h3 class="mt-5 text-lg font-bold text-oricen">{{ c.n }}. {{ c.title }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-gray-700">{{ c.text }}</p>
          </article>
        </div>

        <div class="mt-12 text-center">
          <p class="font-semibold text-gray-800">¿Tienes dudas sobre qué programa encaja contigo?</p>
          <router-link to="/contact" class="btn-primary mt-4">
            Habla con un orientador
            <ArrowRight class="h-4 w-4" />
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
