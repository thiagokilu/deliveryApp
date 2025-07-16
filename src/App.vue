<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import Header from "./components/Header/Header.vue";
import Cart from "./components/Cart/Cart.vue";

const showCart = ref(false);
function AbrirCart() {
  showCart.value = true;
}

const route = useRoute();

const hideHeader = computed(() => route.name === "order");
</script>

<template>
  <div class="min-h-screen">
    <Header v-if="!hideHeader" :abrir-cart="AbrirCart" />
    <Cart v-if="!hideHeader" :visible="showCart" @close="showCart = false" />

    <RouterView v-slot="{ Component }">
      <component :is="Component" :abrir-cart="AbrirCart" />
    </RouterView>
  </div>
</template>

<style>
body {
  background-color: #f9fafb;
}
</style>
