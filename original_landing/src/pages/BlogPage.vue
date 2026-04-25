<script setup>
import { ref, computed } from 'vue'
import { Heart, MessageCircle, MoreHorizontal, Eye } from 'lucide-vue-next'

const categories = [
  'All Posts',
  'Rutas Universitarias',
  'Orientación Vocacional',
  'Actualidad y Eventos',
  'Rankings Universitarios',
]
const activeCat = ref('All Posts')

const posts = [
  {
    id: 1,
    cover: 'qs',
    category: 'Rankings Universitarios',
    author: 'Enrique Núñez',
    authorAvatar: '/img/founder-enrique.avif',
    date: '6 nov',
    minutes: 5,
    title: 'QS World University Rankings 2026: Las Mejores Universidades de España (...)',
    excerpt: 'Analizamos el QS 2026: qué universidades españolas lideran por materias, las grandes sorpresas del ranking y qué significa para tu decisión universitaria.',
    views: 47,
    comments: 0,
    likes: 0,
  },
  {
    id: 2,
    cover: 'aula',
    coverImg: '/img/programa-colegios.avif',
    category: 'Actualidad y Eventos',
    author: 'Enrique Núñez',
    authorAvatar: '/img/founder-enrique.avif',
    date: '5 nov',
    minutes: 4,
    title: 'Aula 2026: El boom de la FP, el factor IA y por qué una feria no resuelve el futuro d(...)',
    excerpt: 'Miles de jóvenes, stands abarrotados y mucha incertidumbre familiar. Analizamos nuestro paso por la feria educativa más grande del año.',
    views: 16,
    comments: 0,
    likes: 7,
  },
  {
    id: 3,
    cover: 'orientacion',
    category: 'Orientación Vocacional',
    author: 'Juan González',
    authorAvatar: '/img/founder-juan.avif',
    date: '28 oct',
    minutes: 6,
    title: 'Cómo saber si una carrera realmente encaja contigo (más allá de los tests rápidos)',
    excerpt: 'Tres preguntas clave que te ayudarán a separar lo que te apetece de lo que realmente puede convertirse en tu carrera profesional.',
    views: 122,
    comments: 3,
    likes: 14,
  },
  {
    id: 4,
    cover: 'rutas',
    category: 'Rutas Universitarias',
    author: 'Pablo Fernández',
    authorAvatar: '/img/founder-pablo.avif',
    date: '14 oct',
    minutes: 4,
    title: 'Doble grado vs grado simple: ¿de verdad merece la pena?',
    excerpt: 'Analizamos empleabilidad, carga académica y retorno real de los dobles grados más demandados en España.',
    views: 89,
    comments: 1,
    likes: 10,
  },
]

const filtered = computed(() => {
  if (activeCat.value === 'All Posts') return posts
  return posts.filter((p) => p.category === activeCat.value)
})
</script>

<template>
  <div class="fade-in">
    <section class="container-page pt-10">
      <nav class="flex flex-wrap items-center gap-x-7 gap-y-2 border-b border-gray-200 pb-3 text-sm">
        <button
          v-for="c in categories"
          :key="c"
          class="relative pb-2 transition"
          :class="activeCat === c ? 'font-semibold text-oricen' : 'text-gray-600 hover:text-oricen'"
          @click="activeCat = c"
        >
          {{ c }}
          <span v-if="activeCat === c" class="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-oricen" />
        </button>
      </nav>

      <h1 class="mt-8 text-3xl font-extrabold text-gray-900">All Posts</h1>

      <div class="mt-8 grid gap-8">
        <article
          v-for="p in filtered"
          :key="p.id"
          class="grid gap-6 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md md:grid-cols-[280px_1fr]"
        >
          <div class="aspect-[3/2] overflow-hidden rounded-lg">
            <div
              v-if="p.cover === 'qs'"
              class="flex h-full w-full flex-col items-center justify-center bg-oricen text-white"
            >
              <p class="text-4xl font-extrabold text-amber-300">28,9%</p>
              <p class="px-4 text-center text-base font-bold">QS University Rankings 2026 Análisis Oricen</p>
            </div>
            <img
              v-else-if="p.coverImg"
              :src="p.coverImg"
              :alt="p.title"
              class="h-full w-full object-cover"
              onerror="this.style.opacity=0.3"
            />
            <div v-else class="flex h-full w-full items-center justify-center bg-gradient-to-br from-oricen to-oricen-dark text-3xl font-extrabold text-white">
              ORICEN
            </div>
          </div>
          <div class="flex flex-col">
            <header class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <img :src="p.authorAvatar" :alt="p.author" class="h-7 w-7 rounded-full bg-gray-200 object-cover" onerror="this.style.opacity=0.3" />
                <div class="text-xs">
                  <p class="font-semibold text-gray-700">{{ p.author }}</p>
                  <p class="text-gray-500">{{ p.date }} · {{ p.minutes }} min de lectura</p>
                </div>
              </div>
              <button class="text-gray-400 hover:text-gray-600" aria-label="Más opciones">
                <MoreHorizontal class="h-5 w-5" />
              </button>
            </header>
            <h2 class="mt-3 text-lg font-extrabold leading-snug text-gray-900 hover:text-oricen">
              {{ p.title }}
            </h2>
            <p class="mt-2 text-sm leading-relaxed text-gray-600">{{ p.excerpt }}</p>
            <footer class="mt-auto flex items-center justify-between pt-4 text-xs text-gray-500">
              <p>+{{ p.views }} visualizaciones · {{ p.comments }} comentarios</p>
              <div class="flex items-center gap-3">
                <button class="flex items-center gap-1 hover:text-oricen" aria-label="Comentarios">
                  <MessageCircle class="h-4 w-4" />
                </button>
                <button class="flex items-center gap-1 hover:text-oricen" aria-label="Me gusta">
                  <Heart class="h-4 w-4" />
                  <span v-if="p.likes">{{ p.likes }}</span>
                </button>
                <span class="flex items-center gap-1">
                  <Eye class="h-4 w-4" />
                  <span>{{ p.views }}</span>
                </span>
              </div>
            </footer>
          </div>
        </article>
      </div>

      <div class="mt-12 flex justify-center pb-12">
        <button class="rounded-md border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:border-oricen hover:text-oricen">
          Cargar más entradas
        </button>
      </div>
    </section>
  </div>
</template>
