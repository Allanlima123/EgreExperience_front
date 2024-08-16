<template>
  <main
    class="bg-gray-100 py-6 flex flex-col items-center min-h-screen"
  >
    <div
      class="flex flex-wrap items-center justify-between px-4 space-x-3 pb-4 w-full max-w-screen-xl"
    >
      <h1 class="text-gray-800 font-bold mb-4 text-4xl">Experiências</h1>
      <div class="space-x-3 flex items-center">
        <div class="relative flex-1">
          <i
            class="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          ></i>
          <input
            type="search"
            class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Pesquisar experiência..."
          />
        </div>
        <router-link to="/">
          <button
            class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Home
          </button>
        </router-link>
      </div>
    </div>
    <div class="space-y-6 max-w-screen-xl w-full px-4">
      <div
        v-for="experiencia in experiencias"
        :key="experiencia.id"
        class="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-semibold text-blue-600">
            {{ experiencia.empresa }}
          </h2>
          <div class="space-x-2">
            <button
              class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              @click="$emit('editarFormacao', experiencia.id)"
            >
              Editar
            </button>
            <button
              class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              @click="deleteFormacao(experiencia.id)"
            >
              Deletar
            </button>
          </div>
        </div>

        <div class="mb-4">
          <p class="text-gray-600 font-semibold">
            <strong>Cargo:</strong> {{ experiencia.cargo }}
          </p>

          <div class="flex">
            <p class="mr-2 text-gray-600">
              <strong>Modalidade:</strong>
            </p>
            <span
              :class="
              experiencia.remoto
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              "
              class="py-1 px-4 rounded-full text-sm font-medium"
            >
              {{ experiencia.remoto ? "Remoto" : "Presencial" }}</span
            >
          </div>

          <p class="text-gray-600">
            <strong>Tempo:</strong> {{ experiencia.tempo }}
          </p>
        </div>
        <p class="text-gray-600 mt-2">
          <strong>Descrição:</strong> {{ experiencia.descricaoProficional }}
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const experiencias = ref([]);

const getExperiencia = async () => {
  const { data } = await axios.get(`http://localhost:8080/estudante/2`);
  console.log(data)
  experiencias.value = data.empregos;
};

onMounted(() =>{
  getExperiencia()
})
</script>

<style scoped>
.card {
  transition: transform 0.3s ease;
}
.card:hover {
  transform: scale(1.02);
}
</style>
