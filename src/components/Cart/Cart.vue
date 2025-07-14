<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";
import CartProduct from "../CartProduct/CartProduct.vue";

const cartStore = useCartStore();

interface Adicional {
  nome: string;
  preco: number;
  selecionado: boolean;
}

interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  img: string;
  adicionais?: Adicional[]; // ← agora o produto pode ter adicionais (opcional)
}

const props = defineProps<{
  visible: boolean;
}>();
const emit = defineEmits(["close"]);
</script>

<template>
  <div
    v-if="props.visible"
    class="fixed inset-0 overflow-hidden z-50"
    aria-labelledby="slide-over-title"
    role="dialog"
    aria-modal="true"
  >
    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-black/80 transition-opacity"
      @click="$emit('close')"
    ></div>

    <!-- Painel do carrinho -->
    <div class="fixed inset-y-0 right-0 max-w-full flex">
      <div class="relative w-screen max-w-md">
        <!-- Conteúdo do carrinho -->
        <div class="h-full flex flex-col bg-white shadow-xl">
          <!-- Cabeçalho -->
          <div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
            <div class="flex items-start justify-between">
              <h2
                class="text-2xl font-bold text-gray-900"
                id="slide-over-title"
              >
                Seu Carrinho
              </h2>
              <button
                @click="$emit('close')"
                class="p-2 text-gray-400 hover:text-gray-500 transition-colors cursor-pointer"
                aria-label="Fechar modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <!-- Lista de produtos -->
            <div class="mt-8">
              <ul class="divide-y divide-gray-200">
                <li
                  v-for="(item, index) in cartStore.cart"
                  :key="item.id || index"
                  class="py-6 flex"
                >
                  <CartProduct
                    :id="item.id"
                    :nome="item.nome"
                    :preco="item.preco"
                    :descricao="item.descricao || ''"
                    :img="item.img || ''"
                    :quantidade="item.quantidade"
                    :adicionais="item.adicionais || 'vazio'"
                    :show-modal="false"
                  />
                </li>
              </ul>
            </div>
          </div>

          <!-- Rodapé com total e checkout -->
          <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
            <div
              class="flex justify-between text-base font-medium text-gray-900 mb-4"
            >
              <p>Subtotal</p>
              <p>{{ cartStore.cartSomaFormatado() }}</p>
            </div>
            <p class="mt-0.5 text-sm text-gray-500 mb-6">
              Frete e impostos calculados no checkout.
            </p>
            <button
              class="w-full bg-[#d61326] border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors cursor-pointer"
            >
              Finalizar compra
            </button>
            <div
              class="mt-6 flex justify-center text-sm text-center text-gray-500"
            >
              <p>
                ou
                <button
                  type="button"
                  class="text-[#d61326] font-medium hover:text-red-700 ml-1 cursor-pointer"
                  @click="$emit('close')"
                >
                  Continuar comprando<span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
