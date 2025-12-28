<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-24">
        <router-link to="/" class="flex items-center gap-2">
          <img :src="logo" alt="Oricen Logo" class="h-16 w-auto" />
        </router-link>

        <nav class="hidden md:flex items-center gap-1">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            :class="[
              'px-4 py-2 text-sm font-medium transition-colors duration-200',
              $route.path === link.path
                ? 'text-[#2B4C7E] border-b-2 border-[#2B4C7E]'
                : 'text-gray-600 hover:text-[#2B4C7E]'
            ]"
          >
            {{ link.name }}
          </router-link>
        </nav>

        <div class="hidden md:flex items-center">
          <router-link
            to="/portal/login"
            class="text-[#2B4C7E] font-medium hover:text-[#1e3a5f] transition-colors"
          >
            Iniciar sesión
          </router-link>
        </div>

        <button class="md:hidden p-2" @click="isMenuOpen = !isMenuOpen">
          <X v-if="isMenuOpen" :size="24" />
          <Menu v-else :size="24" />
        </button>
      </div>

      <div v-if="isMenuOpen" class="md:hidden py-4 border-t">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          :class="[
            'block px-4 py-3 text-sm font-medium',
            $route.path === link.path
              ? 'text-[#2B4C7E] bg-blue-50'
              : 'text-gray-600 hover:text-[#2B4C7E] hover:bg-gray-50'
          ]"
          @click="isMenuOpen = false"
        >
          {{ link.name }}
        </router-link>
        <router-link
          to="/portal/login"
          class="block px-4 py-3 text-sm font-medium text-[#2B4C7E]"
          @click="isMenuOpen = false"
        >
          Iniciar sesión
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import logo from '../assets/logo.avif'

const isMenuOpen = ref(false)

const navLinks = [
  { name: 'Inicio', path: '/' },
  { name: 'Quiénes somos', path: '/quienes-somos' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Contacto', path: '/contacto' },
  { name: 'Comprar', path: '/comprar' }
]
</script>
