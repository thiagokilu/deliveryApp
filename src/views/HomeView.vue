<script setup lang="ts">
import ProductsList from "../components/ProductsList/ProductsList.vue";
import { useCounterStore } from "@/stores/counterStore";
import { useCartStore } from "@/stores/cartStore";

const counter = useCounterStore();
const cartStore = useCartStore();

interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  img: string;
}

const props = defineProps<{
  abrirCart: () => void;
}>();
</script>

<template>
  <main>
    <!-- Passa o evento pro carrinho abrir -->
    <ProductsList @open-cart="abrirCart" />
  </main>
</template>
