<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'

const route = useRoute()
const mobileOpen = ref(false)

const navItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Quiénes somos', to: '/quienes-somos' },
  { label: 'Programas', to: '/programas-oricen' },
  { label: 'Contacto', to: '/contact' },
  { label: 'Blog', to: '/blog' },
]

const currentPath = computed(() => route.path)

const close = () => { mobileOpen.value = false }

const logoUrl = '/img/logo.avif'
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
    <div class="container-page flex h-20 items-center justify-between gap-6">
      <router-link to="/" class="flex items-center gap-2" @click="close">
        <img
          :src="logoUrl"
          alt="Oricen"
          class="h-12 w-12 rounded-full object-cover"
          onerror="this.style.display='none'"
        />
        <span class="font-display text-xl font-extrabold tracking-wide text-oricen">ORICEN</span>
      </router-link>

      <nav class="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="relative rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition hover:text-oricen"
          :class="currentPath === item.to ? 'text-oricen' : ''"
        >
          {{ item.label }}
          <span
            v-if="currentPath === item.to"
            class="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-oricen"
          />
        </router-link>
      </nav>

      <div class="hidden items-center gap-3 lg:flex">
        <a
          href="/portal/login"
          class="text-sm font-semibold text-oricen hover:underline"
        >
          Iniciar sesión
        </a>
      </div>

      <button
        class="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 lg:hidden"
        :aria-expanded="mobileOpen"
        aria-label="Abrir menú"
        @click="mobileOpen = !mobileOpen"
      >
        <Menu v-if="!mobileOpen" class="h-6 w-6" />
        <X v-else class="h-6 w-6" />
      </button>
    </div>

    <transition name="slide">
      <div v-if="mobileOpen" class="border-t border-gray-100 bg-white lg:hidden">
        <div class="container-page flex flex-col py-4">
          <router-link
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="rounded-md px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-oricen"
            :class="currentPath === item.to ? 'text-oricen' : ''"
            @click="close"
          >
            {{ item.label }}
          </router-link>
          <a
            href="/portal/login"
            class="mt-2 rounded-md px-3 py-3 text-base font-semibold text-oricen hover:bg-gray-50"
          >
            Iniciar sesión
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.25s ease, opacity 0.25s ease;
  overflow: hidden;
}
.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}
.slide-enter-to,
.slide-leave-from {
  max-height: 400px;
  opacity: 1;
}
</style>
