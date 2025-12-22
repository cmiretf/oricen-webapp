<template>
  <Layout>
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 class="text-4xl font-bold text-gray-900 mb-8 text-center">
        Selecciona tu plan
      </h1>

      <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Plan seleccionado: Brújula</h2>
        
        <div class="border-t border-b border-gray-200 py-6 mb-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-700">Orientación Vocacional Profesional</span>
            <span class="text-2xl font-bold text-[#2B4C7E]">€699</span>
          </div>
          <p class="text-gray-600 text-sm">Programa completo con 4 sesiones de coaching y acceso a mentores</p>
        </div>

        <div class="mb-8">
          <h3 class="font-semibold text-gray-900 mb-4">¿Qué incluye?</h3>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <span class="text-green-500 font-bold">✓</span>
              <span class="text-gray-700">Evaluaciones psicométricas avanzadas</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-green-500 font-bold">✓</span>
              <span class="text-gray-700">4 sesiones de coaching vocacional</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-green-500 font-bold">✓</span>
              <span class="text-gray-700">Plan de acción personalizado</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-green-500 font-bold">✓</span>
              <span class="text-gray-700">Acceso a mentores profesionales</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-green-500 font-bold">✓</span>
              <span class="text-gray-700">Sesión de preparación laboral</span>
            </li>
          </ul>
        </div>

        <div class="space-y-4">
          <button class="w-full btn-primary text-lg py-4">
            Continuar con el pago
          </button>
          <router-link to="/servicios" class="block w-full text-center btn-secondary">
            Ver otros planes
          </router-link>
        </div>
      </div>

      <div class="text-center text-gray-600">
        <p class="mb-2">¿Tienes dudas? <router-link to="/contacto" class="text-[#2B4C7E] hover:underline">Contacta con nosotros</router-link></p>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Layout from '../components/Layout.vue'
</script>
