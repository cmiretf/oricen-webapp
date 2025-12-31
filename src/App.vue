<template>
  <Header v-if="!isPortalRoute" />
  <router-view />
  <Footer v-if="!isPortalRoute" />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
const isPortalRoute = computed(() => {
  return route.path.startsWith('/portal') || route.path.startsWith('/admin')
})
</script>
