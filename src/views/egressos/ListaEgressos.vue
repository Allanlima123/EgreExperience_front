<template>
  <div class="min-h-screen flex flex-col ">
    <Card />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import Card from './Card.vue';

const estudantes = ref([]);

const featchEstudantes = async () => {
  try {
    const { data } = await axios.get("http://localhost:8080/estudante");
    estudantes.value = data;
  } catch (error) {
    console.error("Erro ao buscar dados dos estudantes:", error);
  }
};

onMounted(featchEstudantes);
</script>

<style scoped></style>
