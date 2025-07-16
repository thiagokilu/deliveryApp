<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();

const props = defineProps<{
  abrirCart: () => void;
}>();
</script>
<template>
  <header class="app-header bg-[#e32636] text-white p-4">
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between w-full max-w-screen-xl mx-auto gap-4"
    >
      <!-- Logo + Informações -->
      <div class="flex flex-row sm:flex-row gap-4">
        <!-- Logo -->
        <router-link to="/">
          <div
            class="bg-white w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shrink-0"
          >
            <img
              src="../../assets/images/logo.png"
              alt="Logo Pizza Maxi"
              class="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full"
            />
          </div>
        </router-link>

        <!-- Texto -->
        <div class="flex flex-col text-sm">
          <span class="text-base font-bold">Pizza Maxi</span>
          <span class="text-white/90">
            Avenida das Estrelas Cadentes, nº 9999, Bairro Nebulosa Azul, Cidade
            Aurora Boreal
          </span>

          <!-- Entrega -->
          <span class="-ml-1">⏱️Entrega em até 40 min</span>

          <!-- Status -->
          <div class="flex items-center gap-2 mt-1">
            <div
              class="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce"
            ></div>
            <span><strong>Aberto Agora</strong> — 12:00 - 23:00</span>
          </div>
        </div>
      </div>

      <!-- Botões -->
      <div class="flex flex-row gap-3 justify-center sm:justify-end">
        <!-- Carrinho -->
        <div
          class="relative w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow hover:scale-105 transition cursor-pointer"
          @click="props.abrirCart"
        >
          <font-awesome-icon
            :icon="['fas', 'cart-shopping']"
            class="text-red-500 text-lg sm:text-xl"
          />
          <!-- Badge contador -->
          <div
            class="absolute top-2 right-0 bg-green-600 text-white rounded-full text-xs sm:text-sm font-bold w-6 h-6 flex items-center justify-center shadow-lg -translate-y-1/2 translate-x-1/2 animate-bounce"
          >
            {{ cartStore.cart.length }}
          </div>
        </div>

        <!-- Compartilhar -->
        <div
          class="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow hover:scale-105 transition cursor-pointer"
        >
          <font-awesome-icon
            :icon="['fas', 'share-from-square']"
            class="text-red-500 text-lg sm:text-xl"
          />
        </div>
      </div>
    </div>
  </header>
</template>
