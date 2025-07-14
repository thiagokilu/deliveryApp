<template>
  <div
    class="flex items-start gap-4 p-4 border-b border-gray-200 last:border-b-0"
  >
    <!-- Imagem do produto -->
    <div class="w-24 h-24 flex-shrink-0">
      <img
        :src="img || 'https://via.placeholder.com/100'"
        :alt="nome"
        class="w-full h-full object-cover rounded-lg"
      />
    </div>

    <!-- Detalhes do produto -->
    <div class="flex-1">
      <h3 class="text-lg font-semibold text-gray-800">{{ nome }}</h3>

      <p v-if="descricao" class="text-sm text-gray-500 mt-1">{{ descricao }}</p>

      <!-- Adicionais -->
      <div v-if="adicionais && adicionais.length" class="mt-2">
        <p class="text-xs font-medium text-gray-600">Adicionais:</p>
        <ul class="flex flex-wrap gap-1 mt-1">
          <li
            v-for="(adicional, index) in adicionais"
            :key="index"
            class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
          >
            {{ adicional.nome }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Preço -->
    <div class="flex flex-col items-end gap-2">
      <input
        type="number"
        v-model="quantidadeLocal"
        @change="atualizarQuantidade"
        min="1"
        placeholder="Qtd"
        class="bg-gray-100 text-gray-700 max-w-10 no-spinner"
      />

      <span class="text-lg font-bold text-gray-900">{{
        formatarPreco(preco * quantidade)
      }}</span>
      <div @click="cartRemove(id)">
        <font-awesome-icon
          :icon="['fas', 'trash']"
          class="text-red-500 text-lg sm:text-xl cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useCartStore } from "@/stores/cartStore";

// Tipagem do adicional
interface Adicional {
  nome: string;
}

// Tipagem das props
const props = defineProps<{
  id: number;
  showModal: boolean;
  img?: string;
  nome?: string;
  descricao?: string;
  preco: number;
  adicionais?: Adicional[];
  quantidade: number;
}>();

const cartStore = useCartStore();
const quantidadeLocal = ref(props.quantidade);

// Atualiza a store quando o input muda
function atualizarQuantidade() {
  cartStore.updateQuantidade(props.id, quantidadeLocal.value);
}

// Remover item do carrinho
function cartRemove(id: number) {
  cartStore.cartRemove(id);
}

// Formata valor para BRL
function formatarPreco(valor: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

// Atualiza `quantidadeLocal` se a prop mudar
watch(
  () => props.quantidade,
  (newVal) => {
    quantidadeLocal.value = newVal;
  }
);
</script>

<style>
/* Remove as setas do input type="number" */
.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.no-spinner {
  -moz-appearance: textfield; /* Firefox */
}
</style>
