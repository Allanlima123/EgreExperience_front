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
            <router-link to="/perfil/editar">
              <button
                class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                Editar Perfil
              </button>
            </router-link>
          </div>
        </div>

        <div class="flex overflow-hidden">
          <div class="p-4 rounded-md mr-4">
            <div class="w-full flex items-center justify-center mb-3">
              <div class="w-56">
                <img
                  :src="dataUser.foto"
                  alt="foto Usuário"
                  class="w-full h-full rounded-full"
                />
              </div>
            </div>
            <div>
              <p class="text-gray-800 font-light text-md">
                <strong>{{ dataUser.nome }}</strong>
              </p>
              <!-- <p class="text-gray-800 font-light text-md">
                <strong>{{ dataUser.perfil }}</strong>
              </p> -->
              <p class="text-gray-800 font-light text-md">
                <strong>{{ dataUser.cargoAtual }}</strong>
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
                v-if="dataUser.cursos && dataUser.cursos.length > 0"
              >
                <li>
                  <strong>{{ dataUser.cursos[0].nome }}</strong>
                </li>
              </ul>
              <span class="block" v-else>Sem Formação Academica</span>
              <span
                class="cursor-pointer text-gray-800 font-medium text-sm font-sans hover:border-b border-gray-800"
                >Ver Formações Acadêmicas!</span
              >
            </div>

            <div class="section-divider"></div>

            <div>
              <h3 class="text-gray-800 text-2xl font-semibold">
                Experiência Profissional
              </h3>
              <ul
                class="text-gray-800 font-normal font-sans text-sm my-2"
                v-if="dataUser.empregos && dataUser.empregos.length > 0"
              >
                <li>
                  <strong>{{ dataUser.empregos[0].cargo }}</strong
                  >,
                  {{ dataUser.empregos[0].empresa }}
                  ({{ dataUser.empregos[0].periodo }})
                </li>
              </ul>
              <span class="block" v-else>Sem Experiência Profissional</span>
              <span
                class="cursor-pointer text-gray-800 font-medium text-sm font-sans hover:border-b border-gray-800"
                >Ver Experiência Completa!</span
              >
            </div>
            <div class="section-divider"></div>

            <div>
              <h3 class="text-gray-800 text-2xl font-semibold">
                Projeto Relevante
              </h3>
              <ul
                class="text-gray-800 my-2"
                v-if="dataUser.projetos && dataUser.projetos.length > 0"
              >
                <li>
                  <strong>{{ dataUser.projetos[0].nome }}</strong> -
                  <span>{{ dataUser.projetos[0].descricao }}</span>
                </li>
              </ul>
              <span class="block" v-else>Sem Formação Academica</span>
              <span
                class="cursor-pointer text-gray-800 font-medium text-sm font-sans hover:border-b border-gray-800"
              >
                Ver todos os Projetos!
              </span>
            </div>

            <div class="section-divider"></div>

            <div>
              <h3 class="text-gray-800 text-2xl font-semibold">Habilidades</h3>
              <ul
                class="text-gray-800 my-2 flex flex-wrap space-x-3"
                v-if="dataUser.habilidades && dataUser.habilidades.length > 0">
                <li
                  v-for="habilidade in dataUser.habilidades"
                  :key="habilidade"
                  class="text-sm"
                >
                  {{ habilidade }}
                </li>
              </ul>
              <span class="block" v-else>Sem Habilidades Técnicas</span>
            </div>

            <!--
            <div class="section-divider"></div>
            
            - <div>
              <h3 class="text-gray-800 text-2xl font-semibold">
                Descrição Profissional
              </h3>
              <p class="text-gray-800 my-2">
                {{ dataUser.professionalDescription }}
              </p>
            </div> -->

            <div class="section-divider"></div>

            <div>
              <h3 class="text-gray-800 text-2xl font-semibold">Idiomas</h3>
              <ul class="text-gray-800 my-2 flex flex-wrap space-x-3">
                <li
                  v-for="languagens in dataUser.idiomas"
                  :key="languagens"
                  class="text-sm"
                >
                  {{ languagens }}
                </li>
              </ul>
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

const dataUser = ref([]);

const getDataEstudante = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/estudante/${1}`);
    dataUser.value = response.data;
    console.log(response);
  } catch (error) {
    console.error("Erro ao buscar dados do estudante:", error);
  }
};
onMounted(getDataEstudante);
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
