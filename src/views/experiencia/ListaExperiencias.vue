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

    <FormExperiencia
      :showModal="showModal"
      :isEditMode="isEditMode"
      @close-modal="toggleModal"
    />

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
                @click="editarProjeto(experiencia.id)"
              >
                Editar
              </button>
              <button
                class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                @click="deleteProject(experiencia.id)"
              >
                Deletar
              </button>
            </div>
          </div>
          <div class="mt-4 text-gray-700">
            <p><strong>Remoto:</strong> {{ remoteStatus(experiencia) }} </p>
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
  </main>
</template>
<script setup>
import FormExperiencia from "./FormExperiencia.vue";
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const isEditMode = ref(false);
const showModal = ref(false);
const experiencias = ref([]);
const estudanteId = ref(null);

const fetchEstudante = async () => {
  try {
    const { data } = await axios.get(`http://localhost:8080/estudante/${1}`);
    estudanteId.value = data.id;
    await fetchExperiencias();
  } catch (error) {
    console.error("Erro ao buscar estudante:", error);
  }
};

const fetchExperiencias = async () => {
  if (!estudanteId.value) return;
  try {
    const { data } = await axios.get(
      `http://localhost:8080/emprego/estudante/${estudanteId.value}`
    );
    experiencias.value = data;
  } catch (error) {
    console.error("Erro ao buscar experiências:", error);
  }
};

const remoteStatus = computed(() => {
  return (experiencia) => experiencia.remoto ? 'Sim' : 'Não';
});

const toggleModal = () => {
  showModal.value = !showModal.value;
  isEditMode.value = false;
};

onMounted(fetchEstudante);
</script>
