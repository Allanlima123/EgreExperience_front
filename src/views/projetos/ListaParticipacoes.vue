<template>
  <main class="mt-4">
    <h3 class="text-lg font-medium text-gray-800 mb-2">Participações</h3>
    <div class="overflow-x-auto h-40">
      <div class="max-h-80 shadow-sm">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-50 sticky top-0">
            <tr>
              <th class="py-3 px-4 text-left text-gray-700">Nome</th>
              <th class="py-3 px-4 text-left text-gray-700">Papel</th>
              <th class="py-3 px-4 text-center text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody v-if="participacoes.length">
            <tr
              v-for="participacao in participacoes"
              :key="participacao.id"
              class="border-t"
            >
              <td class="py-3 px-4 text-gray-800">
                {{ participacao.nome }}
              </td>
              <td class="py-3 px-4 text-gray-600">
                {{ participacao.papel }}
              </td>
              <td class="py-3 px-4 flex justify-center space-x-4">
                <button
                  @click="editarParticipacao(participacao.id)"
                  class="text-blue-500 hover:text-blue-700"
                  title="Atualizar"
                >
                  <i class="fa fa-pencil"></i>
                </button>
                <button
                  @click="deletarParticipacao(participacao.id)"
                  class="text-red-500 hover:text-red-700"
                  title="Deletar"
                >
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td
                colspan="3"
                class="py-3 px-4 text-gray-600 italic text-center"
              >
                Sem Participações
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  participacoes: {
    type: Array,
    default: () => [],
  },
});
</script>
