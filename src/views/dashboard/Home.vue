<template>
  <div class="bg-gray-300 w-screen">
    
    <div
      v-if="isVisible"
      class="fixed inset-0 flex items-center justify-center z-50"
    >
      <div
        class="fixed inset-0 bg-gray-600 opacity-50"
        @click="closePopup"
      ></div>
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto z-10">
        <h2 class="text-xl font-semibold mb-4">Informações do Projeto</h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Nome do Projeto -->
          <div class="mb-4">
            <label for="nome" class="block text-sm font-medium text-gray-700"
              >Nome do Projeto</label
            >
            <input
              v-model="form.nome"
              type="text"
              id="nome"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <!-- Descrição do Projeto -->
          <div class="mb-4">
            <label
              for="descricao"
              class="block text-sm font-medium text-gray-700"
              >Descrição</label
            >
            <textarea
              v-model="form.descricao"
              id="descricao"
              rows="4"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></textarea>
          </div>

          <!-- Ano de Início -->
          <div class="mb-4">
            <label
              for="anoInicio"
              class="block text-sm font-medium text-gray-700"
              >Ano de Início</label
            >
            <input
              v-model="form.anoInicio"
              type="date"
              id="anoInicio"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <!-- Ano de Conclusão -->
          <div class="mb-4">
            <label
              for="anoConclusao"
              class="block text-sm font-medium text-gray-700"
              >Ano de Conclusão</label
            >
            <input
              v-model="form.anoConclusao"
              type="date"
              id="anoConclusao"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <!-- Cidade Atual -->
          <div class="mb-4">
            <label
              for="cidadeAtual"
              class="block text-sm font-medium text-gray-700"
              >Cidade Atual</label
            >
            <input
              v-model="form.cidadeAtual"
              type="text"
              id="cidadeAtual"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <!-- Botão de Enviar -->
          <div>
            <button
              type="submit"
              class="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="flex gap-4">
      <NavBar />

      <div class="w-full flex flex-col h-screen overflow-y-scroll relative">
        <header
          class="bg-gray-800 w-full text-white p-6 flex justify-between items-center rounded-tl-md rounded-bl-md"
        >
          <div>
            <h1 class="text-xl font-bold">Bem-vindos ao Portal de Egressos</h1>
            <p class="text-md mt-2">
              Sua conexão com a nossa instituição continua.
            </p>
          </div>
        </header>

        <main class="px-6 flex-grow">
          <section class="my-8">
            <h2 class="text-2xl font-bold mb-4">Notícias e Atualizações</h2>
            <div class="space-y-6">
              <article class="p-4 bg-gray-100 rounded-lg shadow-sm">
                <h3 class="text-xl font-semibold mb-2">Evento de Networking</h3>
                <p>
                  Participe do nosso próximo evento de networking no dia 20 de
                  agosto.
                </p>
              </article>
              <article class="p-4 bg-gray-100 rounded-lg shadow-sm">
                <h3 class="text-xl font-semibold mb-2">Histórias de Sucesso</h3>
                <p>
                  Conheça a história de sucesso de Maria Silva, uma de nossas
                  egressas.
                </p>
              </article>
            </div>
          </section>

          <section class="my-8">
            <h2 class="text-2xl font-bold mb-4">Recursos e Benefícios</h2>
            <ul class="list-disc list-inside space-y-2">
              <li>Acesso à biblioteca online</li>
              <li>Descontos em cursos de pós-graduação</li>
              <li>Serviços de orientação de carreira</li>
            </ul>
          </section>

          <section class="my-8">
            <h2 class="text-2xl font-bold mb-4">Eventos e Reuniões</h2>
            <p>
              Confira o calendário de eventos futuros e participe das nossas
              atividades.
            </p>
          </section>

          <section class="my-8">
            <h2 class="text-2xl font-bold mb-4">Portal de Carreiras</h2>
            <p>
              Encontre oportunidades de emprego e recursos de desenvolvimento
              profissional.
            </p>
          </section>
        </main>

        <footer class="bg-gray-800 text-white p-6 rounded-bl-md rounded-tl-md">
          <p>&copy; 2024 Sua Instituição. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBarVertical.vue";
import { ref, onMounted } from "vue";

const props = defineProps({
  studentName: {
    type: String,
    default: "",
  },
});

const isVisible = ref(false);

onMounted(() => {
  const popupShown = localStorage.getItem("popupShown");

  if (!popupShown) {
    isVisible.value = true;
    localStorage.setItem("popupShown", "true");
  }
});

const closePopup = () => {
  isVisible.value = false;
};
</script>

<style scoped>
.scroll_box::-webkit-scrollbar {
  width: 0.2rem;
}
</style>
