<template>
  <div class="bg-gray-100 py-6 flex flex-col items-center min-h-screen">
    <section
      class="flex flex-wrap items-center justify-between px-6 space-x-4 pb-6 w-full max-w-screen-xl"
    >
      <h1 class="text-gray-800 font-bold text-4xl">Lista de Egressos</h1>
      <div class="flex space-x-4 items-center">
        <div class="relative">
          <i
            class="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          ></i>
          <input
            type="search"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Pesquisar Estudante..."
          />
        </div>
        <router-link to="/">
          <button
            class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Home
          </button>
        </router-link>
      </div>
    </section>

    <section class="overflow-x-auto w-full h-screen max-w-screen-xl px-6">
      <table class="min-w-full">
        <thead class="bg-gray-700">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              Nome
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              Cargo Atual
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              Descrição Técnica
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              Ano de Formação
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              Idiomas
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
            >
              Ações
            </th>
          </tr>
        </thead>
        <tbody
          class="bg-white divide-y divide-gray-200"
          v-if="estudantes.length"
        >
          <tr
            v-for="estudante in estudantes"
            :key="estudante.id"
            class="hover:bg-gray-50"
          >
            <td class="px-6 py-4 text-sm font-medium text-gray-900">
              {{ estudante.id }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">
              {{ estudante.nome }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">
              {{ estudante.cargoAtual }}
            </td>
            <td
              class="scroll_box items-center flex mb-2 px-6 py-4 text-justify text-sm text-gray-500 overflow-y-auto w-80 max-w-80"
            >
              {{ estudante.descricaoTecnica }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">
              {{ formatDate(estudante.anoFormacao) }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">
              <ul
                class="list-none list-inside block px-6 py-4 text-sm text-gray-500 overflow-y-auto h-20 scroll_box"
              >
                <li v-for="idioma in estudante.idiomas" :key="idioma">
                  {{ idioma }}
                </li>
              </ul>
            </td>
            <td
              class="px-6 py-4 text-base text-gray-500 text-center items-center space-x-2"
            >
              <button
                @click="updateItem(estudante.id)"
                class="text-blue-500 hover:text-blue-700"
              >
                <i class="fa fa-pencil"></i>
              </button>
              <button
                @click="deleteItem(estudante.id)"
                class="text-red-500 hover:text-red-700"
              >
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="12" class="py-3 px-4 text-gray-600 italic text-center">
              Sem Estudantes Cadastrados!
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const estudantes = ref([]);

const fetchEstudante = async () => {
  try {
    const { data } = await axios.get(`http://localhost:8080/estudante`);
    estudantes.value = data;
  } catch (error) {
    console.error("Error ao buscar Estudantes na base de Dados.", error);
  }
};

function formatDate(date) {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(date).toLocaleDateString("pt-BR", options);
}

onMounted(() => {
  fetchEstudante();
});
</script>

<style scoped>
.scroll_box::-webkit-scrollbar {
  width: 0.2rem;
}
</style>
