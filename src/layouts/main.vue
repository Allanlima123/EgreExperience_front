<template>
    <div class="flex min-h-screen bg-gray-100">
      <NavBarVertical />
  
      <div class="flex flex-col flex-1 ml-4">
        <HeaderMain />
  
        <main class="flex-1 overflow-y-auto">
          <router-view />
        </main>

        <FooterMain />
      </div>
    </div>
  </template>
  

<script setup>
import NavBarVertical from "../components/NavBarVertical.vue";
import HeaderMain from "@/components/HeaderMain.vue";
import FooterMain from "../components/FooterMain.vue";
</script>

<style lang="scss" scoped></style>
