<template>
  <main class="bg-gray-100 py-6 flex flex-col items-center justify-center min-h-screen">
    <div class="flex flex-wrap items-center justify-between px-6 space-x-4 pb-6 w-full max-w-screen-xl">
      <h1 class="text-gray-800 font-bold mb-4 text-4xl">Projetos</h1>
      <div class="space-x-4 flex items-center">
        <div class="relative flex-1">
          <i class="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
          <input
            type="search"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Pesquisar Projeto..."
            v-model="searchQuery"
          />
        </div>
        <button
          class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          @click="$emit('addNovoProjeto')"
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
    </div>
    <div class="space-y-6 px-6 max-w-screen-xl w-full">
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-semibold text-blue-600">{{ project.nome }}</h2>
          <div class="space-x-2">
            <button
              class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              @click="editProject(project.id)"
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
        <p class="text-gray-700 mt-2">{{ project.descricao }}</p>
        <p class="text-gray-600 mt-1">
          <strong>Ano de Início:</strong> {{ formatDate(project.anoInicio) }}
        </p>
        <p class="text-gray-600 mt-1">
          <strong>Ano de Conclusão:</strong> {{ formatDate(project.anoConclusao) }}
        </p>
        <p class="text-gray-600 mt-1">
          <strong>Cidade Atual:</strong> {{ project.cidadeAtual }}
        </p>
        <div class="mt-4">
          <h3 class="text-lg font-medium text-gray-800">Participações</h3>
          <ul class="list-disc list-inside mt-2">
            <li
              v-for="participant in project.participacoes"
              :key="participant.id"
              class="text-gray-600"
            >
              {{ participant.nome }} ({{ participant.papel }})
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import axios from "axios";

// Define reatividade
const searchQuery = ref("");
const projects = ref([]);

// Função para obter projetos
const getProjetos = async () => {
  try {
    const res = await axios.get("http://localhost:8080/projeto");
    projects.value = res.data;
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
  }
};

// Computed para filtrar projetos
const filteredProjects = computed(() => {
  return projects.value.filter((project) =>
    project.nome.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const formatDate = (date) => {
  if (!date) return "Não definido";
  return new Date(date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
  });
};

const editProject = (id) => {
  console.log("Editar projeto com ID:", id);
};

const deleteProject = async(id) => {
  const res = await axios.delete(`http://localhost:8080/projeto/${id}`)
  window.location.reload()
  console.log(`Projeto ${res.status} deletado com Sucesso.`)
};

onMounted(getProjetos);
</script>
