<template>
  <section
    class="box_img_cadastro min-h-screen flex items-center justify-center bg-cover bg-center"
  >
    <div
      class="p-8 border-2 bg-white border-white border-opacity-20 rounded-lg shadow-lg w-full max-w-md"
    >
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
        Cadastro
      </h2>
      <form @submit.prevent="sendUserPerfil">
        <div class="mb-4">
          <label for="nome" class="block text-gray-900">Nome:</label>
          <input
            v-model="cadastro.nome"
            type="text"
            id="nome"
            class="appearance-none border-b text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full px-2 py-1"
            required
          />
        </div>
        <div class="mb-4">
          <label for="sobreNome" class="block text-gray-900">SobreNome:</label>
          <input
            v-model="cadastro.sobreNome"
            type="text"
            id="sobreNome"
            class="appearance-none border-b text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent w-full px-2 py-1"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-900">Email:</label>
          <input
            v-model="cadastro.email"
            type="email"
            id="email"
            class="appearance-none border-b text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent w-full px-2 py-1"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-900">Senha:</label>
          <input
            v-model="cadastro.password"
            type="password"
            id="password"
            class="appearance-none border-b w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline px-2 py-1 bg-transparent"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Cadastrar
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import axios from "axios";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const cadastro = reactive({
  nome: "",
  sobreNome: "",
  email: "",
  password: "",
});

const sendUserPerfil = async () => {
  try {
    const { data } = await axios.post("http://localhost:8080/perfil", cadastro);
    setTimeout(() =>{
      router.push("/login")
    }, 3000)
    console.log(`Perfil com o ${data.id} criado com Sucesso.`);
  } catch (error) {
    console.error("Sem Participações.", error);
  }
};
</script>

<style scoped>
.box_img_cadastro {
  background: center / cover no-repeat
    url(../../assets/images/img-fundo-uni01.jpg);
}

.box_container {
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
}
</style>
