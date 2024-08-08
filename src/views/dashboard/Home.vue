<template>
  <div class="bg-gray-300 w-screen">
    <Teleport to="#popUp">
      <div
        v-if="isVisible || isVisibleForm"
        class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
        @click.self="closePopup"
      >
        <div
          v-if="isVisible"
          class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
        >
          <h2 class="text-xl font-bold mb-4">Bem-vindo(a) de volta!</h2>
          <p class="mb-4">
            Olá {{ "Allan" }}! Estamos felizes em tê-lo(a) conosco novamente.
            Antes de prosseguir, precisamos fazer algumas perguntas.
          </p>
          <button
            @click="openFormModal"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Começar
          </button>
        </div>

        <div
          v-if="isVisibleForm"
          class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
        >
          <h2 class="text-xl font-bold mb-4">Formulário de Perguntas</h2>
          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label for="question1" class="block text-sm font-medium mb-2">
                Pergunta 1
              </label>
              <input
                type="text"
                id="question1"
                class="border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>
            <div class="mb-4">
              <label for="question2" class="block text-sm font-medium mb-2">
                Pergunta 2
              </label>
              <input
                type="text"
                id="question2"
                class="border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Enviar
            </button>
          </form>
          <button @click="closePopup" class="mt-4 text-red-500 hover:underline">
            Cancelar
          </button>
        </div>
      </div>
    </Teleport>

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

const isVisible = ref(false);
const isVisibleForm = ref(false);

const initializePopup = () => {
  try {
    const popupShown = localStorage.getItem("popupShown");
    if (!popupShown) {
      isVisible.value = true;
    }
  } catch (error) {
    console.error("Erro ao acessar o localStorage:", error);
  }
};

const openFormModal = () => {
  isVisible.value = false;
  isVisibleForm.value = true;
  try {
    localStorage.setItem("popupShown", "true");
  } catch (error) {
    console.error("Erro ao definir o item no localStorage:", error);
  }
};

const closePopup = () => {
  isVisibleForm.value = false;
};

onMounted(initializePopup);
</script>

<style scoped>
.scroll_box::-webkit-scrollbar {
  width: 0.2rem;
}
</style>
