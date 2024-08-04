<template>
  <section class="bg-slate-900 flex items-center justify-center h-screen">
    <div
      class="bg-slate-800 shadow-lg rounded-lg flex max-w-4xl overflow-hidden"
    >
      <div class="w-96 p-3">
        <img
          src="../../assets/images/image01.jpg"
          alt="Placeholder Image"
          class="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div class="w-2/3 p-4">
        <h3 class="text-2xl font-bold text-white mb-6">Criar Conta!</h3>
        <div class="flex space-x-2 mb-6">
          <div
            class="flex items-center border-white border p-2 space-x-3 rounded-md cursor-pointer"
          >
            <img
              src="../../assets/icones/google.png"
              alt="Google"
              class="w-6 h-6"
            />
            <p class="font-bold text-sm text-white">Com o Google!</p>
          </div>
          <div
            class="flex items-center border-white border p-2 space-x-3 rounded-md cursor-pointer"
          >
            <img
              src="../../assets/icones/facebook.png"
              alt="Facebook"
              class="w-6 h-6"
            />
            <p class="font-bold text-sm text-white">Com o Facebook!</p>
          </div>
        </div>
        <div class="flex justify-center text-white text-sm font-bold mb-4">
          Ou
        </div>

        <form @submit.prevent="userLogin">
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2 text-white" for="email"
              >E-mail</label
            >
            <input
              class="shadow appearance-none border-b-2 w-full py-2 pl-0 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent"
              id="email"
              type="text"
              v-model="dataUser.username"
              placeholder="Seu Email"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-sm font-bold mb-2 text-white"
              for="password"
              >Senha</label
            >
            <input
              class="shadow appearance-none border-b-2 w-full py-2 pl-0 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent"
              id="password"
              v-model="dataUser.password"
              type="password"
              placeholder="Sua Senha"
              required
            />
          </div>
          <div class="flex flex-col items-center space-y-4">
            <button
              class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Acessar Conta!
            </button>
            <span class="text-white cursor-pointer">
              Se ainda não tem conta,
              <strong
                class="hover:border-b-2 hover:border-white transition delay-150 duration-300 linear">
                <router-link to="/register"> Registre-se </router-link> </strong
              >.
            </span>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import axios from 'axios';
import { reactive } from 'vue';

const dataUser = reactive({
  username: "",
  password: ""
})

const userLogin = async () =>{
  console.log(dataUser);
  
  const response = await axios.post("http://localhost:8080/perfil", (dataUser))

  //console.log(response)

}
</script>

<style scoped></style>
