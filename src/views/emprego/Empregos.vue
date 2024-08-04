<template>
  <main
    class="bg-gray-100 py-6 flex flex-col items-center justify-center min-h-screen"
  >
    <div
      class="flex flex-wrap items-center justify-between px-4 space-x-3 pb-4 w-full max-w-screen-xl"
    >
      <h1 class="text-gray-800 font-bold mb-4 text-4xl">Projetos</h1>
      <div class="space-x-3 flex items-center">
        <div class="relative flex-1">
          <i
            class="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          ></i>
          <input
            type="search"
            class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Pesquisar Projeto..."
            v-model="searchQuery"
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
    <div class="space-y-6 max-w-screen-xl w-full px-4">
      <div
        v-for="experience in experiences"
        :key="experience.id"
        class="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-semibold text-blue-600">
            {{ experience.empresa }}
          </h2>
          <span
            :class="
              experience.remoto
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            "
            class="py-1 px-3 rounded-full text-sm font-medium"
          >
            {{ experience.remoto ? "Remoto" : "Presencial" }}
          </span>
        </div>
        <div class="mb-4">
          <p class="text-gray-700 text-lg font-semibold">
            <strong>Cargo:</strong> {{ experience.cargo }}
          </p>
          <p class="text-gray-600">
            <strong>Tempo:</strong> {{ experience.tempo }}
          </p>
        </div>
        <p class="text-gray-700 mt-2">
          <strong>Descrição:</strong> {{ experience.descricaoProficional }}
        </p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      experiences: [
        {
          id: 1,
          empresa: "Empresa A",
          remoto: true,
          cargo: "Desenvolvedor",
          tempo: "Jan 2022 - Dez 2023",
          descricaoProficional:
            "Trabalhei no desenvolvimento de aplicações web e APIs RESTful, utilizando tecnologias modernas como Vue.js e Node.js.",
        },
        {
          id: 2,
          empresa: "Empresa B",
          remoto: false,
          cargo: "Analista de Sistemas",
          tempo: "Mar 2020 - Dez 2021",
          descricaoProficional:
            "Responsável por análise e documentação de requisitos, além de suporte técnico para a equipe de desenvolvimento.",
        },
        {
          id: 3,
          empresa: "Empresa C",
          remoto: true,
          cargo: "Engenheiro de Software",
          tempo: "Fev 2019 - Fev 2020",
          descricaoProficional:
            "Desenvolvimento de soluções de software personalizadas para clientes, com foco em otimização de processos e integração de sistemas.",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Personalize o estilo dos cards se necessário */
.card {
  transition: transform 0.3s ease;
}
.card:hover {
  transform: scale(1.02);
}
</style>
