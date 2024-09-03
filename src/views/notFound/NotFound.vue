<template>
  <div
    class="box_fundo flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center"
  >
    <div class="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center">
      <h1 class="text-6xl font-bold text-gray-800">404</h1>
      <p class="text-xl mt-4 text-gray-600">Página não encontrada</p>
      <router-link
        to="/"
        class="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Voltar para a página inicial
      </router-link>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.box_fundo {
  background-image: url("../../assets/images/error400-cover.png");
  background-size: cover;
  background-position: center;
}
</style>
