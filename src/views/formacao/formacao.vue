<template>
  <main class="bg-gray-100 py-6 flex flex-col items-center min-h-screen">
    <div
      class="flex flex-wrap items-center justify-between px-4 space-x-3 pb-4 w-full max-w-screen-xl"
    >
      <h1 class="text-gray-800 font-bold mb-4 text-4xl">Formação</h1>
      <div class="space-x-3 flex items-center">
        <div class="relative flex-1">
          <i
            class="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          ></i>
          <input
            type="search"
            class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Pesquisar Curso..."
            v-model="searchQuery"
          />
        </div>
        <router-link to="/">
          <button
            class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Home
          </button>
        </router-link>
      </div>
    </div>
    <div class="space-y-6 max-w-screen-xl w-full px-4">
      <div
        v-for="project in formacaoEstudante"
        :key="project.id"
        class="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-semibold text-blue-600">
            {{ project.nome }}
          </h2>

          <div class="space-x-2">
            <button
              class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              @click="$emit('editProject', project.id)"
            >
              Editar
            </button>
            <button
              class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              @click="deleteProject(project.id)"
            >
              Deletar
            </button>
          </div>
        </div>
        <p class="text-gray-700 mt-2">
          <strong>Modalidade:</strong> {{ project.modalidade }}
        </p>
        <p class="text-gray-600 mt-1">
          <strong>Ano de Início:</strong> {{ formatDate(project.anoInicio) }}
        </p>
        <p class="text-gray-600 mt-1">
          <strong>Ano de Conclusão:</strong>
          {{ formatDate(project.anoConclusao) }}
        </p>
        <p class="text-gray-600 mt-1">
          <strong>Carga Horária:</strong> {{ project.ch }} horas
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const formacaoEstudante = ref([]);

const getFormacao = async () => {
  const res = await axios.get("http://localhost:8080/curso");
  formacaoEstudante.value = res.data;
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "long",
  }).format(date);
};

onMounted(() => {
  getFormacao();
});
</script>
