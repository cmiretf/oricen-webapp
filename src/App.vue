<template>
  <template v-if="routerReady">
    <Header v-if="showPublicLayout" />
    <router-view />
    <Footer v-if="showPublicLayout" />
  </template>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { auth } from "./portal/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const route = useRoute();
const router = useRouter();
const isAuthenticated = ref(false);
const routerReady = ref(false);

router.isReady().then(() => {
  routerReady.value = true;
});

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isAuthenticated.value = !!user;
  });
});

const showPublicLayout = computed(() => {
  const path = route.path;
  const isPortalRoute = path.startsWith("/portal");
  const isAdminRoute = path.startsWith("/admin");

  if (isPortalRoute || isAdminRoute) {
    return false;
  }

  if (isAuthenticated.value) {
    return false;
  }

  return true;
});
</script>
