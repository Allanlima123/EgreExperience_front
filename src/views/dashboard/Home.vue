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
          class="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto"
        >
          <h2 class="text-2xl font-bold mb-4">Formulário Estudante</h2>
          <form @submit.prevent="handleSubmit">
            <div class="flex gap-2">
              <div class="mb-4 w-full">
                <label for="nome" class="block text-sm mb-2 font-sm text-gray-700">Nome</label>
                <input
                  id="nome"
                  type="text"
                  v-model="formData.nome"
                  placeholder="Ex.:Ana"
                  class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>

              <div class="mb-4 w-full">
                <label for="cargoAtual" class="block text-sm mb-2 font-sm text-gray-700"
                  >Cargo Atual</label
                >
                <input
                  id="cargoAtual"
                  type="text"
                  placeholder="Ex.: Desenvolvedor"
                  v-model="formData.cargoAtual"
                  required
                  class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            <div class="flex gap-2">
              <div class="mb-4 w-full">
                <label for="foto" class="block text-sm mb-2 font-sm text-gray-700">Foto</label>
                <input
                  id="foto"
                  type="text"
                  placeholder="Link de uma Imagem"
                  v-model="formData.foto"
                  required
                  class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div class="mb-4">
                <label for="anoFormacao" class="block text-sm mb-2 font-sm text-gray-700"
                  >Ano de Formação</label
                >
                <input
                  id="anoFormacao"
                  type="date"
                  v-model="dataObservation"
                  required
                  class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            <div class="flex space-x-4">
              <div class="flex flex-col w-1/2">
                <label for="idiomas" class="block mb-2 text-sm font-sm text-gray-700"
                  >Selecione seus Idiomas:</label
                >
                <select
                  id="idiomas"
                  v-model="formData.idiomas"
                  multiple
                  class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 scroll_box"
                  required
                >
                  <option
                    v-for="idioma in listaIdiomas"
                    :key="idioma"
                    :value="idioma"
                    class="text-sm"
                  >
                    {{ idioma }}
                  </option>
                </select>
              </div>

              <div class="flex flex-col w-1/2">
                <label
                  for="habilidades"
                  class="block text-sm mb-2 font-sm text-gray-700"
                  >Selecione suas habilidades:</label
                >
                <select
                  id="habilidades"
                  v-model="formData.habilidades"
                  multiple
                  class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 scroll_box"
                  required
                >
                  <option
                    v-for="habilidade in listaHabilidades"
                    :key="habilidade"
                    :value="habilidade"
                    class="text-sm"
                  >
                    {{ habilidade }}
                  </option>
                </select>
              </div>
            </div>

            <div class="my-4">
              <label
                for="descricao"
                class="block text-sm font-sm text-gray-700"
              >
                Descrição Técnica Geral
              </label>
              <textarea
                v-model="formData.descricaoTecnica"
                id="descricao"
                maxlength="100"
                rows="4"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              class="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </Teleport>

    <div class="flex gap-4">
      <NavBarVertical />

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
import NavBarVertical from "@/components/NavBarVertical.vue";
import { ref, reactive, onMounted, watch } from "vue";
import axios from "axios";

const isVisible = ref(false);
const isVisibleForm = ref(false);
const listaIdiomas = [
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

const listaHabilidades = [
  "PROGRAMACAO_JAVA",
  "DESENVOLVIMENTO_WEB",
  "ANALISE_DE_DADOS",
  "SEGURANCA_CIBERNETICA",
  "ADMINISTRACAO_BANCO_DE_DADOS",
  "INTELIGENCIA_ARTIFICIAL",
  "DESIGN_GRAFICO",
  "UX_UI",
  "FOTOGRAFIA",
  "ANIMACAO_2D_3D",
  "DESIGN_DE_INTERIORES",
  "ENGENHARIA_CIVIL",
  "ENGENHARIA_ELETRICA",
  "ENGENHARIA_MECANICA",
  "ENGENHARIA_DE_SOFTWARE",
  "GESTAO_DE_PROJETOS",
  "ENFERMAGEM",
  "FISIOTERAPIA",
  "NUTRICAO",
  "MEDICINA",
  "FARMACIA",
  "CONTABILIDADE",
  "GESTAO_DE_RECURSOS_HUMANOS",
  "MARKETING_DIGITAL",
  "PLANEJAMENTO_ESTRATEGICO",
  "FINANCAS_CORPORATIVAS",
  "DOCENCIA",
  "ORIENTACAO_PEDAGOGICA",
  "DESENVOLVIMENTO_CURRICULAR",
  "PSICOPEDAGOGIA",
  "COORDENACAO_ESCOLAR",
];

const dataObservation = ref("");

const formData = reactive({
  anoFormacao: "",
  foto: "",
  nome: "",
  cargoAtual: "",
  descricaoTecnica: "",
  idiomas: [],
  habilidades: [],
  perfilId: 0,
});

const fetchPerfil = async (idPerfil = 1) => {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/perfil/${idPerfil}`
    );
    formData.perfilId = data.id;
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
  }
};

const checkPopupVisibility = () => {
  try {
    isVisible.value = !localStorage.getItem("popupShown");
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

const handleSubmit = async () => {
  isVisibleForm.value = false;

  try {
    const response = await axios.post(
      `http://localhost:8080/estudante`,
      formData
    );
    console.log("Estudante enviado com sucesso:", response.data);
  } catch (error) {
    console.error("Erro ao enviar Estudante:", error);
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

watch(dataObservation, (newValue) => {
  formData.anoFormacao = formatDate(newValue);
});

const closePopup = () => {
  isVisibleForm.value = false;
};

onMounted(() => {
  checkPopupVisibility();
  fetchPerfil();
});
</script>

<style scoped>
.scroll_box::-webkit-scrollbar {
  width: 0.2rem;
}
</style>
