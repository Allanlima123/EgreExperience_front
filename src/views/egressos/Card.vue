<template>
  <div class="bg-gray-300 py-4 items-center justify-center flex flex-col">
    <div
      class="flex flex-wrap items-center justify-between px-4 space-x-3 pb-4 w-full max-w-screen-xl"
    >
      <h1 class="text-gray-800 font-bold mb-4 text-4xl">Egressos</h1>
      <div class="space-x-3 flex items-center">
        <div class="relative flex-1">
          <i
            class="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          ></i>
          <input
            type="search"
            class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Pesquisar..."
          />
        </div>
        <router-link to="/">
          <button
            class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Voltar para Home
          </button>
        </router-link>
      </div>
    </div>

    <div class="flex-grow py-4">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full flex-col max-w-screen-xl w-full"
      >
        <div
          v-for="egresso in egressos"
          :key="egresso.id"
          class="box_card rounded-lg shadow-lg bg-white"
        >
          <img
            class="w-36 h-36 object-cover rounded-full mt-2 m-auto"
            src="../../assets/images/avatar-5.jpg"
            :alt="`Imagem de ${egresso.nome}`"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{ egresso.nome }}</div>
            <p class="text-gray-700 text-base">
              {{ egresso.descricao }}
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span
              v-for="habilidade in egresso.habilidades"
              :key="habilidade"
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {{ habilidade }}
            </span>
          </div>
          <router-link to="/perfil">
            <div class="px-6 pb-4">
              <a
                :href="egresso.perfilLink"
                class="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold cursor-pointer"
              >
                Ver Perfil
              </a>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const egressos = [
  {
    id: 1,
    nome: "João Silva",
    img: "../../assets/images/avatar-5.jpg",
    descricao:
      "Engenheiro de Software com 5 anos de experiência em desenvolvimento web.",
    habilidades: ["JavaScript", "Vue.js", "Node.js", "SQL"],
  },
  {
    id: 1,
    nome: "João Silva",
    img: "../../assets/images/avatar-5.jpg",
    descricao:
      "Engenheiro de Software com 5 anos de experiência em desenvolvimento web.",
    habilidades: ["JavaScript", "Vue.js", "Node.js", "SQL"],
  },
  {
    id: 1,
    nome: "João Silva",
    img: "../../assets/images/avatar-5.jpg",
    descricao:
      "Engenheiro de Software com 5 anos de experiência em desenvolvimento web.",
    habilidades: ["JavaScript", "Vue.js", "Node.js", "SQL"],
  },
  {
    id: 1,
    nome: "João Silva",
    img: "../../assets/images/avatar-5.jpg",
    descricao:
      "Engenheiro de Software com 5 anos de experiência em desenvolvimento web.",
    habilidades: ["JavaScript", "Vue.js", "Node.js", "SQL"],
  },
  {
    id: 1,
    nome: "João Silva",
    img: "../../assets/images/avatar-5.jpg",
    descricao:
      "Engenheiro de Software com 5 anos de experiência em desenvolvimento web.",
    habilidades: ["JavaScript", "Vue.js", "Node.js", "SQL"],
  },
  {
    id: 1,
    nome: "João Silva",
    img: "../../assets/images/avatar-5.jpg",
    descricao:
      "Engenheiro de Software com 5 anos de experiência em desenvolvimento web.",
    habilidades: ["JavaScript", "Vue.js", "Node.js", "SQL"],
  },
  {
    id: 1,
    nome: "João Silva",
    img: "../../assets/images/avatar-5.jpg",
    descricao:
      "Engenheiro de Software com 5 anos de experiência em desenvolvimento web.",
    habilidades: ["JavaScript", "Vue.js", "Node.js", "SQL"],
  },
  {
    id: 1,
    nome: "João Silva",
    img: "../../assets/images/avatar-5.jpg",
    descricao:
      "Engenheiro de Software com 5 anos de experiência em desenvolvimento web.",
    habilidades: ["JavaScript", "Vue.js", "Node.js", "SQL"],
  },
  {
    id: 1,
    nome: "João Silva",
    img: "../../assets/images/avatar-5.jpg",
    descricao:
      "Engenheiro de Software com 5 anos de experiência em desenvolvimento web.",
    habilidades: ["JavaScript", "Vue.js", "Node.js", "SQL"],
  },
  {
    id: 1,
    nome: "João Silva",
    img: "../../assets/images/avatar-5.jpg",
    descricao:
      "Engenheiro de Software com 5 anos de experiência em desenvolvimento web.",
    habilidades: ["JavaScript", "Vue.js", "Node.js", "SQL"],
  },

  {
    id: 1,
    nome: "João Silva",
    img: "../../assets/images/avatar-5.jpg",
    descricao:
      "Engenheiro de Software com 5 anos de experiência em desenvolvimento web.",
    habilidades: ["JavaScript", "Vue.js", "Node.js", "SQL"],
  },
  {
    id: 1,
    nome: "João Silva",
    img: "../../assets/images/avatar-5.jpg",
    descricao:
      "Engenheiro de Software com 5 anos de experiência em desenvolvimento web.",
    habilidades: ["JavaScript", "Vue.js", "Node.js", "SQL"],
  },
  {
    id: 1,
    nome: "João Silva",
    img: "../../assets/images/avatar-5.jpg",
    descricao:
      "Engenheiro de Software com 5 anos de experiência em desenvolvimento web.",
    habilidades: ["JavaScript", "Vue.js", "Node.js", "SQL"],
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    img: "../../assets/images/avatar-5.jpg",
    descricao:
      "Desenvolvedora Front-end especialista em React e design de interfaces.",
    habilidades: ["HTML", "CSS", "React", "UI/UX"],
  },
  {
    id: 3,
    nome: "Carlos Souza",
    img: "../../assets/images/avatar-5.jpg",
    descricao:
      "Engenheiro de Dados com expertise em Python e análise de grandes volumes de dados.",
    habilidades: ["Python", "SQL", "Big Data", "Machine Learning"],
  },
  {
    id: 4,
    nome: "Ana Lima",
    img: "../../assets/images/avatar-5.jpg",
    descricao:
      "Desenvolvedora Full Stack com foco em tecnologias de ponta e boas práticas.",
    habilidades: ["JavaScript", "Angular", "Node.js", "Docker"],
  },
];
</script>

<style scoped>
.box_card {
  width: 294px;
}
</style>
