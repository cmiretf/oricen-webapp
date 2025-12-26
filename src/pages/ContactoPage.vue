<template>
  <Layout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 class="text-4xl font-bold text-gray-900 mb-12 text-center">
        Contacto
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Ponte en contacto</h2>
          <form class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Asunto</label>
              <input
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
                placeholder="Asunto del mensaje"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
              <textarea
                rows="5"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]"
                placeholder="Tu mensaje"
              ></textarea>
            </div>
            <button type="submit" class="w-full btn-primary">
              Enviar mensaje
            </button>
          </form>
        </div>

        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Información de contacto</h2>
          
          <div class="space-y-8">
            <div>
              <h3 class="font-semibold text-gray-900 mb-2">Teléfono</h3>
              <p class="text-gray-600">+34 633 580 559</p>
            </div>

            <div>
              <h3 class="font-semibold text-gray-900 mb-2">Email</h3>
              <p class="text-gray-600">info@oricen.com</p>
            </div>

            <div>
              <h3 class="font-semibold text-gray-900 mb-2">Ubicación</h3>
              <p class="text-gray-600">
                Camino Valdenigriales S/N<br/>
                28223, Pozuelo de Alarcón<br/>
                Madrid (ESIC University)
              </p>
            </div>

            <div class="pt-8 border-t">
              <img :src="logo" alt="Oricen Logo" class="h-20 w-auto" />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16 rounded-lg overflow-hidden shadow-md h-96 border border-gray-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.662283842323!2d-3.7915!3d40.4215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd41860882d23b37%3A0x8670c5285749f7e4!2sCamino%20Valdenigriales%2C%20S%2FN%2C%2028223%20Pozuelo%20de%20Alarc%C3%B3n%2C%20Madrid!5e0!3m2!1ses!2ses!4v1710000000000!5m2!1ses!2ses" 
          width="100%" 
          height="100%" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Layout from '../components/Layout.vue'
import logo from '../assets/logo.avif'
</script>
