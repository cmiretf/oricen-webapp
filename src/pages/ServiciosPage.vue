<template>
  <Layout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 class="text-4xl font-bold text-gray-900 mb-4 text-center">
        Nuestros Servicios
      </h1>
      <p class="text-lg text-gray-600 text-center mb-12">
        Tres planes diseñados para diferentes necesidades y objetivos
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(service, index) in services"
          :key="index"
          :class="[
            'rounded-lg overflow-hidden transition-transform hover:scale-105',
            service.featured
              ? 'border-2 border-[#2B4C7E] shadow-xl'
              : 'border border-gray-200 shadow'
          ]"
        >
          <div v-if="service.featured" class="bg-[#2B4C7E] text-white text-center py-2 font-semibold">
            Más Popular
          </div>
          <div class="p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ service.name }}</h3>
            <p class="text-4xl font-bold text-[#2B4C7E] mb-2">{{ service.price }}</p>
            <p class="text-gray-600 mb-8">{{ service.description }}</p>
            
            <ul class="space-y-3 mb-8">
              <li v-for="(feature, i) in service.features" :key="i" class="flex items-start gap-3">
                <span class="text-green-500 font-bold mt-1">✓</span>
                <span class="text-gray-700">{{ feature }}</span>
              </li>
            </ul>

            <router-link to="/comprar" class="w-full block text-center btn-primary">
              Elegir este plan
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Layout from '../components/Layout.vue'

const services = [
  {
    name: 'Origen',
    price: '€299',
    description: 'Perfecto para comenzar tu exploración vocacional',
    features: [
      'Test de aptitudes y preferencias',
      '1 sesión de orientación individual',
      'Informe personalizado',
      'Acceso a base de datos de profesiones'
    ]
  },
  {
    name: 'Brújula',
    price: '€699',
    description: 'Programa completo de orientación vocacional',
    features: [
      'Evaluaciones psicométricas avanzadas',
      '4 sesiones de coaching vocacional',
      'Plan de acción personalizado',
      'Acceso a mentores profesionales',
      'Sesión de preparación laboral'
    ],
    featured: true
  },
  {
    name: 'Atlas',
    price: '€1299',
    description: 'Experiencia premium con seguimiento continuo',
    features: [
      'Evaluación completa y análisis profundo',
      '10 sesiones de coaching personalizado',
      'Seguimiento por 6 meses',
      'Red de profesionales mentores',
      'Preparación para entrevistas de trabajo',
      'Soporte de inserción laboral'
    ]
  }
]
</script>
