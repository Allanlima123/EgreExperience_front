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
          class="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto"
        >
          <h2 class="text-2xl font-bold mb-6">Formulário de Informações</h2>
          <form @submit.prevent="handleSubmit">
            <div class="grid grid-cols-6 md:grid-cols-6 gap-4 mb-4">
              <div class="col-span-3">
                <label for="nome" class="block text-sm font-medium mb-2"
                  >Nome</label
                >
                <input
                  type="text"
                  id="nome"
                  placeholder="Nome completo"
                  class="border border-gray-300 rounded p-2 w-full"
                />
              </div>

              <div class="col-span-3">
                <label for="foto" class="block text-sm font-medium mb-2"
                  >Foto (URL)</label
                >
                <input
                  type="text"
                  id="foto"
                  placeholder="URL da foto"
                  class="border border-gray-300 rounded p-2 w-full"
                />
              </div>

              <div class="col-span-3">
                <label for="empresa" class="block text-sm font-medium mb-2"
                  >Empresa</label
                >
                <input
                  type="text"
                  id="empresa"
                  placeholder="Nome da empresa"
                  class="border border-gray-300 rounded p-2 w-full"
                />
              </div>

              <div class="col-span-3">
                <label for="cargo" class="block text-sm font-medium mb-2"
                  >Cargo</label
                >
                <input
                  type="text"
                  id="cargo"
                  placeholder="Cargo"
                  class="border border-gray-300 rounded p-2 w-full"
                />
              </div>

              <div class="col-span-1 md:col-span-2">
                <label
                  for="descricaoTecnica"
                  class="block text-sm font-medium mb-2"
                  >Descrição Técnica</label
                >
                <textarea
                  id="descricaoTecnica"
                  placeholder="Descrição técnica"
                  class="border border-gray-300 rounded p-2 w-full"
                  rows="4"
                ></textarea>
              </div>

              <!-- Nível -->
              <!-- <div>
                <label for="nivel" class="block text-sm font-medium mb-2"
                  >Nível</label
                >
                <select
                  id="nivel"
                  class="border border-gray-300 rounded p-2 w-full"
                >
                  <option
                    v-for="nivel in nivelOptions"
                    :key="nivel"
                    :value="nivel"
                  >
                    {{ nivel }}
                  </option>
                </select>
              </div> -->

              <!-- <div class="col-span-1 md:col-span-2">
                <label for="idiomas" class="block text-sm font-medium mb-2"
                  >Idiomas</label
                >
                <ul class="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-3">
                  <li
                    v-for="idioma in idiomasOptions"
                    :key="idioma"
                    class="flex items-center"
                  >
                    <input
                      type="checkbox"
                      :id="idioma"
                      :value="idioma"
                      v-model="selectedIdiomas"
                      class="mr-2 h-4 w-4 cursor-pointer"
                    />
                    <label :for="idioma" class="text-sm">{{ idioma }}</label>
                  </li>
                </ul>
              </div> -->

              <!-- Empresa -->

              <!-- Remoto -->
              <!-- <div class="flex items-center mb-4">
                <input type="checkbox" id="remoto" class="mr-2" />
                <label for="remoto" class="text-sm font-medium"
                  >Trabalho Remoto</label
                >
              </div> -->

              <!-- Cargo -->

              <!-- Tempo -->
              <!-- <div>
                <label for="tempo" class="block text-sm font-medium mb-2"
                  >Tempo</label
                >
                <input
                  type="text"
                  id="tempo"
                  placeholder="Tempo"
                  class="border border-gray-300 rounded p-2 w-full"
                />
              </div> -->

              <!-- Descrição Profissional -->
              <!-- <div class="col-span-1 md:col-span-2">
                <label
                  for="descricaoProficional"
                  class="block text-sm font-medium mb-2"
                  >Descrição Profissional</label
                >
                <textarea
                  id="descricaoProficional"
                  placeholder="Descrição profissional"
                  class="border border-gray-300 rounded p-2 w-full"
                  rows="4"
                ></textarea>
              </div> -->

              <!-- Modalidade -->
              <!-- <div>
                <label for="modalidade" class="block text-sm font-medium mb-2"
                  >Modalidade</label
                >
                <input
                  type="text"
                  id="modalidade"
                  placeholder="Modalidade"
                  class="border border-gray-300 rounded p-2 w-full"
                />
              </div> -->

              <!-- Ano de Início -->
              <!-- <div>
                <label for="anoInicio" class="block text-sm font-medium mb-2"
                  >Ano de Início</label
                >
                <input
                  type="date"
                  id="anoInicio"
                  class="border border-gray-300 rounded p-2 w-full"
                />
              </div> -->

              <!-- Ano de Conclusão -->
              <!-- <div>
                <label for="anoConclusao" class="block text-sm font-medium mb-2"
                  >Ano de Conclusão</label
                >
                <input
                  type="date"
                  id="anoConclusao"
                  class="border border-gray-300 rounded p-2 w-full"
                />
              </div> -->

              <!-- CH -->
              <!-- <div>
                <label for="ch" class="block text-sm font-medium mb-2"
                  >CH</label
                >
                <input
                  type="number"
                  id="ch"
                  placeholder="Carga horária"
                  class="border border-gray-300 rounded p-2 w-full"
                />
              </div> -->

              <!-- Email -->
              <!-- <div>
                <label for="email" class="block text-sm font-medium mb-2"
                  >Email</label
                >
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  class="border border-gray-300 rounded p-2 w-full"
                />
              </div> -->

              <!-- Password
              <div>
                <label for="password" class="block text-sm font-medium mb-2"
                  >Senha</label
                >
                <input
                  type="password"
                  id="password"
                  placeholder="Senha"
                  class="border border-gray-300 rounded p-2 w-full"
                />
              </div> -->
            </div>

            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Enviar
            </button>
          </form>
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
const idiomasOptions = [
  "INGLES",
  "ESPANHOL",
  "PORTUGUES",
  "FRANCES",
  "ALEMAO",
  "ITALIANO",
  "CHINES",
  "JAPONES",
  "RUSSO",
  "ARABE",
  "HINDI",
  "COREANO",
  "TURCO",
  "HOLANDES",
  "POLONES",
];

const nivelOptions = ["BASICO", "INTERMEDIARIO", "AVANCADO"];

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
