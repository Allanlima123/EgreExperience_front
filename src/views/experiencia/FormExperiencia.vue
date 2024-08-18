<template>
  <Teleport to="#popUp">
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center z-500 bg-gray-800 bg-opacity-60"
    >
      <div class="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 class="text-xl font-semibold mb-4">
          {{ false ? "Editar Experiência" : "Novo Experiência" }}
        </h2>

        <form @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="empresa" class="block text-gray-700 font-medium mb-2"
                >Empresa</label
              >
              <input
                type="text"
                id="empresa"
                v-model="formExperiencia.empresa"
                placeholder="Digite o nome da empresa"
                class="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label for="cargo" class="block text-gray-700 font-medium mb-2"
                >Cargo</label
              >
              <input
                type="text"
                id="cargo"
                v-model="formExperiencia.cargo"
                placeholder="Digite o cargo"
                class="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label for="tempo" class="block text-gray-700 font-medium mb-2"
                >Tempo</label
              >
              <input
                type="text"
                id="tempo"
                placeholder="Ex.: 2 Anos"
                v-model="formExperiencia.tempo"
                class="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-gray-700 font-medium mb-2">Remoto</label>
              <div class="flex items-center space-x-4">
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    v-model="formExperiencia.remoto"
                    value="true"
                    class="form-radio text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span class="ml-2">Sim</span>
                </label>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    v-model="formExperiencia.remoto"
                    value="false"
                    class="form-radio text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span class="ml-2">Não</span>
                </label>
              </div>
            </div>
          </div>

          <div class="my-2">
            <label
              for="descricaoProficional"
              class="block text-gray-700 font-medium mb-2"
              >Descrição Profissional</label
            >
            <textarea
              id="descricaoProficional"
              v-model="formExperiencia.descricaoProficional"
              placeholder="Descreva as atividades desempenhadas"
              class="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Enviar
            </button>
            <button
              type="button"
              class="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
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

const formExperiencia = reactive({
  empresa: "",
  remoto: "",
  cargo: "",
  tempo: "",
  descricaoProficional: "",
  estudanteId: 0,
});

const fetchEstudante = async () => {
  try {
    const { data } = await axios.get(`http://localhost:8080/estudante/${1}`);
    formExperiencia.estudanteId = data.id;
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
        `http://localhost:8080/emprego/${formExperiencia.id}`,
        formExperiencia
      );
      successMessage.value = "Experiência atualizado com sucesso!";
    } else {
      await axios.post(`http://localhost:8080/emprego`, formExperiencia);
      successMessage.value = "Experiência criada com sucesso!";
    }
  } catch (error) {
    if (error.response) {
      errorMessage.value = `Erro: ${
        error.response.data.message ||
        "Ocorreu um erro ao enviar a experiência. Por favor, tente novamente."
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
  Object.assign(formExperiencia, {
    empresa: "",
    remoto: "",
    cargo: "",
    tempo: "",
    descricaoProficional: "",
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
