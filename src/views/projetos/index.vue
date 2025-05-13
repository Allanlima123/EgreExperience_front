<template>
  <div class="flex flex-col">
    <ListaProjetos @add-novo-participente="addNovaParticipacao" />
  </div>
</template>

<script setup>
import ListaProjetos from "./ListaProjetos.vue";
</script>
