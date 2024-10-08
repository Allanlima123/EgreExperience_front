<template>
  <div class="min-h-screen h-screen flex flex-col bg-gray-300">
    <NavBar />
    <main class="flex-grow p-4 overflow-auto flex justify-center">
      <section class="flex h-full flex-col max-w-screen-xl w-full">
        <div class="flex items-center justify-between px-4 space-x-3 pb-4">
          <h1 class="text-gray-800 font-bold mb-4 text-4xl">Perfil</h1>

          <div class="space-x-3">
            <router-link to="/egressos">
              <button
                class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                Egressos
              </button>
            </router-link>
            <router-link to="/egressos/lista">
              <button
                class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                Ver lista Egressos
              </button>
            </router-link>
          </div>
        </div>

        <div class="flex overflow-hidden">
          <div class="p-4 rounded-md mr-4">
            <div class="w-56 h-56 flex items-center justify-center mb-3">
              <img
                :src="perfilUser.foto"
                alt="foto Usuário"
                class="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <p class="text-gray-800 font-light text-md">
                <strong>{{ perfilUser.nome }}</strong>
              </p>
              <p class="text-gray-800 font-light text-md">
                <strong>{{ emailUser }}</strong>
              </p>
              <p class="text-gray-800 font-light text-md">
                <strong>{{ perfilUser.cargoAtual }}</strong>
              </p>
            </div>
          </div>

          <div class="rounded-md scroll_box overflow-y-scroll">
            <div>
              <h3 class="text-gray-800 text-2xl font-semibold">
                Formação Acadêmica
              </h3>
              <ul
                class="text-gray-800 font-normal font-sans text-sm my-2"
                v-if="formacoes.length > 0"
              >
                <li>
                  <strong>{{ formacoes[0].nome }}</strong> -
                  {{ formacoes[0].universidade }}
                </li>
              </ul>
              <span class="block" v-else>Sem Formação Academica</span>
              <router-link to="/formacao">
                <span
                  class="cursor-pointer text-gray-800 font-medium text-sm font-sans hover:border-b border-gray-800"
                  >Ver Formações Acadêmicas!</span
                >
              </router-link>
            </div>

            <div class="section-divider"></div>

            <div>
              <h3 class="text-gray-800 text-2xl font-semibold">
                Experiência Profissional
              </h3>
              <ul
                class="text-gray-800 font-normal font-sans text-sm my-2"
                v-if="experiencias.length > 0"
              >
                <li>
                  <strong>{{ experiencias[0].cargo }}</strong> -
                  {{ experiencias[0].empresa }}
                </li>
              </ul>
              <span class="block" v-else>Sem Experiência Profissional</span>

              <router-link to="/experiencia">
                <span
                  class="cursor-pointer text-gray-800 font-medium text-sm font-sans hover:border-b border-gray-800"
                  >Ver Experiência Completa!</span
                >
              </router-link>
            </div>
            <div class="section-divider"></div>

            <div>
              <h3 class="text-gray-800 text-2xl font-semibold">
                Projeto Relevante
              </h3>
              <ul class="text-gray-800 my-2" v-if="projetos.length">
                <li>
                  <strong>{{ projetos[0].nome }}</strong> -
                  <span>{{ projetos[0].descricao }}</span>
                </li>
              </ul>
              <span class="block" v-else>Sem Projetos relevenates!</span>
              <router-link to="/formacao">
                <span
                  class="cursor-pointer text-gray-800 font-medium text-sm font-sans hover:border-b border-gray-800"
                >
                  Ver todos os Projetos!
                </span>
              </router-link>
            </div>

            <div class="section-divider"></div>

            <div>
              <h3 class="text-gray-800 text-2xl font-semibold mb-4">
                Habilidades
              </h3>

              <ul
                class="text-gray-800 my-2 flex flex-wrap gap-2"
                v-if="perfilUser.habilidades"
              >
                <li
                  v-for="habilidade in perfilUser.habilidades"
                  :key="habilidade"
                  class="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {{ habilidade }}
                </li>
              </ul>
              <span class="block text-gray-600 italic" v-else
                >Sem Habilidades Técnicas</span
              >
            </div>

            <div class="section-divider"></div>

            <div>
              <h3 class="text-gray-800 text-2xl font-semibold">Idiomas</h3>
              <ul
                class="text-gray-800 my-2 flex flex-wrap space-x-3"
                v-if="perfilUser.habilidades"
              >
                <li
                  v-for="languagens in perfilUser.idiomas"
                  :key="languagens"
                  class="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {{ languagens }}
                </li>
              </ul>
              <span class="block text-gray-600 italic" v-else>Sem Idiomas</span>
            </div>

            <div class="section-divider"></div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import NavBar from "../perfil/Navbar.vue";
import Footer from "../perfil/Footer.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const { params } = useRoute();

const perfilUser = ref({});
const emailUser = ref("");
const formacoes = ref([]);
const experiencias = ref([]);
const projetos = ref([]);

const fetchData = async (endpoint, refValue, errorMessage) => {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/${endpoint}/estudante/${params.id}`
    );
    refValue.value = data;
  } catch (error) {
    console.error(`${errorMessage}:`, error);
  }
};

const getDataEstudante = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/estudante/${params.id}`
    );
    perfilUser.value = data;
    emailUser.value = data.perfil?.email || "";
  } catch (error) {
    console.error("Erro ao buscar dados do estudante:", error);
  }
};

onMounted(() => {
  getDataEstudante();
  fetchData("curso", formacoes, "Erro ao buscar dados das formações");
  fetchData("emprego", experiencias, "Erro ao buscar dados das experiências");
  fetchData("projeto", projetos, "Erro ao buscar dados dos projetos");
});
</script>

<style scoped>
.box_heigth {
  min-height: 20rem;
}

.section-divider {
  border-bottom: 1px solid #ccc;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
}

.scroll_box::-webkit-scrollbar {
  width: 0.2rem;
}

.box_perfil {
  width: 500px;
}
</style>
