<template>
  <div class="py-4 flex flex-col items-center justify-center">
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

    <div class="flex-grow py-4">
      <div
        class="grid relative grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-xl w-full"
      >
        <div
          v-for="habilidade in habilidades"
          :key="habilidade.id"
          class="relative box_card rounded-lg shadow-lg bg-white hover:scale-105 transition-transform duration-300"
        >
          <img
            class="w-36 h-36 object-cover rounded-full mt-2 m-auto"
            :src="habilidade.estudante.foto"
            :alt="`Imagem de ${habilidade.estudante.nome}`"
          />
          <div class="px-6 py-4 flex flex-col h-full">
            <div class="font-bold text-xl mb-2">
              {{ habilidade.estudante.cargoAtual }}
            </div>
            <p class="text-gray-700 text-base mb-4">
              {{ habilidade.descricaoTecnica || "Descrição não disponível" }}
            </p>
            <div class="flex flex-wrap mb-4">
              <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"
              >
                {{ habilidade.nome }}
              </span>
            </div>
            <router-link
              :to="{
                name: 'perfil',
                params: { username: habilidade.estudante.nome },
              }"
            >
              <a
                class="bg-blue-500 text-white rounded-full text-sm font-semibold cursor-pointer w-28 h-10 absolute bottom-3 right-4 flex items-center justify-center"
              >
                Ver Perfil
              </a>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const habilidades = ref([]);

const fetchHabilidades = async () => {
  try {
    const { data } = await axios.get("http://localhost:8080/habilidade");
    console.log("Alan Lima")
    habilidades.value = data;
  } catch (error) {
    console.error("Erro ao buscar dados de Habilidade:", error);
  }
};

onMounted(() => {
  fetchHabilidades();
});
</script>

<style scoped>
.box_card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-bottom: 60px;
}

.table-container {
  max-height: 400px;
  overflow-y: auto;
}
</style>
