<template>
  <div class="min-h-screen flex flex-col">
    <Teleport to="#popUp">
      <transition name="fade">
        <div
          v-if="isVisible"
          class="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-60"
        >
          <div
            class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4 sm:mx-auto z-10"
          >
            <h2 class="text-xl font-semibold mb-4">
              {{ isEditMode ? "Editar Projeto" : "Informações do Projeto" }}
            </h2>
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <!-- Formulário do Projeto -->
              <div>
                <label
                  for="nome"
                  class="block text-sm font-medium text-gray-700"
                >
                  Nome do Projeto
                </label>
                <input
                  v-model="form.nome"
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
                  v-model="form.descricao"
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
                    v-model="form.anoInicio"
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
                    v-model="form.anoConclusao"
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
                  v-model="form.cidadeAtual"
                  type="text"
                  id="cidadeAtual"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Deseja incluir participações no projeto?
                </label>
                <div class="mt-2 flex items-center">
                  <input
                    v-model="form.incluirParticipacoes"
                    type="checkbox"
                    id="participacoes"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label for="participacoes" class="ml-2 text-sm text-gray-600">
                    Sim, quero incluir.
                  </label>
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
                  @click="closePopUp"
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

    <HeaderMain class="bg-gray-800 p-4 flex justify-center">
      <div
        class="flex items-center justify-between max-w-screen-xl w-full px-4"
      >
        <div class="flex items-center space-x-2 text-white">
          <i class="fa fa-university text-2xl"></i>
          <span class="font-medium text-2xl">EgreExperience</span>
        </div>
        <button
          class="text-white font-medium flex items-center space-x-1 hover:text-gray-400"
        >
          <span>Logout</span>
          <i class="fa fa-sign-out"></i>
        </button>
      </div>
    </HeaderMain>

    <Projetos @add-novo-projeto="novoProjeto" @edit-project="editarProjeto" />

    <FooterMain class="bg-gray-800 p-4 flex justify-center">
      <div
        class="flex items-center justify-between max-w-screen-xl w-full px-6"
      >
        <div>
          <address class="text-white text-sm font-normal">
            Contato:
            <a href="mailto:silva12@gmail.com" class="underline"
              >silva12@gmail.com</a
            >
          </address>
          <address class="text-white text-sm font-normal">
            Linkedin:
            <a
              href="https://linkedin.com/info"
              class="underline"
              target="_blank"
              >linkedin.com/info</a
            >
          </address>
        </div>

        <div class="space-x-3">
          <a href="mailto:silva12@gmail.com" class="text-white text-lg">
            <i class="fa fa-envelope"></i>
          </a>
          <a href="tel:+123456789" class="text-white text-lg">
            <i class="fa fa-phone"></i>
          </a>
        </div>
      </div>
    </FooterMain>
  </div>
</template>

<script setup>
import Projetos from "./Projetos.vue";
import FooterMain from "../../components/FooterMain";
import HeaderMain from "../../components/HeaderMain";
import { ref } from "vue";
import axios from "axios";

const isVisible = ref(false);
const isEditMode = ref(false);
const form = ref({
  id: null,
  nome: "",
  descricao: "",
  anoInicio: "",
  anoConclusao: "",
  cidadeAtual: "",
  incluirParticipacoes: false,
});

const isLoading = ref(false);
const errorMessage = ref(null);
const successMessage = ref(null);

const novoProjeto = () => {
  isVisible.value = true;
  isEditMode.value = false;
  cleanForm();
};

const closePopUp = () => {
  isVisible.value = false;
};

const handleSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = null;
  successMessage.value = null;

  try {
    if (isEditMode.value) {
      await axios.put(
        `http://localhost:8080/projeto/${form.value.id}`,
        form.value
      );
      successMessage.value = "Projeto atualizado com sucesso!";
    } else {
      await axios.post("http://localhost:8080/projeto", form.value);
      successMessage.value = "Projeto criado com sucesso!";
    }
  } catch (error) {
    errorMessage.value =
      "Ocorreu um erro ao enviar o projeto. Por favor, tente novamente.";
  } finally {
    isLoading.value = false;
    setTimeout(() => {
      closePopUp();
      cleanForm();
      window.location.reload();
    }, 2000);
  }
};

const editarProjeto = async (idProjeto) => {
  isVisible.value = true;
  isEditMode.value = true;
  try {
    const response = await axios.get(
      `http://localhost:8080/projeto/${idProjeto}`
    );
    form.value = { ...response.data, id: idProjeto };
  } catch (error) {
    console.error("Erro ao buscar projeto:", error);
  }
};

const cleanForm = () => {
  form.value = {
    id: null,
    nome: "",
    descricao: "",
    anoInicio: "",
    anoConclusao: "",
    cidadeAtual: "",
    incluirParticipacoes: false,
  };

  successMessage.value = null;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
