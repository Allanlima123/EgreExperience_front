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
          <div class="w-1/4 p-4 rounded-md">
            <div class="w-full flex items-center justify-center mb-3">
              <div>
                <img
                  src="../../assets/images/avatar-3.jpg"
                  alt="user IMG"
                  class="w-full h-full rounded-full"
                />
              </div>
            </div>
            <div>
              <p class="text-gray-800 font-light text-md">
                <strong>{{ dataUser.name }}</strong>
              </p>
              <p class="text-gray-800 font-light text-md">
                <strong>{{ dataUser.email }}</strong>
              </p>
              <p class="text-gray-800 font-light text-md">
                <strong>{{ dataUser.occupation }}</strong>
              </p>
            </div>
          </div>

          <div class="rounded-md w-3/4 scroll_box overflow-y-scroll">
            <div>
              <h3 class="text-gray-800 text-2xl font-semibold">
                Formação Acadêmica
              </h3>
              <ul class="text-gray-800 font-normal font-sans text-sm my-2">
                <li>
                  <strong>{{ dataUser.education.degree }}</strong> em
                  {{ dataUser.education.field }} -
                  {{ dataUser.education.institution }},
                  {{ dataUser.education.graduationYear }}
                </li>
              </ul>
              <span
                class="cursor-pointer text-gray-800 font-medium text-sm font-sans hover:border-b border-gray-800"
                >Ver Formações Acadêmicas!</span
              >
            </div>

            <div class="section-divider"></div>
            <!-- Linha de divisão -->

            <div>
              <h3 class="text-gray-800 text-2xl font-semibold">
                Experiência Profissional
              </h3>
              <ul class="text-gray-800 font-normal font-sans text-sm my-2">
                <li
                  v-for="experience in dataUser.experiences"
                  :key="experience.position"
                >
                  <strong>{{ experience.position }}</strong
                  >, {{ experience.company }} ({{ experience.period }})
                </li>
              </ul>
              <span
                class="cursor-pointer text-gray-800 font-medium text-sm font-sans hover:border-b border-gray-800"
                >Ver Experiência Completa!</span
              >
            </div>

            <div class="section-divider"></div>
            <!-- Linha de divisão -->

            <div>
              <h3 class="text-gray-800 text-2xl font-semibold">
                Projetos Relevantes
              </h3>
              <ul class="text-gray-800 my-2">
                <li v-for="project in dataUser.projects" :key="project.name">
                  <strong>{{ project.name }}</strong> -
                  {{ project.description }}
                </li>
              </ul>
              <span
                class="cursor-pointer text-gray-800 font-medium text-sm font-sans hover:border-b border-gray-800"
                >Ver todos os Projetos!</span
              >
            </div>

            <div class="section-divider"></div>
            <!-- Linha de divisão -->

            <div>
              <h3 class="text-gray-800 text-2xl font-semibold">Habilidades</h3>
              <ul class="text-gray-800 my-2 flex flex-wrap space-x-3">
                <li
                  v-for="skill in dataUser.skills"
                  :key="skill"
                  class="text-sm"
                >
                  {{ skill }}
                </li>
              </ul>
            </div>

            <div class="section-divider"></div>
            <!-- Linha de divisão -->

            <div>
              <h3 class="text-gray-800 text-2xl font-semibold">
                Descrição Profissional
              </h3>
              <p class="text-gray-800 my-2">
                {{ dataUser.professionalDescription }}
              </p>
            </div>

            <div class="section-divider"></div>
            <!-- Linha de divisão -->

            <div>
              <h3 class="text-gray-800 text-2xl font-semibold">Idiomas</h3>
              <ul class="text-gray-800 my-2 flex flex-wrap space-x-3">
                <li
                  v-for="language in dataUser.languages"
                  :key="language"
                  class="text-sm"
                >
                  {{ language }}
                </li>
              </ul>
            </div>

            <div class="section-divider"></div>
            <!-- Linha de divisão -->
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

const dataUser = {
  name: "Alan Lima",
  email: "silva12@gmail.com",
  occupation: "Engenheiro De Software",
  experiences: [
    {
      position: "Desenvolvedor Full Stack",
      company: "Empresa X",
      period: "2019-2023",
    },
    {
      position: "Estagiário de Desenvolvimento",
      company: "Empresa Y",
      period: "2018-2019",
    },
  ],
  certifications: [
    {
      name: "Certificação em Desenvolvimento Web",
      authority: "Certificadora ABC",
    },
  ],
  education: {
    degree: "Bacharelado",
    field: "Engenharia de Software",
    institution: "Universidade ABC",
    graduationYear: "2018",
  },
  projects: [
    {
      name: "Sistema de Gestão Escolar",
      description: "Desenvolvimento de um sistema web para gestão escolar",
    },
  ],
  skills: ["JavaScript", "Vue.js", "Node.js", "SQL"],
  professionalDescription:
    "Profissional com experiência em desenvolvimento web e interesse em tecnologias emergentes.",
  languages: ["Inglês", "Espanhol"],
};
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
</style>
