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
              Habilidades
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
            <td class="px-6 py-4 text-sm font-medium text-gray-500">
              {{ estudante.id }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">
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
            <td class="px-6 py-4 text-sm text-gray-500 w-30">
              {{ estudante.anoFormacao }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">
              <ul
                class="list-none list-inside w-25 block px-4 py-4 text-sm text-gray-500 overflow-y-auto h-20 scroll_box"
              >
                <li v-for="idioma in estudante.idiomas" :key="idioma">
                  {{ idioma }}
                </li>
              </ul>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">
              <ul
                class="list-none list-inside block px-6 py-4 text-sm text-gray-500 overflow-y-auto h-20 scroll_box"
              >
                <li
                  v-for="habilidade in estudante.habilidades"
                  :key="habilidade"
                >
                  {{ habilidade }}
                </li>
              </ul>
            </td>
            <td
              class="px-6 py-4 text-base text-gray-500 text-center items-center space-x-2"
            >
              <button
                @click="updateEstudante(estudante.id)"
                class="text-blue-500 hover:text-blue-700"
              >
                <i class="fa fa-pencil"></i>
              </button>
              <button class="text-red-500 hover:text-red-700">
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

    <Teleport to="#popUp">
      <div
        v-if="isVisibleForm"
        class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg w-2/5 max-w-2xl mx-auto">
          <h2 class="text-2xl font-bold mb-4">Editar Formulário Estudante</h2>
          <form @submit.prevent="handleSubmit">
            <div class="flex gap-2">
              <div class="mb-4 w-full">
                <label
                  for="nome"
                  class="block text-sm mb-2 font-sm text-gray-700"
                  >Nome</label
                >
                <input
                  id="nome"
                  type="text"
                  v-model="estudanteStore.nome"
                  placeholder="Ex.:Ana"
                  class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>

              <div class="mb-4 w-full">
                <label
                  for="cargoAtual"
                  class="block text-sm mb-2 font-sm text-gray-700"
                  >Cargo Atual</label
                >
                <input
                  id="cargoAtual"
                  type="text"
                  placeholder="Ex.: Desenvolvedor"
                  v-model="estudanteStore.cargoAtual"
                  required
                  class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            <div class="flex gap-2">
              <div class="mb-4 w-full">
                <label
                  for="foto"
                  class="block text-sm mb-2 font-sm text-gray-700"
                  >Foto</label
                >
                <input
                  id="foto"
                  type="text"
                  placeholder="Link de uma Imagem"
                  v-model="estudanteStore.foto"
                  required
                  class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div class="mb-4">
                <label
                  for="anoFormacao"
                  class="block text-sm mb-2 font-sm text-gray-700"
                  >Ano de Formação</label
                >
                <input
                  id="anoFormacao"
                  type="date"
                  v-model="estudanteStore.anoFormacao"
                  required
                  class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            <div class="flex space-x-4">
              <div class="flex flex-col w-1/2">
                <label
                  for="idiomas"
                  class="block mb-2 text-sm font-sm text-gray-700"
                  >Selecione seus Idiomas:</label
                >
                <select
                  id="idiomas"
                  v-model="estudanteStore.idiomas"
                  multiple
                  class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 scroll_box"
                  required
                >
                  <option
                    v-for="idioma in listaIdiomas"
                    :key="idioma"
                    :value="idioma"
                    class="text-sm"
                  >
                    {{ idioma }}
                  </option>
                </select>
              </div>

              <div class="flex flex-col w-1/2">
                <label
                  for="habilidades"
                  class="block text-sm mb-2 font-sm text-gray-700"
                  >Selecione suas habilidades:</label
                >
                <select
                  id="habilidades"
                  v-model="estudanteStore.habilidades"
                  multiple
                  class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 scroll_box"
                  required
                >
                  <option
                    v-for="habilidade in listaHabilidades"
                    :key="habilidade"
                    :value="habilidade"
                    class="text-sm"
                  >
                    {{ habilidade }}
                  </option>
                </select>
              </div>
            </div>

            <div class="my-4">
              <label
                for="descricao"
                class="block text-sm font-sm text-gray-700"
              >
                Descrição Técnica Geral
              </label>
              <textarea
                v-model="estudanteStore.descricaoTecnica"
                id="descricao"
                maxlength="100"
                rows="4"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              ></textarea>
            </div>

            <div class="space-x-2">
              <button
                type="submit"
                class="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Enviar
              </button>
              <button
                @click="closeModal"
                class="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                close
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { errorMessage, isLoading } from "@/utils/status";
import { listaHabilidades, listaIdiomas } from "@/utils/data";

import { useEstudanteStore } from "@/store/Estudante";

const estudanteStore = useEstudanteStore();

const isVisibleForm = ref(false);
const estudantes = ref([]);

const fetchEstudantes = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    const { data } = await axios.get("http://localhost:8080/estudante");
    estudantes.value = data;
  } catch (error) {
    console.error("Erro ao buscar estudantes na base de dados.", error);
    errorMessage.value = "Erro ao carregar dados";
  } finally {
    isLoading.value = false;
  }
};

const handleSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    await axios.put(
      `http://localhost:8080/estudante/${estudanteStore.$state.id}`,
      estudanteStore.$state
    );
  } catch (error) {
    console.error("Erro ao atualizar estudante:", error);
    errorMessage.value = "Erro ao atualizar dados. Tente novamente mais tarde.";
  } finally {
    isLoading.value = false;
    isVisibleForm.value = false;
    location.reload();
  }
};

const updateEstudante = async (idEstudante) => {
  if (!idEstudante) {
    errorMessage.value = "ID do estudante não fornecido.";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";
  isVisibleForm.value = true;

  try {
    const { data } = await axios.get(
      `http://localhost:8080/estudante/${idEstudante}`
    );
    Object.assign(estudanteStore.$state, data);
  } catch (error) {
    console.error("Erro ao buscar ou atualizar estudante por ID:", error);
    errorMessage.value =
      "Erro ao carregar ou atualizar dados. Tente novamente mais tarde.";
  } finally {
    isLoading.value = false;
  }
};

const closeModal = () => {
  isVisibleForm.value = false;
};

onMounted(fetchEstudantes);
</script>

<style scoped>
.scroll_box::-webkit-scrollbar {
  width: 0.2rem;
}
</style>
