<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <div class="flex items-center gap-4">
        <router-link to="/portal" class="flex items-center gap-4">
          <img :src="logo" alt="Oricen Logo" class="h-12 w-auto" />
        </router-link>
        <span class="text-gray-300">|</span>
        <h1 class="text-xl font-bold text-gray-900">{{ title }}</h1>
      </div>
      <div class="flex items-center gap-4">
        <router-link to="/portal" class="text-[#2B4C7E] hover:underline text-sm">
          Volver al Portal
        </router-link>
        <button @click="handleLogout" class="text-sm text-red-600 hover:text-red-800">
          Cerrar sesión
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import logo from '../../assets/logo.avif'

defineProps({
  title: {
    type: String,
    required: true
  }
})

const router = useRouter()
const { logout } = useAuth()

const handleLogout = async () => {
  await logout()
  router.push('/portal/login')
}
</script>
