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
          class="box_card rounded-lg shadow-lg bg-white hover:scale-105 transition-transform duration-300"
        >
          <img
            class="w-36 h-36 object-cover rounded-full mt-2 m-auto"
            src="../../assets/images/avatar-5.jpg"
            :alt="`Imagem de ${egresso.nome}`"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl">{{ egresso.nome }}</div>
            <p class="text-gray-700 text-base mt-2">
              {{ egresso.descricao }}
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span
              v-for="habilidade in egresso.habilidades"
              :key="habilidade"
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"
            >
              {{ habilidade }}
            </span>
          </div>
          <router-link to="/perfil">
            <div class="px-6 pb-4 bottom-2">
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
    descricao: "Engenheiro de Software com 5 anos de experiência em desenvolvimento web.",
    habilidades: ["JavaScript", "Vue.js", "Node.js", "SQL"],
    area: "Tecnologia da Informação"
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    img: "../../assets/images/avatar-5.jpg",
    descricao: "Desenvolvedora Front-end especialista em React e design de interfaces.",
    habilidades: ["HTML", "CSS", "React", "UI/UX"],
    area: "Tecnologia da Informação"
  },
  {
    id: 3,
    nome: "Carlos Souza",
    img: "../../assets/images/avatar-5.jpg",
    descricao: "Engenheiro de Dados com expertise em Python e análise de grandes volumes de dados.",
    habilidades: ["Python", "SQL", "Big Data", "Machine Learning"],
    area: "Tecnologia da Informação"
  },
  {
    id: 4,
    nome: "Ana Lima",
    img: "../../assets/images/avatar-5.jpg",
    descricao: "Desenvolvedora Full Stack com foco em tecnologias de ponta e boas práticas.",
    habilidades: ["JavaScript", "Angular", "Node.js", "Docker"],
    area: "Tecnologia da Informação"
  },
  {
    id: 5,
    nome: "Paulo Ferreira",
    img: "../../assets/images/avatar-5.jpg",
    descricao: "Médico cardiologista com 10 anos de experiência em clínicas e hospitais.",
    habilidades: ["Cardiologia", "Eletrocardiograma", "Cuidados Intensivos"],
    area: "Saúde"
  },
  {
    id: 6,
    nome: "Juliana Santos",
    img: "../../assets/images/avatar-5.jpg",
    descricao: "Professora de Matemática com 15 anos de experiência no ensino médio.",
    habilidades: ["Didática", "Álgebra", "Geometria", "Cálculo"],
    area: "Educação"
  },
  {
    id: 7,
    nome: "Ricardo Gomes",
    img: "../../assets/images/avatar-5.jpg",
    descricao: "Engenheiro Civil especializado em construção de pontes e estradas.",
    habilidades: ["AutoCAD", "Construção Civil", "Gestão de Projetos"],
    area: "Engenharia"
  },
  {
    id: 8,
    nome: "Fernanda Rodrigues",
    img: "../../assets/images/avatar-5.jpg",
    descricao: "Nutricionista com foco em nutrição esportiva e reeducação alimentar.",
    habilidades: ["Nutrição", "Dieta Esportiva", "Reeducação Alimentar"],
    area: "Saúde"
  },
  {
    id: 9,
    nome: "Lucas Almeida",
    img: "../../assets/images/avatar-5.jpg",
    descricao: "Advogado com especialização em direito empresarial e tributário.",
    habilidades: ["Direito Empresarial", "Tributário", "Contratos"],
    area: "Direito"
  },
  {
    id: 10,
    nome: "Patrícia Lima",
    img: "../../assets/images/avatar-5.jpg",
    descricao: "Psicóloga com experiência em terapia cognitivo-comportamental.",
    habilidades: ["Terapia Cognitivo-Comportamental", "Aconselhamento", "Psicologia Clínica"],
    area: "Saúde"
  }
];

</script>

<style scoped>
.box_card {
  width: 294px;
}
</style>
