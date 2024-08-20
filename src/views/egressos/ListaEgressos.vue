<template>
  <div class="bg-gray-100 py-6 flex items-center flex-col min-h-screen">
    <section
      class="flex flex-wrap items-center justify-between px-6 space-x-4 pb-6 w-full max-w-screen-xl"
    >
      <h1 class="text-gray-800 font-bold mb-4 text-4xl">Lista de Egressos</h1>
      <div class="space-x-4 flex items-center">
        <div class="relative flex-1">
          <i
            class="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          ></i>
          <input
            type="search"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Pesquisar Curso..."
          />
        </div>

        <router-link to="/">
          <button
            class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Home
          </button>
        </router-link>
      </div>
    </section>

    
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
