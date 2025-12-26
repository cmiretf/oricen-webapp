<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <div class="text-center mb-8">
          <img :src="logo" alt="Oricen Logo" class="h-20 w-auto mx-auto mb-4" />
          <h1 class="text-3xl font-bold text-gray-900">Portal Personal</h1>
          <p class="text-gray-600 mt-2">Accede a tu área personalizada</p>
        </div>

        <div v-if="error" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {{ error }}
        </div>

        <div v-if="loading" class="text-center py-8">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B4C7E] mx-auto"></div>
          <p class="mt-4 text-gray-600">Cargando...</p>
        </div>

        <div v-else>
          <button 
            @click="handleGoogleLogin"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
          >
            <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" alt="Google" class="w-5 h-5" />
            Continuar con Google
          </button>

          <div class="mt-6 text-center">
            <router-link to="/" class="text-[#2B4C7E] hover:underline text-sm">
              Volver a la página principal
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import logo from '../../assets/logo.avif'

const router = useRouter()
const { user, userRole, loading, error, loginWithGoogle, initAuth } = useAuth()

initAuth()

const handleGoogleLogin = async () => {
  await loginWithGoogle()
}

watch([user, userRole], ([newUser, newRole]) => {
  if (newUser && newRole) {
    if (newRole === 'admin') {
      router.push('/admin')
    } else {
      router.push('/portal')
    }
  }
})
</script>
