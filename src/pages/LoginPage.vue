<template>
  <Layout>
    <div class="flex items-center justify-center min-h-[calc(100vh-160px)] bg-gray-50 py-20">
      <div class="w-full max-w-md">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <div class="text-center mb-8">
            <img :src="logo" alt="Oricen Logo" class="h-20 w-auto mx-auto mb-4" />
            <h1 class="text-3xl font-bold text-gray-900">Iniciar Sesión</h1>
            <p class="text-gray-600 mt-2">Accede a tu área personal</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <button type="button" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-3">
                <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" alt="Google" class="w-5 h-5" />
                Continuar con Google
              </button>
            </div>

            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">o</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                v-model="email"
                placeholder="tu@email.com"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
              <input
                type="password"
                v-model="password"
                placeholder="••••••••"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
              />
            </div>

            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" class="rounded" />
                Recuérdame
              </label>
              <a href="#" class="text-sm text-[#2B4C7E] hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button type="submit" class="w-full btn-primary py-3 text-lg font-medium">
              Iniciar sesión
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-gray-600">
              ¿No tienes cuenta?
              <a href="#" class="text-[#2B4C7E] font-medium hover:underline">
                Regístrate aquí
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref } from 'vue'
import Layout from '../components/Layout.vue'
import logo from '../assets/logo.avif'

const email = ref('')
const password = ref('')

const handleSubmit = () => {
  console.log('Login attempt', { email: email.value, password: password.value })
}
</script>
