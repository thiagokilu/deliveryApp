<script setup lang="ts">
import type { PropType } from "vue";

import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();

const emit = defineEmits(["close", "add-to-cart", "open-cart"]);

interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  img: string;
}

type Adicional = {
  nome: string;
  preco: number;
  selecionado: boolean;
};

const props = defineProps({
  visible: Boolean,
  img: String,
  nome: String,
  descricao: String,
  preco: Number,
  adicionais: {
    type: Array as PropType<Adicional[]>,
    default: () => [],
  },
});

const toggleAdicional = (index: number) => {
  props.adicionais[index].selecionado = !props.adicionais[index].selecionado;
};

const calcularTotal = () => {
  const extras = props.adicionais
    .filter((item) => item.selecionado)
    .reduce((sum, item) => sum + item.preco, 0);

  return (props.preco || 0) + extras;
};

const adicionarAoCarrinho = () => {
  const adicionaisSelecionados = props.adicionais.filter(
    (item) => item.selecionado
  );

  const produtoParaCarrinho: Product = {
    id: props.id ?? Date.now(), // use id do produto ou gera um timestamp único
    nome: props.nome ?? "",
    descricao: props.descricao ?? "",
    preco: calcularTotal(), // preço total com adicionais
    adicionais: adicionaisSelecionados,
    img: props.img ?? "",
  };

  cartStore.cartAdd(produtoParaCarrinho);
  console.log(cartStore.cart);
  emit("close");
  emit("open-cart");
};
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    @click.self="$emit('close')"
  >
    <div class="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden">
      <!-- Botão de fechar -->
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
        aria-label="Fechar modal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <!-- Conteúdo do modal -->
      <div class="max-h-[80vh] overflow-y-auto">
        <header class="p-6 pb-4 border-b border-gray-200">
          <div class="flex flex-col md:flex-row gap-6">
            <div class="flex-shrink-0">
              <img
                :src="img"
                :alt="`Imagem de ${nome}`"
                class="max-w-52 object-cover rounded-lg"
              />
            </div>
            <div class="flex flex-col gap-2">
              <h2 class="font-bold text-2xl text-gray-900">{{ nome }}</h2>
              <p class="text-gray-600">{{ descricao }}</p>
              <p class="font-bold text-2xl text-primary-500">
                R$ {{ preco?.toFixed(2).replace(".", ",") }}
              </p>
            </div>
          </div>
        </header>

        <div class="p-6">
          <h3 class="font-semibold text-lg mb-4 text-gray-800">
            Adicionais
            <span class="text-sm font-normal text-gray-500 ml-2">
              (Selecione os que desejar)
            </span>
          </h3>

          <div class="space-y-3">
            <div
              v-for="(item, index) in adicionais"
              :key="index"
              class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              :class="{ 'bg-gray-50': item.selecionado }"
              @click="toggleAdicional(index)"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-5 h-5 rounded border flex items-center justify-center"
                  :class="
                    item.selecionado
                      ? 'bg-primary-500 border-primary-500'
                      : 'border-gray-300'
                  "
                >
                  <svg
                    v-if="item.selecionado"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <span class="font-medium">{{ item.nome }}</span>
              </div>
              <span class="text-primary-500 font-medium">
                + R$ {{ item.preco.toFixed(2).replace(".", ",") }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Rodapé com botão de ação -->
      <footer class="p-4 border-t border-gray-200 bg-gray-50">
        <div class="flex justify-between items-center mb-3">
          <span class="font-medium text-gray-700">Total:</span>
          <span class="font-bold text-xl text-primary-500">
            R$ {{ calcularTotal().toFixed(2).replace(".", ",") }}
          </span>
        </div>
        <button
          @click="adicionarAoCarrinho"
          class="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-lg font-bold transition-colors cursor-pointer"
        >
          Adicionar ao Carrinho
        </button>
      </footer>
    </div>
  </div>
</template>

<style>
/* Adicione estas classes no seu arquivo CSS global ou usando Tailwind */
.bg-primary-500 {
  background-color: #d61326;
}
.hover\:bg-primary-600:hover {
  background-color: #d61326;
}
.text-primary-500 {
  color: #d61326;
}
</style>
