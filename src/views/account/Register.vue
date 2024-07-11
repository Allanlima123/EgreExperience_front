<template>
  <section
    class="register min-h-screen flex items-center justify-center bg-cover bg-center"
  >
    <div
      class="p-8 border-2 border-white border-opacity-20 rounded-lg shadow-lg w-full max-w-md box_container"
    >
      <h2 class="text-2xl font-bold mb-6 text-center text-white">Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="username" class="block text-gray-100">Username:</label>
          <input
            v-model="userRegister.username"
            type="text"
            id="username"
            class="shadow appearance-none border-b text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent w-full px-2 py-2"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-100">Email:</label>
          <input
            v-model="userRegister.email"
            type="email"
            id="email"
            class="shadow appearance-none border-b text-white leading-tight focus:outline-none focus:shadow-outline w-full px-2 py-2 bg-transparent"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-100">Password:</label>
          <input
            v-model="userRegister.password"
            type="password"
            id="password"
            class="shadow appearance-none border-b w-full text-white leading-tight focus:outline-none focus:shadow-outline px-2 py-2 bg-transparent"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const userRegister = reactive({
  username: "Alan Lima",
  email: "silva12@gmail.com",
  password: "123456@",
});

// alert(JSON.stringify(userRegister))
</script>

<style scoped>
.register {
  background: center / cover no-repeat url(../../assets/images/fundo02.jpg);
}

.box_container {
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
</style>
