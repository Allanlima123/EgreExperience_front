<template>
  <main class="bg-gray-100 py-6 flex items-center flex-col min-h-screen">
    <FormProjeto
      :showModal="showModal"
      :isEditMode="isEditMode"
      @close-modal="toggleModal"
    />

    <Teleport to="#popUp">
      <div
        v-if="showModalParticipacao"
        class="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-60"
      >
        <div
          class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4 sm:mx-auto z-10"
        >
          <h2 class="text-xl font-semibold mb-4">Nova do Participação</h2>
          <form @submit.prevent="sendNewPrticipant" class="space-y-4">
            <div>
              <label for="nome" class="block text-sm font-medium text-gray-700">
                Nome Participante
              </label>
              <input
                v-model="formParticipacoes.nome"
                type="text"
                id="nome"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                for="descricao"
                class="block text-sm font-medium text-gray-700"
              >
                Papel
              </label>
              <input
                v-model="formParticipacoes.papel"
                type="text"
                id="papel"
                rows="4"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                for="nivelExperiencia"
                class="block text-sm font-medium text-gray-700"
              >
                Nível de Experiência
              </label>
              <div class="mt-2 flex items-center space-x-4 py-2 rounded">
                <div
                  v-for="nivel in nivelExperiencia"
                  :key="nivel"
                  class="flex items-center"
                >
                  <input
                    v-model="formParticipacoes.nivel"
                    :value="nivel"
                    type="radio"
                    :id="`nivel-${nivel}`"
                    class="mr-2 cursor-pointer"
                  />
                  <label :for="`nivel-${nivel}`" class="text-gray-700">
                    {{ nivel }}
                  </label>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-end space-x-2">
              <button
                type="submit"
                :disabled="isLoading"
                class="w-32 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {{ isLoading ? "Enviando..." : "Enviar" }}
              </button>
              <button
                type="button"
                class="w-32 bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                @click="closeModalParticpacoes"
              >
                Cancelar
              </button>
            </div>

            <div v-if="successMessage" class="text-green-600 mt-4">
              {{ successMessage }}
            </div>
            <div v-if="errorMessage" class="text-red-600 mt-4">
              {{ errorMessage }}
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <section
      class="flex flex-wrap items-center justify-between px-6 space-x-4 pb-6 w-full max-w-screen-xl"
    >
      <h1 class="text-gray-800 font-bold mb-4 text-4xl">Projetos</h1>
      <div class="space-x-4 flex items-center">
        <div class="relative flex-1">
          <i
            class="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          ></i>
          <input
            type="search"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Pesquisar Projeto..."
          />
        </div>

        <button
          class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          @click="toggleModal"
        >
          Adicionar Projeto
        </button>
        <router-link to="/">
          <button
            class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Home
          </button>
        </router-link>
      </div>
    </section>

    <section class="space-y-6 px-6 max-w-screen-xl w-full">
      <div
        v-if="projetos.length"
        class="space-y-6 max-w-screen-xl w-full"
      >
        <div
          v-for="projeto in projetos"
          :key="projeto.id"
          class="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-semibold text-blue-600">
              {{ projeto.nome }}
            </h2>
            <div class="space-x-2">
              <button
                class="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Adicionar Participação"
                @click="addNovaParticipacao(projeto.id)"
              >
                Add Participação
              </button>
              <button
                class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Editar Projeto"
                @click="editarProjeto(projeto.id)"
              >
                Editar
              </button>
              <button
                class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Deletar Projeto"
                @click="deletarProjeto(projeto.id)"
              >
                Deletar
              </button>
            </div>
          </div>
          <p class="text-gray-700 mt-2">{{ projeto.descricao }}</p>
          <p class="text-gray-600 mt-1">
            <strong>Ano de Início:</strong> {{ projeto.anoInicio }}
          </p>
          <p class="text-gray-600 mt-1">
            <strong>Ano de Conclusão:</strong> {{ projeto.anoConclusao }}
          </p>
          <p class="text-gray-600 mt-1">
            <strong>Cidade Atual:</strong> {{ projeto.cidadeAtual }}
          </p>
          <div class="mt-4">
            <h3 class="text-lg font-medium text-gray-800 mb-2">
              Participações
            </h3>
            <div class="overflow-x-auto h-40">
              <div class="max-h-80 shadow-sm">
                <table class="min-w-full bg-white">
                  <thead class="bg-gray-50 sticky top-0">
                    <tr>
                      <th class="py-3 px-4 text-left text-gray-700">Nome</th>
                      <th class="py-3 px-4 text-left text-gray-700">Papel</th>
                      <th class="py-3 px-4 text-center text-gray-700">Ações</th>
                    </tr>
                  </thead>
                  <tbody v-if="participacoes && participacoes.length">
                    <tr
                      v-for="participacao in participacoes"
                      :key="participacao.id"
                      class="border-t"
                    >
                      <td class="py-3 px-4 text-gray-800">
                        {{ participacao.nome }}
                      </td>
                      <td class="py-3 px-4 text-gray-600">
                        {{ participacao.papel }}
                      </td>
                      <td class="py-3 px-4 flex justify-center space-x-4">
                        <button
                          @click="atualizarParticipacao(participacao.id)"
                          class="text-blue-500 hover:text-blue-700"
                          title="Atualizar"
                        >
                          <i class="fa fa-pencil"></i>
                        </button>
                        <button
                          @click="deletarParticipacao(participacao.id)"
                          class="text-red-500 hover:text-red-700"
                          title="Deletar"
                        >
                          <i class="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td
                        colspan="3"
                        class="py-3 px-4 text-gray-600 italic text-center"
                      >
                        Sem Participações
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-600 italic">
        Nenhum projeto encontrado.
      </div>
    </section>
  </main>
</template>

<script setup>
import FormProjeto from "./FormProjeto.vue";

import { ref, onMounted, reactive } from "vue";
import axios from "axios";

const showModalParticipacao = ref(false);
const isEditMode = ref(false);
const showModal = ref(false);
const projetos = ref([]);
const participacoes = ref([]);
const isLoading = ref(false);
const errorMessage = ref(null);
const successMessage = ref(null);

//OBS: Buscar Participações

const nivelExperiencia = ["BASICO", "INTERMEDIARIO", "AVANCADO"];

const formProjeto = ref({
  nome: "",
  descricao: "",
  anoInicio: "25/10/2001",
  anoConclusao: "15/07/2014",
  cidadeAtual: "",
  estudanteId: 0,
});

const formParticipacoes = reactive({
  nome: "",
  papel: "",
  nivel: "",
  projetoId: 0,
});

const buscarProjetos = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/projeto/estudante/${1}`
    );
    projetos.value = data;
    await buscarParticipacoes()
  } catch (error) {
    console.error("Sem Projeto.", error);
  }
};

const buscarParticipacoes = async () => {
  try {
    const { data } = await axios.get(`http://localhost:8080/participacoes`);
    participacoes.value = data;
  } catch (error) {
    console.error("Sem Projeto.", error);
  }
};

const deletarProjeto = async (idPorjeto) => {
  try {
    const res = await axios.delete(
      `http://localhost:8080/projeto/${idPorjeto}`
    );
    location.reload();
    console.log(`Projeto ${res.status} deletado com sucesso.`);
  } catch (error) {
    console.error("Erro ao deletar o projeto:", error);
  }
};

const editarProjeto = async (idProjeto) => {
  try {
    showModal.value = true;
    isEditMode.value = true;

    const response = await axios.get(
      `http://localhost:8080/projeto/${idProjeto}`
    );

    formProjeto.value = { ...response.data };
  } catch (error) {
    console.error("Erro ao buscar projeto:", error);

    errorMessage.value =
      "Erro ao buscar o projeto. Por favor, tente novamente.";

    showModal.value = false;
  }
};

const toggleModal = () => {
  showModal.value = !showModal.value;
  isEditMode.value = false;
};

const addNovaParticipacao = (idProjeto) => {
  showModalParticipacao.value = true;
  formParticipacoes.projetoId = idProjeto;
};

const closeModalParticpacoes = () => {
  showModalParticipacao.value = false;
};

const sendNewPrticipant = async () => {
  isLoading.value = true;
  errorMessage.value = null;
  successMessage.value = null;

  try {
    await axios.post(`http://localhost:8080/participacoes`, formParticipacoes);
    successMessage.value = "Participação criada com sucesso!";
  } catch (error) {
    handleErrors(error);
  } finally {
    isLoading.value = false;
    setTimeout(() => {
      closeModalParticpacoes();
      cleanForm();
      location.reload();
    }, 2000);
  }
};

const handleErrors = (error) => {
  if (error.response) {
    errorMessage.value = `Erro: ${
      error.response.data.message ||
      "Ocorreu um erro ao enviar a participação. Por favor, tente novamente."
    }`;
  } else if (error.request) {
    errorMessage.value =
      "Nenhuma resposta recebida do servidor. Verifique sua conexão e tente novamente.";
  } else {
    errorMessage.value = `Erro ao configurar a solicitação: ${error.message}`;
  }
};

const cleanForm = () => {
  Object.assign(formParticipacoes, {
    nome: "",
    papel: "",
    nivel: "",
  });

  successMessage.value = null;
};

onMounted(() => {
  buscarProjetos();
});
</script>
