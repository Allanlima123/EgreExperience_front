<template>
  <div
    class="flex items-center justify-center min-h-screen bg-cover bg-center akan"
  >
    <div
      class="bg-white/80 p-8 rounded-lg shadow-lg text-center max-w-sm w-full"
    >
      <h2 class="text-3xl font-bold text-gray-800 mb-4">Deseja sair?</h2>
      <p class="text-gray-600 mb-8">Clique no botão abaixo para Voltar para tela de Login.</p>
      <router-link to="/login">
        <button
          class="bg-red-500 text-white w-full py-2 rounded-md hover:bg-red-600 transition duration-300 focus:outline-none"
        >
          Login
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.akan {
  background-image: url(../../assets/images/image-fundo-05.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
