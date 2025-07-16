<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";
import { useOrderStore } from "@/stores/orderStore";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

// Stores e route
const cartStore = useCartStore();
const orderStore = useOrderStore();
const route = useRoute();

// ID do pedido vindo da URL
const orderId = route.params.id as string;

// Order reativo (para esperar persistência carregar)
const order = computed(() => orderStore.getOrderById(orderId));

// Limpa o carrinho ao montar a página
onMounted(() => {
  cartStore.clearCart();
  alert(
    "no memento os dados só persistem no mesmo navegador embreve será implementado um banco de dados"
  );
});

// Total calculado reativamente
const totalPedido = computed(() => {
  if (!order.value) return 0;

  return order.value.items.reduce((acc, item) => {
    const adicionais = item.adicionais?.reduce((a, ad) => a + ad.preco, 0) ?? 0;
    return acc + (item.preco + adicionais) * item.quantidade;
  }, 0);
});

const totalFormatado = computed(
  () => `R$ ${totalPedido.value.toFixed(2).replace(".", ",")}`
);

const copiarLinkPedido = () => {
  const link = `${window.location.origin}/order/${orderId}`;
  navigator.clipboard
    .writeText(link)
    .then(() => alert("Link copiado!"))
    .catch(() => alert("Erro ao copiar link"));
};

const print = () => {
  window.print();
};
</script>

<template>
  <div class="mt-20 flex flex-col items-center">
    <div class="menu flex flex-col gap-2">
      <router-link to="/">
        <button
          type="button"
          class="text-[#d61326] font-medium hover:text-red-700 ml-1 cursor-pointer mb-2"
        >
          <span aria-hidden="true"> &larr;</span> Voltar para a página inicial
        </button>
      </router-link>

      <div class="flex gap-5 items-center justify-center mb-5">
        <button
          @click="copiarLinkPedido"
          class="text-[#d61326] underline text-md"
        >
          <font-awesome-icon :icon="['fas', 'copy']" />
          Copiar link do pedido
        </button>
        <button @click="print" class="text-[#d61326] underline text-md">
          <font-awesome-icon :icon="['fas', 'print']" />
          Imprimir cupom
        </button>
      </div>
    </div>

    <!-- Verifica se o pedido foi encontrado -->
    <blockquote v-if="order" class="cupom-block">
      <div class="flex flex-col text-black text-left ml-2">
        <h1 class="text-center text-xl font-bold mb-6">Cupom Fiscal</h1>
        <p><strong>ID do Pedido:</strong> {{ order.id }}</p>

        <ul class="flex flex-col gap-4 text-sm mt-4">
          <li
            v-for="(item, index) in order.items"
            :key="item.id || index"
            class="border-t border-dashed pt-4"
          >
            <div>
              <p><strong>Produto:</strong> {{ item.nome }}</p>
              <p><strong>Descrição:</strong> {{ item.descricao }}</p>
              <p v-if="item.adicionais?.length">
                <strong>Adicionais:</strong>
                <span v-for="(adicional, i) in item.adicionais" :key="i">
                  {{ adicional.nome
                  }}<span v-if="i < item.adicionais.length - 1">, </span>
                </span>
              </p>
              <p><strong>Quantidade:</strong> {{ item.quantidade }}</p>
              <p><strong>Preço:</strong> R$ {{ item.preco.toFixed(2) }}</p>
            </div>
          </li>
        </ul>

        <div
          class="border-t border-dashed mt-6 pt-4 text-right font-bold text-base"
        >
          Total: {{ totalFormatado }}
        </div>
      </div>
    </blockquote>

    <!-- Caso não encontre o pedido -->
    <p v-else class="text-gray-500">Pedido não encontrado...</p>
  </div>
</template>

<style scoped>
.cupom-block {
  background: #fff94d;
  min-width: 320px;
  max-width: 400px;
  min-height: 200px;
  margin: 0 auto;
  position: relative;
  padding: 20px 15px;
  text-align: center;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
}

.cupom-block:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 29px;
  right: 0;
  bottom: -24px;
  left: 0;
  background: linear-gradient(-45deg, transparent 70%, #fff94d 75%),
    linear-gradient(45deg, transparent 70%, #fff94d 75%);
  background-repeat: repeat-x;
  background-size: 25px 20px, 25px 20px;
  background-position: center;
}

@page {
  size: A4 portrait;
  margin: 20mm;
}

@media print {
  body {
    background: white !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .menu {
    display: none;
  }

  /* Esconde elementos que não devem aparecer na impressão *
  

    /* Mostra somente o cupom */
  .cupom-block {
    box-shadow: none !important;
    margin: 0 auto !important;
    page-break-inside: avoid;
  }

  .cupom-block:after {
    display: none !important;
  }
}
</style>
