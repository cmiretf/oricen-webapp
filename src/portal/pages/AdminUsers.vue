<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Gestión de Usuarios</h2>
    </div>

    <div class="flex items-center gap-4 mb-6">
      <div class="flex bg-gray-100 rounded-lg p-1">
        <button
          @click="activeFilter = 'active'"
          :class="activeFilter === 'active' ? 'bg-white shadow text-gray-900' : 'text-gray-500'"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
        >
          Activos ({{ activeUsers.length }})
        </button>
        <button
          @click="activeFilter = 'finished'"
          :class="activeFilter === 'finished' ? 'bg-white shadow text-gray-900' : 'text-gray-500'"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
        >
          Finalizados ({{ finishedUsers.length }})
        </button>
        <button
          @click="activeFilter = 'all'"
          :class="activeFilter === 'all' ? 'bg-white shadow text-gray-900' : 'text-gray-500'"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
        >
          Todos ({{ users.length }})
        </button>
      </div>
      <div class="flex-1 max-w-xs">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar usuario..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#2B4C7E] focus:border-transparent"
        />
      </div>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B4C7E] mx-auto"></div>
    </div>

    <div v-else-if="filteredUsers.length === 0" class="bg-white rounded-lg shadow p-12 text-center text-gray-500">
      No se encontraron usuarios
    </div>

    <div v-else class="space-y-2">
      <div
        v-for="user in filteredUsers"
        :key="user.id"
        class="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between hover:shadow-md transition-shadow"
      >
        <div class="flex items-center gap-4 flex-1">
          <img v-if="user.photoURL" :src="user.photoURL" class="w-10 h-10 rounded-full" />
          <div v-else class="w-10 h-10 bg-[#2B4C7E] text-white rounded-full flex items-center justify-center text-sm font-medium">
            {{ user.displayName?.charAt(0) || '?' }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-gray-900">{{ user.displayName || 'Sin nombre' }}</p>
            <p class="text-sm text-gray-500">{{ user.email }}</p>
          </div>
          <span v-if="user.serviceType" class="px-3 py-1 bg-[#2B4C7E]/10 text-[#2B4C7E] rounded-full text-xs font-medium">
            {{ getServiceName(user.serviceType) }}
          </span>
          <span v-else class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
            Sin servicio
          </span>
        </div>
        <div class="flex items-center gap-2 ml-4">
          <router-link
            :to="`/admin/usuarios/${user.id}`"
            class="px-3 py-1.5 text-[#2B4C7E] hover:bg-[#2B4C7E]/10 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Ver Detalle
          </router-link>
          <button
            @click="openEditModal(user)"
            class="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Editar
          </button>
        </div>
      </div>
    </div>

    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Editar Usuario</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input v-model="editData.displayName" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Servicio</label>
            <select v-model="editData.serviceType" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
              <option :value="null">Sin servicio</option>
              <option value="A">Origen</option>
              <option value="B">Brújula</option>
              <option value="C">Atlas</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Rol</label>
            <select v-model="editData.role" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
              <option value="user">Usuario</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button @click="showEditModal = false" class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancelar</button>
          <button @click="saveEdit" :disabled="savingEdit" class="flex-1 px-4 py-2 bg-[#2B4C7E] text-white rounded-lg hover:bg-[#1a3a61] transition-colors disabled:opacity-50">
            {{ savingEdit ? 'Guardando...' : 'Guardar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { userService } from '../services/userService'

const users = ref([])
const loading = ref(true)
const searchQuery = ref('')
const activeFilter = ref('active')
const showEditModal = ref(false)
const savingEdit = ref(false)
const editingUser = ref(null)
const editData = reactive({ displayName: '', serviceType: null, role: 'user' })

const serviceNames = { A: 'Origen', B: 'Brújula', C: 'Atlas' }
const getServiceName = (type) => serviceNames[type]

const activeUsers = computed(() => users.value.filter(u => u.role !== 'admin' && u.status !== 'finished'))
const finishedUsers = computed(() => users.value.filter(u => u.status === 'finished'))

const filteredUsers = computed(() => {
  let list = users.value
  if (activeFilter.value === 'active') list = activeUsers.value
  else if (activeFilter.value === 'finished') list = finishedUsers.value

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(u =>
      (u.displayName?.toLowerCase().includes(q)) ||
      (u.email?.toLowerCase().includes(q))
    )
  }
  return list
})

const loadUsers = async () => {
  loading.value = true
  users.value = await userService.getAllUsers()
  loading.value = false
}

const openEditModal = (user) => {
  editingUser.value = user
  editData.displayName = user.displayName || ''
  editData.serviceType = user.serviceType || null
  editData.role = user.role || 'user'
  showEditModal.value = true
}

const saveEdit = async () => {
  if (!editingUser.value) return
  savingEdit.value = true
  await userService.updateUser(editingUser.value.id, {
    displayName: editData.displayName,
    serviceType: editData.serviceType,
    role: editData.role
  })
  showEditModal.value = false
  await loadUsers()
  savingEdit.value = false
}

onMounted(loadUsers)
</script>
