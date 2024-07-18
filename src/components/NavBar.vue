<template>
  <aside>
    <transition name="slide">
      <nav
        :class="{ 'w-16': isCollapsed, 'w-56': !isCollapsed }"
        class="bg-gray-800 h-screen rounded-r-md transition-width duration-800"
      >
        <div class="h-full relative">
          <div
            @click="toggleSidebar"
            class="w-7 h-7 absolute -right-3 top-5 bg-gray-100 rounded-full flex items-center justify-center shadow-md cursor-pointer transform transition-transform duration-300"
          >
            <i
              class="text-gray-800 text-sm"
              :class="isCollapsed ? 'fa fa-angle-right' : 'fa fa-angle-left'"
            ></i>
          </div>
          <div class="flex flex-col justify-between h-full">
            <div class="flex items-center justify-center p-4">
              <div class="font-semibold text-2xl text-white">
                <i class="fa fa-university cursor-pointer"></i>
              </div>
            </div>
            <div class="flex-grow">
              <div
                class="flex items-center p-4 hover:bg-gray-700 cursor-pointer"
              >
                <i class="fa fa-university text-white text-xl"></i>
                <transition name="text">
                  <span
                    v-if="!isCollapsed"
                    class="ml-2 text-white transition-width"
                    >Home</span
                  >
                </transition>
              </div>
              <div
                class="flex items-center p-4 hover:bg-gray-700 cursor-pointer"
              >
                <i class="fa fa-graduation-cap text-white text-xl"></i>
                <transition name="text">
                  <span
                    v-if="!isCollapsed"
                    class="ml-2 text-white transition-opacity duration-500 ease-linear"
                    >Formação</span
                  >
                </transition>
              </div>

              <div
                class="flex items-center p-4 hover:bg-gray-700 cursor-pointer"
              >
                <i class="fa fa-trophy text-white text-xl"></i>
                <transition name="text">
                  <span
                    v-if="!isCollapsed"
                    class="ml-2 text-white transition-opacity duration-500 ease-linear"
                    >Experiência</span
                  >
                </transition>
              </div>

              <div
                class="flex items-center p-4 hover:bg-gray-700 cursor-pointer"
              >
                <i class="fa fa-users text-white text-xl"></i>
                <transition name="text">
                  <span
                    v-if="!isCollapsed"
                    class="ml-2 text-white transition-opacity duration-500 ease-linear"
                    >Egressos</span
                  >
                </transition>
              </div>

              <div
                class="flex items-center p-4 hover:bg-gray-700 cursor-pointer"
              >
                <i class="fa fa-cubes text-white text-xl"></i>
                <transition name="text">
                  <span
                    v-if="!isCollapsed"
                    class="ml-2 text-white transition-opacity duration-500 ease-linear"
                    >Projetos</span
                  >
                </transition>
              </div>
            </div>
            <div>
              <div
                class="flex items-center p-4 hover:bg-gray-700 cursor-pointer"
              >
                <i class="fa fa-cog text-white text-xl"></i>
                <transition name="text">
                  <span
                    v-if="!isCollapsed"
                    class="ml-2 text-white transition-opacity duration-500 ease-linear"
                    >Configurações</span
                  >
                </transition>
              </div>
              
              <div
                class="flex items-center p-4 hover:bg-gray-700 cursor-pointer"
              >
                <i class="fas fa-door-open text-white text-xl"></i>
                <transition name="text">
                  <span
                    v-if="!isCollapsed"
                    class="ml-2 text-white transition-opacity duration-500 ease-linear"
                    >Sair</span
                  >
                </transition>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </transition>
  </aside>
</template>

<script setup>
import { ref } from 'vue';

const isCollapsed = ref(false);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped>
.transition-width {
  transition: width 0.4s;
}
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.4s, transform 0.4s;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
.text-enter-active,
.text-leave-active {
  transition: opacity 0.5s ease;
}
.text-enter-from,
.text-leave-to {
  opacity: 0;
}
</style>
