<template>
  <div class="min-h-screen flex">
    <!-- Left Panel - Dark Blue -->
    <div class="hidden lg:flex lg:w-1/2 bg-[#2B4C7E] flex-col justify-between p-12">
      <div>
        <div class="mb-12">
          <img :src="logo" alt="Oricen Logo" class="h-16 w-auto mb-6" />
          <h1 class="text-4xl font-bold text-white leading-tight">
            Tu camino hacia el bienestar 
            <span class="text-[#5DADE2]">comienza</span> aquí.
          </h1>
        </div>
        <p class="text-white text-lg opacity-90 max-w-md">
          Accede a tu portal personal para gestionar tus citas, documentos y seguimiento terapéutico de forma segura.
        </p>
      </div>
      <p class="text-white text-sm opacity-75">
        © 2024 Oricen Salud Mental • Privacidad Protegida
      </p>
    </div>

    <!-- Right Panel - Light Grey/White -->
    <div class="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center py-12 px-4">
      <div class="max-w-md w-full">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Bienvenido de nuevo</h2>
          <p class="text-gray-600 mb-8">Ingresa a tu cuenta para continuar con tu proceso.</p>

          <div
            v-if="errorMsg"
            class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
          >
            {{ errorMsg }}
          </div>

          <div v-if="isLoading" class="text-center py-8">
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B4C7E] mx-auto"
            ></div>
            <p class="mt-4 text-gray-600">Cargando...</p>
          </div>

          <div v-else>
            <form @submit.prevent="onEmailLogin" class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E] focus:border-transparent bg-gray-50 text-gray-900"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B4C7E] focus:border-transparent bg-gray-50 text-gray-900"
                  placeholder="••••••"
                />
              </div>

              <button
                type="submit"
                class="w-full bg-[#2B4C7E] text-white py-3 rounded-lg font-medium hover:bg-[#1e3a5f] transition-colors"
              >
                Iniciar sesión
              </button>
            </form>

            <div class="mt-4 text-center">
              <router-link to="/" class="text-sm text-gray-600 hover:text-[#2B4C7E]">
                ¿No tienes cuenta? Regístrate
              </router-link>
            </div>

            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">o continúa con</span>
              </div>
            </div>

            <button
              type="button"
              @click="onGoogleClick"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
            >
              <img
                src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png"
                alt="Google"
                class="w-5 h-5"
              />
              Continuar con Google
            </button>

            <div class="mt-6 text-center">
              <router-link to="/" class="text-[#2B4C7E] hover:underline text-sm flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Volver a la página principal
              </router-link>
            </div>

            <p class="mt-8 text-xs text-gray-400 text-center">
              Al continuar, aceptas nuestros 
              <router-link to="/politica-privacidad" class="underline hover:text-gray-600">Términos de Servicio</router-link> 
              y 
              <router-link to="/politica-privacidad" class="underline hover:text-gray-600">Política de Privacidad</router-link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../../assets/logo.avif";

const router = useRouter();
const { user, userRole, loading, error, loginWithGoogle, initAuth } = useAuth();

const isLoading = ref(true);
const errorMsg = ref(null);
const email = ref("");
const password = ref("");

onMounted(() => {
  console.log("PortalLogin mounted");
  initAuth();
  isLoading.value = false;
  console.log("PortalLogin ready");
});

const onEmailLogin = async () => {
  try {
    isLoading.value = true;
    errorMsg.value = null;
    await signInWithEmailAndPassword(auth, email.value, password.value);
  } catch (err) {
    console.error("Error en login:", err);
    errorMsg.value = err.message || "Error al iniciar sesión. Por favor, verifica tus credenciales.";
    isLoading.value = false;
  }
};

const onGoogleClick = async () => {
  console.log("=== CLICK DETECTADO ===");
  try {
    isLoading.value = true;
    errorMsg.value = null;
    await loginWithGoogle();
  } catch (err) {
    console.error("Error en login:", err);
    errorMsg.value = err.message || "Error al iniciar sesión con Google.";
    isLoading.value = false;
  }
};

watch([user, userRole], ([newUser, newRole]) => {
  console.log("Auth state changed:", { user: newUser?.email, role: newRole });
  if (newUser && newRole) {
    if (newRole === "admin") {
      router.push("/admin");
    } else {
      router.push("/portal");
    }
  }
});

watch(error, (newError) => {
  if (newError) {
    errorMsg.value = newError;
    isLoading.value = false;
  }
});
</script>
