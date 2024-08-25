<template>
  <main class="bg-gray-100 py-6 flex items-center flex-col min-h-screen">
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
      <div v-if="projetos.length" class="space-y-6 max-w-screen-xl w-full">
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

          <ListaParticipacoes
            :participacoes="projeto.participacoes"
            @editarParticipacao="editarParticipacao"
          />
        </div>
      </div>
      <div v-else class="text-center text-gray-600 italic">
        Nenhum projeto encontrado.
      </div>
    </section>

    <Teleport to="#popUp">
      <transition name="fade">
        <div
          v-if="showModal"
          class="fixed inset-0 flex items-center justify-center z-500 bg-gray-800 bg-opacity-60"
        >
          <div
            class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4 sm:mx-auto z-100"
          >
            <h2 class="text-xl font-semibold mb-4">
              {{ isEditMode ? "Editar Projeto" : "Novo Projeto" }}
            </h2>
            <form @submit.prevent="sendNewProjeto" class="space-y-4">
              <div>
                <label
                  for="nome"
                  class="block text-sm font-medium text-gray-700"
                >
                  Nome do Projeto
                </label>
                <input
                  v-model="formProjeto.nome"
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
                  Descrição
                </label>
                <textarea
                  v-model="formProjeto.descricao"
                  id="descricao"
                  rows="4"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                ></textarea>
              </div>

              <div class="flex items-center justify-between space-x-2">
                <div class="w-full">
                  <label
                    for="anoInicio"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Ano de Início
                  </label>
                  <input
                    type="date"
                    id="anoInicio"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div class="w-full">
                  <label
                    for="anoConclusao"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Ano de Conclusão
                  </label>
                  <input
                    type="date"
                    id="anoConclusao"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  for="cidadeAtual"
                  class="block text-sm font-medium text-gray-700"
                >
                  Cidade Atual
                </label>
                <input
                  type="text"
                  v-model="formProjeto.cidadeAtual"
                  id="cidadeAtual"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
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
                  @click="closeModal"
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
      </transition>
    </Teleport>

    <Teleport to="#popUp">
      <div
        v-if="showModalParticipacao"
        class="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-60"
      >
        <div
          class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4 sm:mx-auto z-10"
        >
          <h2 class="text-xl font-semibold mb-4">Nova do Participação</h2>
          <form @submit.prevent="sendNewParticipante" class="space-y-4">
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
  </main>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import ListaParticipacoes from "./ListaParticipacoes.vue";

const isEditMode = ref(false);
const showModal = ref(false);
const projetos = ref([]);

const showModalParticipacao = ref(false);
const isEditModeParticipacao = ref(false);

const isLoading = ref(false);
const errorMessage = ref(null);
const successMessage = ref(null);

const nivelExperiencia = ["BASICO", "INTERMEDIARIO", "AVANCADO"];

const formProjeto = reactive({
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

const fetchEstudante = async () => {
  try {
    const { data } = await axios.get(`http://localhost:8080/estudante/${1}`);
    formProjeto.estudanteId = data.id;
    await fetchProjetos();
  } catch (error) {
    console.error("Estudante não encontrado na base de Dados.", error);
  }
};

const fetchProjetos = async () => {
  try {
    const { data: projetosData } = await axios.get(
      `http://localhost:8080/projeto/estudante/${formProjeto.estudanteId}`
    );

    const projetosComParticipacoes = await Promise.all(
      projetosData.map(async (projeto) => {
        let participacoesData = [];

        const { data } = await axios.get(
          `http://localhost:8080/participacoes/projeto/${projeto.id}`
        );
        participacoesData = data;

        return {
          ...projeto,
          participacoes: participacoesData,
        };
      })
    );

    projetos.value = projetosComParticipacoes;
  } catch (error) {
    console.error("Erro ao buscar projetos ou participações.", error);
  }
};

const sendNewProjeto = async () => {
  isLoading.value = true;
  errorMessage.value = null;
  successMessage.value = null;

  try {
    if (isEditMode.value) {
      await axios.put(
        `http://localhost:8080/projeto/${formProjeto.id}`,
        formProjeto
      );
      successMessage.value = "Projeto atualizado com sucesso!";
    } else {
      await axios.post(`http://localhost:8080/projeto`, formProjeto);
      successMessage.value = "Projeto criado com sucesso!";
    }
  } catch (error) {
    if (error.response) {
      errorMessage.value = `Erro: ${
        error.response.data.message ||
        "Ocorreu um erro ao enviar o projeto. Por favor, tente novamente."
      }`;
    } else if (error.request) {
      errorMessage.value =
        "Nenhuma resposta recebida do servidor. Verifique sua conexão e tente novamente.";
    } else {
      errorMessage.value = `Erro ao configurar a solicitação: ${error.message}`;
    }
  } finally {
    isLoading.value = false;
    setTimeout(() => {
      cleanForm();
      closeModal();
      location.reload();
    }, 2000);
  }
};

const sendNewParticipante = async () => {
  isLoading.value = true;
  errorMessage.value = null;
  successMessage.value = null;
  
  try {
    if (isEditModeParticipacao.value) {
      await axios.put(
        `http://localhost:8080/participacoes/${formParticipacoes.id}`,
        formParticipacoes
      );
      successMessage.value = "Particpação atualizado com sucesso!";
    } else {
      await axios.post(`http://localhost:8080/participacoes`, formParticipacoes);
      successMessage.value = "Participação criada com sucesso!";
    }
  } catch (error) {
    handleErrors(error);
  } finally {
    isLoading.value = false;
    setTimeout(() => {
      closeModalParticpacoes();
      cleanFormParticipacao();
      location.reload();
    }, 2000);
  }
};

const deletarProjeto = async (idProjeto) => {
  try {
    const res = await axios.delete(
      `http://localhost:8080/projeto/${idProjeto}`
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

    const { data } = await axios.get(
      `http://localhost:8080/projeto/${idProjeto}`
    );

    Object.assign(formProjeto, { ...data });
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

const editarParticipacao = async (participacaoId) => {
  try {
    showModalParticipacao.value = true;
    isEditModeParticipacao.value = true;

    const { data } = await axios.get(
      `http://localhost:8080/participacoes/${participacaoId}`
    );

    Object.assign(formParticipacoes, { ...data });
  } catch (error) {
    console.error("Erro ao buscar participação:", error);

    errorMessage.value =
      "Erro ao buscar o participação. Por favor, tente novamente.";

    showModalParticipacao = false;
  }
};

const closeModalParticpacoes = () => {
  showModalParticipacao.value = false;
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
  Object.assign(formProjeto, {
    nome: "",
    descricao: "",
    anoInicio: "",
    anoConclusao: "",
    cidadeAtual: "",
    estudanteId: 0,
  });

  successMessage.value = null;
};

const cleanFormParticipacao = () => {
  Object.assign(formParticipacoes, {
    nome: "",
    papel: "",
    nivel: "",
  });

  successMessage.value = null;
};

const closeModal = () => {
  cleanForm();
  showModal.value = false;
  isEditMode.value = false;
};
onMounted(() => {
  fetchEstudante();
});
</script>
