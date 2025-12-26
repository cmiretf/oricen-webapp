<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Gestión de Formularios</h2>
      <button @click="showCreate = true" class="btn-primary">
        + Crear formulario
      </button>
    </div>

    <div v-if="showCreate" class="bg-white rounded-lg shadow p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-900 mb-4">Nuevo Formulario</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input v-model="newForm.title" type="text" class="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="newForm.description" rows="2" class="w-full px-3 py-2 border rounded"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Servicio</label>
          <select v-model="newForm.serviceType" class="w-full px-3 py-2 border rounded">
            <option value="A">Origen</option>
            <option value="B">Brújula</option>
            <option value="C">Atlas</option>
          </select>
        </div>
        
        <div class="border-t pt-4">
          <div class="flex justify-between items-center mb-3">
            <h4 class="font-medium">Campos del formulario</h4>
            <button @click="addField" class="text-[#2B4C7E] text-sm hover:underline">+ Añadir campo</button>
          </div>
          
          <div v-for="(field, index) in newForm.fields" :key="index" class="flex gap-2 mb-2">
            <input v-model="field.label" placeholder="Etiqueta" class="flex-1 px-2 py-1 border rounded text-sm" />
            <input v-model="field.name" placeholder="Nombre interno" class="w-32 px-2 py-1 border rounded text-sm" />
            <select v-model="field.type" class="w-28 px-2 py-1 border rounded text-sm">
              <option value="text">Texto</option>
              <option value="textarea">Texto largo</option>
              <option value="select">Selección</option>
            </select>
            <button @click="removeField(index)" class="text-red-500 text-sm">×</button>
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="createForm" class="btn-primary" :disabled="!newForm.title">
            Crear formulario
          </button>
          <button @click="showCreate = false" class="btn-secondary">
            Cancelar
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B4C7E] mx-auto"></div>
    </div>

    <div v-else-if="forms.length === 0" class="bg-white rounded-lg shadow p-12 text-center text-gray-500">
      No hay formularios creados
    </div>

    <div v-else class="space-y-4">
      <div v-for="form in forms" :key="form.id" class="bg-white rounded-lg shadow p-6">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-bold text-gray-900">{{ form.title }}</h3>
            <p class="text-gray-600 text-sm">{{ form.description }}</p>
            <span class="inline-block mt-2 px-2 py-1 bg-gray-100 rounded text-xs">
              {{ getServiceName(form.serviceType) }}
            </span>
          </div>
          <span class="text-sm text-gray-500">{{ form.fields?.length || 0 }} campos</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { formService } from '../services/formService'

const forms = ref([])
const loading = ref(true)
const showCreate = ref(false)

const newForm = reactive({
  title: '',
  description: '',
  serviceType: 'A',
  fields: []
})

const serviceNames = { A: 'Origen', B: 'Brújula', C: 'Atlas' }
const getServiceName = (type) => serviceNames[type]

const loadForms = async () => {
  loading.value = true
  const formsA = await formService.getFormsByService('A')
  const formsB = await formService.getFormsByService('B')
  const formsC = await formService.getFormsByService('C')
  forms.value = [...formsA, ...formsB, ...formsC]
  loading.value = false
}

const addField = () => {
  newForm.fields.push({ label: '', name: '', type: 'text', options: [] })
}

const removeField = (index) => {
  newForm.fields.splice(index, 1)
}

const createForm = async () => {
  await formService.createForm({ ...newForm })
  showCreate.value = false
  newForm.title = ''
  newForm.description = ''
  newForm.fields = []
  await loadForms()
}

onMounted(loadForms)
</script>
