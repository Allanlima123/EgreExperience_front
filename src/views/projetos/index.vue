<template>
  <div class="min-h-screen flex flex-col">
    <HeaderMain class="bg-gray-800 p-4 flex justify-center">
      <div
        class="flex items-center justify-between max-w-screen-xl w-full px-4"
      >
        <div class="flex items-center space-x-2 text-white">
          <i class="fa fa-university text-2xl"></i>
          <span class="font-medium text-2xl">EgreExperience</span>
        </div>
        <button
          class="text-white font-medium flex items-center space-x-1 hover:text-gray-400"
        >
          <span>Logout</span>
          <i class="fa fa-sign-out"></i>
        </button>
      </div>
    </HeaderMain>

    <ListaProjetos @add-novo-participente="addNovaParticipacao"> </ListaProjetos>

    <FooterMain class="bg-gray-800 p-4 flex justify-center">
      <div
        class="flex items-center justify-between max-w-screen-xl w-full px-6"
      >
        <div>
          <address class="text-white text-sm font-normal">
            Contato:
            <a href="mailto:silva12@gmail.com" class="underline"
              >silva12@gmail.com</a
            >
          </address>
          <address class="text-white text-sm font-normal">
            Linkedin:
            <a
              href="https://linkedin.com/info"
              class="underline"
              target="_blank"
            >
              linkedin.com/info
            </a>
          </address>
        </div>

        <div class="space-x-3">
          <a href="mailto:silva12@gmail.com" class="text-white text-lg">
            <i class="fa fa-envelope"></i>
          </a>
          <a href="tel:+123456789" class="text-white text-lg">
            <i class="fa fa-phone"></i>
          </a>
        </div>
      </div>
    </FooterMain>
  </div>
</template>

<script setup>
import ListaProjetos from "./ListaProjetos.vue";
import FooterMain from "../../components/FooterMain";
import HeaderMain from "../../components/HeaderMain";
</script>
