<template>
  <div class="min-h-screen flex flex-col bg-gray-300">
    <header class="bg-gray-700 text-white p-4">
      <h1 class="text-xl">Exemplo de Scroll</h1>
    </header>
    <main class="flex-grow p-4">
      <div
        class="bg-white p-4 rounded-md shadow-md w-1/2 mx-auto overflow-y-scroll h-64"
      >
        <p v-for="index in 20" :key="index" class="mb-2">
          Linha de conteúdo {{ index }}
        </p>
      </div>
    </main>
    <footer class="bg-gray-700 text-white p-4 text-center">
      <p>Rodapé</p>
    </footer>
  </div>
</template>

<style scoped>
/* Não há necessidade de estilos adicionais */
</style>

<script setup></script>

<style lang="scss" scoped></style>
