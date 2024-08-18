<template>
  <Teleport to="#popUp">
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center z-500 bg-gray-800 bg-opacity-60"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4 sm:mx-auto z-100"
      >
        <h2 class="text-xl font-semibold mb-4">
          {{ props.isEditMode ? "Editar Curso" : "Novo Curso" }}
        </h2>

        <form @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="nome" class="block text-gray-700 font-medium mb-1"
                >Nome:</label
              >
              <input
                v-model="formFormacao.nome"
                id="nome"
                type="text"
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
              <label
                for="anoInicio"
                class="block text-gray-700 font-medium mb-1"
                >Ano de Início:</label
              >
              <input
                id="anoInicio"
                type="date"
                class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                for="anoConclusao"
                class="block text-gray-700 font-medium mb-1"
                >Ano de Conclusão:</label
              >
              <input
                id="anoConclusao"
                type="date"
                class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
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
</template>

<script setup>
import axios from "axios";
import { reactive, ref, defineProps, defineEmits, onMounted } from "vue";

const isLoading = ref(false);
const errorMessage = ref(null);
const successMessage = ref(null);
const formacoesEstudante = ref([]);

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

const formFormacao = reactive({
  nome: "",
  modalidade: "",
  anoInicio: "2021/02/01",
  anoConclusao: "2024/12/15",
  ch: 0,
  estudanteId: 0,
});

const fetchEstudante = async () => {
  try {
    const { data } = await axios.get(`http://localhost:8080/estudante/${1}`);
    formFormacao.estudanteId = data.id
  } catch (error) {
    console.error("Estudante não encontrado na base de dados.", error);
  }
};

const handleSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = null;
  successMessage.value = null;

  try {
    if (props.isEditMode) {
      console.log("Metodo PUT")
      await axios.put(
        `http://localhost:8080/curso/${formFormacao.estudanteId}`,
        formFormacao
      );
      successMessage.value = "Formação atualizada com sucesso!";
    } else {
      console.log("Metodo POST")
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

const cleanForm = () => {
  Object.assign(formFormacao, {
    nome: "",
    modalidade: "",
    anoInicio: "",
    anoConclusao: "",
    ch: 0,
    estudanteId: 0,
  });

  successMessage.value = null;
};

const closeModal = () => {
  emit("close-modal");
  cleanForm();
};

onMounted(fetchEstudante)
</script>

<style scoped></style>
