<template>
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
            {{ props.isEditMode ? "Editar Projeto" : "Novo do Projeto" }}
          </h2>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label for="nome" class="block text-sm font-medium text-gray-700">
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
</template>
<script setup>
import { ref, reactive, defineProps, defineEmits, onMounted } from "vue";
import axios from "axios";

const isLoading = ref(false);
const errorMessage = ref(null);
const successMessage = ref(null);

const emit = defineEmits(["close-modal"]);
const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
  isEditMode: {
    type: Boolean,
    required: true,
  },
});

const formProjeto = reactive({
  nome: "",
  descricao: "",
  anoInicio: "25/10/2001",
  anoConclusao: "15/07/2014",
  cidadeAtual: "",
  estudanteId: 0,
});

const fetchEstudante = async () => {
  try {
    const { data } = await axios.get(`http://localhost:8080/estudante/1`);
    formProjeto.estudanteId = data.id;
  } catch (error) {
    console.error("Estudante não encontrado na base de Dados.", error);
  }
};

const handleSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = null;
  successMessage.value = null;

  try {
    if (props.isEditMode) {
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
    }, 2000);
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

const closeModal = () => {
  emit("close-modal");
  cleanForm();
};

onMounted(() => {
  fetchEstudante();
});
</script>

<style lang="scss" scoped></style>
