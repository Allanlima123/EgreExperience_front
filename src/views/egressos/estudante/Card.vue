<template>
  <main class="bg-gray-100 py-6 flex items-center flex-col min-h-screen">
    <section
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
    </section>

    <section class="flex-grow py-4 w-full">
      <div
        class="flex-wrap grid relative grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-screen-xl w-full px-6"
        v-if="estudantes.length"
      >
        <div
          v-for="estudante in estudantes"
          :key="estudante.id"
          class="bg-white border box_card border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center relative max-w-sm"
        >
          <img
            class="w-36 h-36 object-cover rounded-full mt-2"
            :src="estudante.foto"
            :alt="`Imagem de ${estudante.nome}`"
          />
          <div class="flex w-full flex-col mt-4 text-gray-800">
            <strong class="font-bold text-xl mb-2">
              {{ estudante.cargoAtual }}
            </strong>

            <p class="text-gray-700 text-base mb-4">
              {{ estudante.descricaoTecnica || "Descrição não disponível" }}
            </p>

            <div class="flex flex-wrap mb-4">
              <ul
                class="text-gray-800 my-2 flex flex-wrap gap-2"
                v-if="estudante.habilidades"
              >
                <li
                  v-for="habilidade in estudante.habilidades"
                  :key="habilidade"
                  class="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs"
                >
                  {{ habilidade }}
                </li>
              </ul>
              <span class="block text-gray-600 italic" v-else
                >Sem Habilidades Técnicas</span
              >
            </div>
          </div>
          <router-link
            :to="{
              name: 'perfil',
              params: { username: estudante.nome, id : estudante.id },
            }"
            class="w-full mt-4"
          >
            <a
              class="bg-blue-500 text-white rounded-full text-sm font-semibold cursor-pointer w-28 h-8 flex items-center justify-center absolute"
            >
              Ver Perfil
            </a>
          </router-link>
        </div>
      </div>
      <div class="text-center text-gray-600 italic" v-else>
        Sem Estudantes Cadastrados!
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const estudantes = ref([]);

const fetchEstudantes = async () => {
  try {
    const { data } = await axios.get("http://localhost:8080/estudante");
    estudantes.value = data;
  } catch (error) {
    console.error("Erro ao buscar dados dos estudantes:", error);
  }
};

onMounted(() => {
  fetchEstudantes();
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
</style>
