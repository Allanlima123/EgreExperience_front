<template>
  <div class="bg-gray-300 py-4 flex flex-col items-center justify-center">
    <!-- Header Section -->
    <div
      class="flex flex-wrap items-center justify-between px-4 space-x-3 pb-4 w-full max-w-screen-xl"
    >
      <h1 class="text-gray-800 font-bold mb-4 text-4xl">Egressos</h1>
      <div class="flex items-center space-x-3">
        <div class="relative flex-1">
          <i
            class="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          ></i>
          <input
            type="search"
            class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Pesquisar Egresso..."
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

    <!-- Egressos List Section -->
    <div class="flex-grow py-4">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-xl w-full"
      >
        <div
          v-for="estudante in dataEstudante"
          :key="estudante.id"
          class="box_card rounded-lg shadow-lg bg-white hover:scale-105 transition-transform duration-300"
        >
          <img
            class="w-36 h-36 object-cover rounded-full mt-2 m-auto"
            :src="estudante.foto"
            :alt="`Imagem de ${estudante.nome}`"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl">{{ estudante.nome }}</div>
            <p class="text-gray-700 text-base mt-2">
              {{ estudante.descricao || "Descrição não disponível" }}
            </p>
          </div>
          <div class="px-6 pt-4 pb-2 flex flex-wrap">
            <span
              v-for="habilidade in estudante.habilidades"
              :key="habilidade"
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"
            >
              {{ habilidade.nome }}
            </span>
          </div>

          <router-link
            :to="{ name: 'perfil', params: { username: estudante.nome } }"
          >
            <div class="px-6 pb-4">
              <a
                class="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold cursor-pointer"
              >
                Ver Perfil
              </a>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const dataEstudante = ref([]);

const getTodosEstudantes = async () => {
  try {
    const response = await axios.get("http://localhost:8080/estudante");
    dataEstudante.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar dados dos estudantes:", error);
  }
};

onMounted(getTodosEstudantes);
</script>

<style scoped>
.box_card {
  width: 294px;
}
</style>
