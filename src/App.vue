<script setup lang="ts">
import { ref } from "vue";
import Header from "./components/Header/Header.vue";
import Cart from "./components/Cart/Cart.vue";
const showCart = ref(false);

function AbrirCart() {
  showCart.value = true;
}
</script>

<template class="">
  <div class="bg-gray-50 min-h-screen">
    <Header :abrir-cart="AbrirCart" />
    <Cart :visible="showCart" @close="showCart = false" />
    <RouterView v-slot="{ Component }"
      ><component :is="Component" :abrir-cart="AbrirCart"
    /></RouterView>
  </div>
</template>

<style scoped></style>
