<template>
  <div class="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row">
    <div
      class="hidden md:flex md:w-1/2 bg-[#2B4C7E] p-12 flex-col justify-between text-white relative overflow-hidden"
    >
      <div class="relative z-10">
        <img
          :src="logo"
          alt="Oricen Logo"
          class="h-16 w-auto"
        />
        <div class="mt-24">
          <h1 class="text-5xl font-bold leading-tight">
            Tu camino hacia el bienestar
            <span class="text-[#88C0D0]">comienza aquí</span>.
          </h1>
          <p class="mt-6 text-xl text-blue-100 max-w-lg">
            Accede a tu portal personal para gestionar tus citas, documentos y
            seguimiento terapéutico de forma segura.
          </p>
        </div>
      </div>

      <div
        class="absolute top-[-10%] right-[-10%] w-96 h-96 bg-white/5 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-[-5%] left-[-5%] w-64 h-64 bg-white/5 rounded-full blur-2xl"
      ></div>

      <div class="relative z-10 flex items-center gap-4 text-sm text-blue-200">
        <span>© 2024 Oricen Salud Mental</span>
        <span class="w-1 h-1 bg-blue-400 rounded-full"></span>
        <span>Privacidad Protegida</span>
      </div>
    </div>

    <!-- Right Panel - Light Grey/White -->
    <div
      class="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center py-6 px-4"
    >
      <div class="max-w-md w-full">
        <div class="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Bienvenido de nuevo
          </h2>
          <p class="text-gray-600 mb-5 text-sm">
            Ingresa a tu cuenta para continuar con tu proceso.
          </p>

          <div
            v-if="errorMsg"
            class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-center gap-3"
          >
            <div
              class="flex-shrink-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
            >
              !
            </div>
            <p class="text-red-700 text-sm font-medium">{{ errorMsg }}</p>
          </div>

          <div
            v-if="isLoading"
            class="flex flex-col items-center justify-center py-12"
          >
            <div class="relative w-16 h-16">
              <div
                class="absolute top-0 left-0 w-full h-full border-4 border-blue-100 rounded-full"
              ></div>
              <div
                class="absolute top-0 left-0 w-full h-full border-4 border-t-[#2B4C7E] rounded-full animate-spin"
              ></div>
            </div>
            <p class="mt-4 text-gray-600 font-medium">
              {{
                isRegisterMode
                  ? "Creando cuenta..."
                  : "Iniciando sesión segura..."
              }}
            </p>
          </div>

          <div v-else class="space-y-4">
            <form @submit.prevent="handleEmailAuth" class="space-y-3">
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Correo electrónico</label
                >
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2B4C7E] focus:border-transparent transition-all"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Contraseña</label
                >
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  required
                  minlength="6"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2B4C7E] focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
              <div v-if="isRegisterMode">
                <label
                  for="confirmPassword"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Confirmar contraseña</label
                >
                <input
                  id="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  required
                  minlength="6"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2B4C7E] focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                class="w-full py-3 bg-[#2B4C7E] text-white font-semibold rounded-xl hover:bg-[#1a3a61] transition-all duration-200 active:scale-[0.98]"
              >
                {{ isRegisterMode ? "Crear cuenta" : "Iniciar sesión" }}
              </button>
            </form>

            <div class="text-center">
              <button
                @click="toggleMode"
                class="text-sm text-[#2B4C7E] hover:text-[#1a3a61] font-medium transition-colors"
              >
                {{
                  isRegisterMode
                    ? "¿Ya tienes cuenta? Inicia sesión"
                    : "¿No tienes cuenta? Regístrate"
                }}
              </button>
            </div>

            <div class="relative py-2">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-200"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-[#f8fafc] text-gray-400"
                  >o continúa con</span
                >
              </div>
            </div>

            <div class="space-y-3">
              <button
                @click="onGoogleClick"
                class="group relative w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm active:scale-[0.98]"
              >
                <img
                  src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png"
                  alt="Google"
                  class="w-6 h-6"
                />
                <span>Continuar con Google</span>
                <div
                  class="absolute inset-0 rounded-xl group-hover:bg-black/[0.02] pointer-events-none"
                ></div>
              </button>
            </div>

            <div class="text-center">
              <router-link
                to="/"
                class="inline-flex items-center gap-2 text-sm font-medium text-[#2B4C7E] hover:text-[#1a3a61] transition-colors group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Volver a la página principal
              </router-link>
            </div>
          </div>

          <div class="mt-4 pt-4 border-t border-gray-100">
            <p class="text-xs text-center text-gray-400 leading-relaxed">
              Al continuar, aceptas nuestros
              <a href="#" class="underline hover:text-gray-600"
                >Términos de Servicio</a
              >
              y
              <a href="#" class="underline hover:text-gray-600"
                >Política de Privacidad</a
              >.
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
import logo from "../../assets/logo.avif";

const router = useRouter();
const {
  user,
  userRole,
  loading,
  error,
  loginWithGoogle,
  loginWithEmail,
  registerWithEmail,
  initAuth,
} = useAuth();

const isLoading = ref(false);
const errorMsg = ref(null);
const isRegisterMode = ref(false);
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const toggleMode = () => {
  isRegisterMode.value = !isRegisterMode.value;
  errorMsg.value = null;
  password.value = "";
  confirmPassword.value = "";
};

const handleEmailAuth = async () => {
  errorMsg.value = null;

  if (isRegisterMode.value) {
    if (password.value !== confirmPassword.value) {
      errorMsg.value = "Las contraseñas no coinciden.";
      return;
    }
    try {
      isLoading.value = true;
      await registerWithEmail(email.value, password.value);
    } catch (err) {
      isLoading.value = false;
    }
  } else {
    try {
      isLoading.value = true;
      await loginWithEmail(email.value, password.value);
    } catch (err) {
      isLoading.value = false;
    }
  }
};

const onGoogleClick = async () => {
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
