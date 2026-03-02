<template>
  <UserPortalLayout>
    <div class="max-w-2xl mx-auto">
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B4C7E] mx-auto"></div>
      </div>

      <div v-else>
        <div class="flex items-center justify-center mb-8">
          <div class="w-20 h-20 bg-[#2B4C7E]/10 rounded-full flex items-center justify-center">
            <img :src="logo" alt="Oricen" class="h-12 w-auto" />
          </div>
        </div>

        <h1 class="text-2xl font-bold text-gray-900 mb-6">Detalles del Perfil</h1>

        <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Nombre de la Persona Evaluada</label>
            <input
              v-model="profileData.displayName"
              type="text"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2B4C7E] focus:border-transparent transition-all"
            />
          </div>

          <div class="flex items-end gap-4">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-600 mb-1">Correo Electrónico</label>
              <input
                :value="user?.email"
                type="email"
                disabled
                class="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
              />
            </div>
            <button
              @click="showChangePassword = !showChangePassword"
              class="px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Cambiar Contraseña
            </button>
          </div>

          <div v-if="showChangePassword" class="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">Nueva contraseña</label>
              <input
                v-model="newPassword"
                type="password"
                minlength="6"
                placeholder="Mínimo 6 caracteres"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2B4C7E] focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">Confirmar nueva contraseña</label>
              <input
                v-model="confirmNewPassword"
                type="password"
                minlength="6"
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2B4C7E] focus:border-transparent"
              />
            </div>
            <div class="flex gap-2">
              <button
                @click="changePassword"
                :disabled="!newPassword || newPassword !== confirmNewPassword || changingPassword"
                class="px-4 py-2 bg-[#2B4C7E] text-white rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-[#1a3a61] transition-colors"
              >
                {{ changingPassword ? 'Actualizando...' : 'Actualizar contraseña' }}
              </button>
              <button
                @click="showChangePassword = false; newPassword = ''; confirmNewPassword = ''"
                class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">Plan Contratado</label>
              <div class="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                {{ serviceName || 'Sin asignar' }}
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">Idioma de Evaluación</label>
              <div class="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  @click="profileData.evaluationLanguage = 'es'"
                  :class="profileData.evaluationLanguage === 'es' ? 'bg-[#2B4C7E] text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'"
                  class="flex-1 px-4 py-3 text-sm font-medium transition-colors"
                >
                  Español
                </button>
                <button
                  @click="profileData.evaluationLanguage = 'en'"
                  :class="profileData.evaluationLanguage === 'en' ? 'bg-[#2B4C7E] text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'"
                  class="flex-1 px-4 py-3 text-sm font-medium transition-colors border-l"
                >
                  Inglés
                </button>
              </div>
            </div>
          </div>

          <div v-if="successMsg" class="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            {{ successMsg }}
          </div>

          <div v-if="errorMsg" class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {{ errorMsg }}
          </div>

          <div class="pt-4">
            <button
              @click="saveProfile"
              :disabled="saving"
              class="px-6 py-3 bg-[#2B4C7E] text-white rounded-lg font-medium hover:bg-[#1a3a61] transition-colors disabled:opacity-50"
            >
              {{ saving ? 'Guardando...' : 'Guardar Cambios' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </UserPortalLayout>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useAuth } from '../composables/useAuth'
import { userService } from '../services/userService'
import { updatePassword } from 'firebase/auth'
import UserPortalLayout from '../components/UserPortalLayout.vue'
import logo from '../../assets/logo.avif'

const { user, userProfile, loading, initAuth } = useAuth()
initAuth()

const saving = ref(false)
const changingPassword = ref(false)
const showChangePassword = ref(false)
const newPassword = ref('')
const confirmNewPassword = ref('')
const successMsg = ref('')
const errorMsg = ref('')

const profileData = reactive({
  displayName: '',
  evaluationLanguage: 'es'
})

const serviceNames = { A: 'Origen', B: 'Brújula', C: 'Atlas' }
const serviceName = computed(() => {
  return serviceNames[userProfile.value?.serviceType] || null
})

watch(userProfile, (profile) => {
  if (profile) {
    profileData.displayName = profile.displayName || ''
    profileData.evaluationLanguage = profile.evaluationLanguage || 'es'
  }
}, { immediate: true })

const saveProfile = async () => {
  if (!user.value) return
  saving.value = true
  successMsg.value = ''
  errorMsg.value = ''
  try {
    await userService.updateUser(user.value.uid, {
      displayName: profileData.displayName,
      evaluationLanguage: profileData.evaluationLanguage
    })
    successMsg.value = 'Perfil actualizado correctamente.'
    setTimeout(() => { successMsg.value = '' }, 3000)
  } catch (err) {
    console.error('Error saving profile:', err)
    errorMsg.value = 'Error al guardar el perfil.'
  }
  saving.value = false
}

const changePassword = async () => {
  if (!user.value || newPassword.value !== confirmNewPassword.value) return
  changingPassword.value = true
  errorMsg.value = ''
  successMsg.value = ''
  try {
    await updatePassword(user.value, newPassword.value)
    successMsg.value = 'Contraseña actualizada correctamente.'
    showChangePassword.value = false
    newPassword.value = ''
    confirmNewPassword.value = ''
    setTimeout(() => { successMsg.value = '' }, 3000)
  } catch (err) {
    console.error('Error changing password:', err)
    if (err.code === 'auth/requires-recent-login') {
      errorMsg.value = 'Necesitas volver a iniciar sesión para cambiar la contraseña.'
    } else if (err.code === 'auth/weak-password') {
      errorMsg.value = 'La contraseña es demasiado débil. Usa al menos 6 caracteres.'
    } else {
      errorMsg.value = 'Error al cambiar la contraseña.'
    }
  }
  changingPassword.value = false
}
</script>
