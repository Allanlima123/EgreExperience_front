<template>
    <div class="min-h-screen flex flex-col">
      <HeaderMain class="bg-gray-800 p-4 flex justify-center">
        <div
          class="px-4 flex items-center justify-between max-w-screen-xl w-full"
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
      <FooterMain class="bg-gray-800 p-4 left-0 right-0 flex justify-center">
        <div
          class="w-full px-6 flex items-center justify-between max-w-screen-xl"
        >
          <div class="">
            <address class="text-white text-sm font-normal cursor-pointer">
              Contato: silva12@gmail.com
            </address>
            <address class="text-white text-sm font-normal cursor-pointer">
              Linkedin: linkedin.com/info
            </address>
          </div>
  
          <div class="space-x-3">
            <i
              class="fa fa-envelope text-white font-medium text-lg cursor-pointer"
            ></i>
            <i class="fa fa-phone text-white text-lg cursor-pointer"></i>
          </div>
        </div>
      </FooterMain>
    </div>
  </template>
  
  <script setup>
  import FooterMain from "../../components/FooterMain.vue";
  import HeaderMain from "@/components/HeaderMain.vue";
  </script>
  
  <style scoped></style>
  