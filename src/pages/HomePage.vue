<template>
  <Layout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Enfoca tu rumbo con nuestro programa de Orientación Vocacional
          </h1>
          <p class="text-lg text-gray-600 mb-8">
            Te guiamos para encontrar claridad y tomar decisiones sobre tu futuro. Facilitamos el salto a la acción.
          </p>
          <div class="flex gap-4">
            <router-link to="/servicios" class="btn-primary">
              Estudiantes
            </router-link>
            <router-link to="/servicios" class="btn-secondary">
              Colegios
            </router-link>
          </div>
        </div>
        <div class="hidden md:block">
          <img 
            src="https://images.unsplash.com/photo-1507842217343-583f20270319?w=600&q=80" 
            alt="Biblioteca" 
            class="rounded-lg shadow-lg w-full h-full object-cover"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div class="text-center">
          <div class="text-4xl font-bold text-[#2B4C7E] mb-2">500+</div>
          <p class="text-gray-600">Estudiantes orientados</p>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-[#2B4C7E] mb-2">95%</div>
          <p class="text-gray-600">Satisfacción garantizada</p>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-[#2B4C7E] mb-2">20+</div>
          <p class="text-gray-600">Años de experiencia</p>
        </div>
      </div>

      <div class="bg-gray-50 rounded-lg p-12 mb-20">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">
          Nuestros Especialistas
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-lg shadow text-center">
            <div class="text-4xl mb-4">👨‍🎓</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Orientadores Vocacionales</h3>
            <p class="text-gray-600">Profesionales certificados con experiencia en guía vocacional</p>
          </div>
          <div class="bg-white p-8 rounded-lg shadow text-center">
            <div class="text-4xl mb-4">🎯</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Coaches Educativos</h3>
            <p class="text-gray-600">Especialistas en desarrollo de habilidades y potencial</p>
          </div>
          <div class="bg-white p-8 rounded-lg shadow text-center">
            <div class="text-4xl mb-4">💼</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Asesores Profesionales</h3>
            <p class="text-gray-600">Expertos en inserción laboral y desarrollo profesional</p>
          </div>
        </div>
      </div>

      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">¿Listo para comenzar?</h2>
        <p class="text-lg text-gray-600 mb-8">
          Descubre cómo podemos ayudarte a encontrar tu camino
        </p>
        <router-link to="/contacto" class="btn-primary">
          Contacta con nosotros
        </router-link>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Layout from '../components/Layout.vue'
</script>
