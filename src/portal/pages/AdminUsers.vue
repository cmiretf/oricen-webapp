<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Gestión de Usuarios</h2>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B4C7E] mx-auto"></div>
    </div>

    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Servicio</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <img v-if="user.photoURL" :src="user.photoURL" class="w-10 h-10 rounded-full" />
                <div v-else class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium">
                  {{ user.displayName?.charAt(0) || '?' }}
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ user.displayName || 'Sin nombre' }}</p>
                  <p class="text-sm text-gray-500">{{ user.email }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <select 
                v-model="user.serviceType"
                @change="updateService(user)"
                class="px-3 py-1 border rounded text-sm"
              >
                <option :value="null">Sin servicio</option>
                <option value="A">Origen</option>
                <option value="B">Brújula</option>
                <option value="C">Atlas</option>
              </select>
            </td>
            <td class="px-6 py-4">
              <select 
                v-model="user.role"
                @change="updateRole(user)"
                class="px-3 py-1 border rounded text-sm"
              >
                <option value="user">Usuario</option>
                <option value="admin">Admin</option>
              </select>
            </td>
            <td class="px-6 py-4">
              <span 
                :class="user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                class="px-2 py-1 rounded text-xs font-medium"
              >
                {{ user.status === 'active' ? 'Activo' : 'Inactivo' }}
              </span>
            </td>
            <td class="px-6 py-4">
              <router-link 
                :to="`/admin/usuarios/${user.id}`"
                class="text-[#2B4C7E] hover:underline text-sm"
              >
                Ver panel
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { userService } from '../services/userService'

const users = ref([])
const loading = ref(true)

const loadUsers = async () => {
  loading.value = true
  users.value = await userService.getAllUsers()
  loading.value = false
}

const updateService = async (user) => {
  await userService.setUserService(user.id, user.serviceType)
}

const updateRole = async (user) => {
  await userService.setUserRole(user.id, user.role)
}

onMounted(loadUsers)
</script>
