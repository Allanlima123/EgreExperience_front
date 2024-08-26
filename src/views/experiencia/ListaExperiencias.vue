<template>
  <main class="bg-gray-100 py-8 flex items-center flex-col min-h-screen">
    <section
      class="flex flex-col md:flex-row items-center justify-between px-6 space-y-4 md:space-y-0 pb-6 w-full max-w-screen-xl"
    >
      <h1 class="text-gray-800 font-bold text-4xl">Experiência</h1>
      <div class="flex items-center space-x-4">
        <div class="relative w-full md:w-auto">
          <i
            class="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          ></i>
          <input
            type="search"
            class="w-full md:w-72 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Pesquisar Experiência..."
          />
        </div>

        <button
          class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          @click="toggleModal"
        >
          Adicionar Experiência
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
      <div v-if="experiencias.length" class="space-y-6 max-w-screen-xl w-full">
        <div
          v-for="experiencia in experiencias"
          :key="experiencia.id"
          class="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div
            class="flex flex-col md:flex-row items-start md:items-center justify-between"
          >
            <h2 class="text-2xl font-semibold text-blue-600">
              {{ experiencia.empresa }}
            </h2>
            <div class="space-x-2 mt-4 md:mt-0">
              <button
                class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                @click="editarExperiencia(experiencia.id)"
              >
                Editar
              </button>
              <button
                class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                @click="deletarExperiencia(experiencia.id)"
              >
                Deletar
              </button>
            </div>
          </div>
          <div class="mt-4 text-gray-700">
            <p><strong>Remoto:</strong> {{ remoteStatus(experiencia) }}</p>
            <p><strong>Cargo:</strong> {{ experiencia.cargo }}</p>
            <p><strong>Tempo:</strong> {{ experiencia.tempo }}</p>
            <p>
              <strong>Descrição Profissional:</strong>
              {{ experiencia.descricaoProficional }}
            </p>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-600 italic">
        Nenhuma experiência encontrada.
      </div>
    </section>

    <Teleport to="#popUp">
      <div
        v-if="showModal"
        class="fixed inset-0 flex items-center justify-center z-500 bg-gray-800 bg-opacity-60"
      >
        <div class="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
          <h2 class="text-xl font-semibold mb-4">
            {{ isEditMode ? "Editar Experiência" : "Novo Experiência" }}
          </h2>

          <form @submit.prevent="handleSubmit">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  for="empresa"
                  class="block text-gray-700 font-medium mb-2"
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
                <label class="block text-gray-700 font-medium mb-2"
                  >Remoto</label
                >
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
  </main>
</template>
<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import axios from "axios";

const isEditMode = ref(false);
const showModal = ref(false);
const experiencias = ref([]);
const isLoading = ref(false);
const errorMessage = ref(null);
const successMessage = ref(null);

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
    await fetchExperiencias();
  } catch (error) {
    console.error("Estudante não encontrado na base de Dados.", error);
  }
};

const fetchExperiencias = async () => {
  if (!formExperiencia.estudanteId) return;

  try {
    const { data } = await axios.get(
      `http://localhost:8080/emprego/estudante/${formExperiencia.estudanteId}`
    );
    experiencias.value = data;
  } catch (error) {
    console.error("Erro ao buscar experiências:", error);
  }
};

const remoteStatus = computed(() => {
  return (experiencia) => (experiencia.remoto ? "Sim" : "Não");
});

const toggleModal = () => {
  showModal.value = !showModal.value;
  isEditMode.value = false;
};

const handleSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = null;
  successMessage.value = null;

  try {
    if (isEditMode.value) {
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

const editarExperiencia = async (idExperiencia) => {
  try {
    showModal.value = true;
    isEditMode.value = true;

    const { data } = await axios.get(
      `http://localhost:8080/emprego/${idExperiencia}`
    );

    Object.assign(formExperiencia, { ...data });
  } catch (error) {
    console.error("Erro ao buscar Formação:", error);

    errorMessage.value =
      "Erro ao buscar o Formação. Por favor, tente novamente.";

    showModal.value = false;
  }
};

const deletarExperiencia = async (idExperiencia) => {
  try {
    await axios.delete(`http://localhost:8080/emprego/${idExperiencia}`);
    fetchExperiencias();
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

onMounted(fetchEstudante);
</script>
