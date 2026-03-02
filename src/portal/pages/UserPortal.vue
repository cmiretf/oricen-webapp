<template>
  <UserPortalLayout>
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B4C7E] mx-auto"></div>
    </div>

    <div v-else-if="!userProfile?.serviceType" class="max-w-2xl mx-auto">
      <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
        <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-yellow-800 mb-2">Servicio no asignado</h2>
        <p class="text-yellow-700">Tu cuenta está pendiente de asignación de servicio. El administrador te asignará un plan pronto.</p>
      </div>
    </div>

    <div v-else class="max-w-3xl mx-auto">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Instrucciones para Empezar</h1>
        <div class="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p class="text-blue-800 font-medium">
            <span class="font-bold">Importante:</span> No puedes pasar a la siguiente sección sin haber completado las previas.
          </p>
        </div>
      </div>

      <div class="space-y-4">
        <div
          v-for="(step, index) in visibleSteps"
          :key="step.key"
          class="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" :class="step.iconBg">
              <div v-html="step.icon" class="w-6 h-6"></div>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900">{{ index + 1 }}. {{ step.title }}</h3>
              <p class="text-gray-600 mt-1">{{ step.description }}</p>
              <router-link
                :to="step.route"
                class="inline-flex items-center gap-2 mt-3 text-[#2B4C7E] hover:text-[#1a3a61] text-sm font-medium transition-colors"
              >
                Ir a {{ step.title }}
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserPortalLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useAuth } from '../composables/useAuth'
import UserPortalLayout from '../components/UserPortalLayout.vue'

const { user, userProfile, loading, initAuth } = useAuth()
initAuth()

const serviceConfig = {
  A: ['documents', 'forms'],
  B: ['documents', 'evaluation'],
  C: ['documents', 'forms', 'evaluation', 'calendar', 'reports']
}

const allSteps = [
  {
    key: 'documents',
    title: 'Buzón',
    description: 'Sube aquí todos los documentos necesarios para tu evaluación. Esto incluye notas escolares de los últimos años, certificados de idiomas y cualquier otro informe psicopedagógico relevante que tengas.',
    route: '/portal/documentos',
    iconBg: 'bg-green-50',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>'
  },
  {
    key: 'forms',
    title: 'Formularios',
    description: 'Completa los cuestionarios designados para ti y, si aplica, los de tus padres o tutores. Las preguntas recaban información esencial y se completan de forma sencilla.',
    route: '/portal/formularios',
    iconBg: 'bg-blue-50',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>'
  },
  {
    key: 'evaluation',
    title: 'Evaluación',
    description: 'Encuentra las instrucciones detalladas y tus claves de acceso personalizadas para realizar cada prueba psicométrica.',
    route: '/portal/evaluacion',
    iconBg: 'bg-purple-50',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>'
  },
  {
    key: 'reports',
    title: 'Informe',
    description: 'Una vez finalizado el proceso, tu informe de orientación estará disponible aquí para su descarga.',
    route: '/portal/informes',
    iconBg: 'bg-amber-50',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>'
  }
]

const visibleSteps = computed(() => {
  const service = userProfile.value?.serviceType
  if (!service) return []
  const sections = serviceConfig[service] || []
  return allSteps.filter(step => sections.includes(step.key))
})
</script>
