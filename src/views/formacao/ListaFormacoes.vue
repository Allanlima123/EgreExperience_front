<template>
  <main class="bg-gray-100 py-6 flex items-center flex-col min-h-screen">
    <FormFormacao
      :showModal="showModal"
      :isEditMode="isEditMode"
      @close-modal="toggleModal"
    />

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
                @click="deleteProject(formacao.id)"
              >
                Deletar
              </button>
            </div>
          </div>
          <div class="mt-2">
            <p class="text-gray-700">
              <strong>Modalidade:</strong> {{ formacao.modalidade }}
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
  </main>
</template>

<script setup>
import FormFormacao from "./FormFormacao.vue";
import { onMounted, ref } from "vue";
import axios from "axios";

const isEditMode = ref(false);
const showModal = ref(false);
const formacoesEstudante = ref([]);
const estudanteId = ref(0);

const fetchEstudante = async () => {
  try {
    const { data } = await axios.get(`http://localhost:8080/estudante/${1}`);
    estudanteId.value = data.id;
    fetchFormacoes();
  } catch (error) {
    console.error("Estudante não encontrado na base de dados.", error);
  }
};

const fetchFormacoes = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/curso/estudante/${estudanteId.value}`
    );
    formacoesEstudante.value = data;
  } catch (error) {
    console.error("Erro ao buscar formações.", error);
  }
};

const toggleModal = () => {
  showModal.value = !showModal.value;
  isEditMode.value = false;
};

const editarProjeto = async (idProjeto) => {
  try {
    showModal.value = true;
    isEditMode.value = true;

    console.log("Modo Editar")

  } catch (error) {
    console.error("Erro ao buscar projeto:", error);

    errorMessage.value =
      "Erro ao buscar o projeto. Por favor, tente novamente.";

    showModal.value = false;
  }
};

const deleteProject = async (id) => {
  try {
    await axios.delete(`http://localhost:8080/curso/${id}`);
    fetchFormacoes();
  } catch (error) {
    console.error("Erro ao deletar curso.", error);
  }
};

onMounted(() => {
  fetchEstudante();
});
</script>
