<template>
  <main class="bg-gray-100 py-6 flex items-center flex-col min-h-screen">
    <section
      class="flex flex-wrap items-center justify-between px-6 space-x-4 pb-6 w-full max-w-screen-xl"
    >
      <h1 class="text-gray-800 font-bold mb-4 text-4xl">Cursos</h1>
      <div class="space-x-4 flex items-center">
        <div class="relative flex-1">
          <i
            class="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          ></i>
          <input
            type="search"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Pesquisar Curso..."
          />
        </div>
        <button
          class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          @click="toggleModal"
        >
          Adicionar Curso
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
        v-if="formacoesEstudante.length"
        class="space-y-6 max-w-screen-xl w-full"
      >
        <div
          v-for="formacao in formacoesEstudante"
          :key="formacao.id"
          class="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-semibold text-blue-600">
              {{ formacao.nome }}
            </h2>
            <div class="space-x-2">
              <button
                class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                @click="editarProjeto(formacao.id)"
              >
                Editar
              </button>
              <button
                class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                @click="deletarProjeto(formacao.id)"
              >
                Deletar
              </button>
            </div>
          </div>
          <div class="mt-2">
            <p class="text-gray-600">
              <strong>Universidade:</strong> {{ formacao.universidade }} /
              <span>{{ formacao.modalidade }}</span>
            </p>
            <p class="text-gray-600">
              <strong>Ano de Início:</strong> {{ formacao.anoInicio }}
            </p>
            <p class="text-gray-600">
              <strong>Ano de Conclusão:</strong> {{ formacao.anoConclusao }}
            </p>
            <p class="text-gray-600">
              <strong>Carga Horária:</strong> {{ formacao.ch }} horas
            </p>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-600 italic">
        Nenhuma formação encontrada.
      </div>
    </section>

    <Teleport to="#popUp">
      <div
        v-if="showModal"
        class="fixed inset-0 flex items-center justify-center z-500 bg-gray-800 bg-opacity-60"
      >
        <div
          class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4 sm:mx-auto z-100"
        >
          <h2 class="text-xl font-semibold mb-4">
            {{ isEditMode ? "Editar Curso" : "Novo Curso" }}
          </h2>

          <form @submit.prevent="handleSubmit">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="nome" class="block text-gray-700 font-medium mb-1"
                  >Nome:</label
                >
                <input
                  v-model="formFormacao.nome"
                  placeholder="Ex.: Nome do curso"
                  id="nome"
                  type="text"
                  class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label for="nome" class="block text-gray-700 font-medium mb-1"
                  >Universidade:</label
                >
                <input
                  v-model="formFormacao.universidade"
                  id="nome"
                  placeholder="Ex.: Campus"
                  type="text"
                  class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  for="anoInicio"
                  class="block text-gray-700 font-medium mb-1"
                >
                  Ano de Início:
                </label>
                <input
                  id="anoInicio"
                  type="date"
                  @input="(event) => formatarDateInicio(event.target.value)"
                  class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  for="anoConclusao"
                  class="block text-gray-700 font-medium mb-1"
                >
                  Ano de Conclusão:
                </label>
                <input
                  id="anoConclusao"
                  type="date"
                  @input="(event) => formatarDateConclusao(event.target.value)"
                  class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  for="modalidade"
                  class="block text-gray-700 font-medium mb-1"
                  >Modalidade:</label
                >
                <select
                  v-model="formFormacao.modalidade"
                  id="modalidade"
                  class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" selected hidden>Modalidade</option>
                  <option value="Presencial">Presencial</option>
                  <option value="Online">Online</option>
                  <option value="Hibrido">Híbrido</option>
                </select>
              </div>

              <div>
                <label for="ch" class="block text-gray-700 font-medium mb-1"
                  >Carga Horária:</label
                >
                <input
                  v-model.number="formFormacao.ch"
                  id="ch"
                  type="number"
                  class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div class="mt-4 flex justify-end space-x-2">
              <button
                type="submit"
                class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Enviar
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
    </Teleport>
  </main>
</template>

<script setup>
import axios from "axios";
import { reactive, ref, onMounted } from "vue";
import {
  isLoading,
  errorMessage,
  successMessage,
  isEditMode,
  showModal,
} from "../../utils/status.js";

import { formatDate } from "../../utils/dateFormatter";

const formacoesEstudante = ref([]);

const formFormacao = reactive({
  nome: "",
  universidade: "",
  modalidade: "",
  anoInicio: "",
  anoConclusao: "",
  ch: 0,
  estudanteId: 0,
});

const formatarDateInicio = (data) => {
  formFormacao.anoInicio = formatDate(data);
};

const formatarDateConclusao = (data) => {
  formFormacao.anoConclusao = formatDate(data);
};

const fetchEstudante = async () => {
  try {
    const { data } = await axios.get(`http://localhost:8080/estudante/${1}`);
    formFormacao.estudanteId = data.id;
    fetchFormacoes();
  } catch (error) {
    console.error("Estudante não encontrado na base de dados.", error);
  }
};

const fetchFormacoes = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/curso/estudante/${formFormacao.estudanteId}`
    );
    formacoesEstudante.value = data;
  } catch (error) {
    console.error("Erro ao buscar formações.", error);
  }
};

const handleSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = null;
  successMessage.value = null;

  try {
    if (isEditMode.value) {
      await axios.put(
        `http://localhost:8080/curso/${formFormacao.id}`,
        formFormacao
      );
      successMessage.value = "Formação atualizada com sucesso!";
    } else {
      await axios.post(`http://localhost:8080/curso`, formFormacao);
      successMessage.value = "Projeto criado com sucesso!";
    }
  } catch (error) {
    if (error.response) {
      errorMessage.value = `Erro: ${
        error.response.data.message ||
        "Ocorreu um erro ao enviar a Formação. Por favor, tente novamente."
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

const toggleModal = () => {
  showModal.value = !showModal.value;
  isEditMode.value = false;
};

const editarProjeto = async (idCurso) => {
  try {
    showModal.value = true;
    isEditMode.value = true;

    const { data } = await axios.get(`http://localhost:8080/curso/${idCurso}`);

    Object.assign(formFormacao, { ...data });
  } catch (error) {
    console.error("Erro ao buscar Formação:", error);

    errorMessage.value =
      "Erro ao buscar o Formação. Por favor, tente novamente.";

    showModal.value = false;
  }
};

const deletarProjeto = async (idCurso) => {
  try {
    await axios.delete(`http://localhost:8080/curso/${idCurso}`);
    fetchFormacoes();
  } catch (error) {
    console.error("Erro ao deletar curso.", error);
  }
};

const closeModal = () => {
  cleanForm();
  showModal.value = false;
  isEditMode.value = false;
};

const cleanForm = () => {
  Object.assign(formFormacao, {
    nome: "",
    universidade: "",
    modalidade: "",
    anoInicio: "",
    anoConclusao: "",
    ch: 0,
    estudanteId: 0,
  });

  successMessage.value = null;
};

onMounted(fetchEstudante);
</script>
