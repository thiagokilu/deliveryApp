<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard.vue";

// Assets
import pizzaImg from "../../assets/images/pizza3.png";
import burguerImg from "../../assets/images/burguer1.png";
import hotdogImg from "../../assets/images/hotdog1.png";
import AdicionalModal from "../ProducModal/AdicionalModal.vue";
import Cart from "../Cart/Cart.vue";

// Tipos
type Produto = {
  id: number;
  img: string;
  nome: string;
  descricao: string;
  preco: number;
  adicionais?: {
    nome: string;
    preco: number;
    selecionado: boolean;
  }[];
};

type Cardapio = {
  lanches?: Produto[];
  pizzas?: Produto[];
  porcoes?: Produto[];
  bebidas?: Produto[];
};

// Estado do modal
const showModal = ref(false);
const produtoSelecionado = ref<Produto>({
  id: 0,
  img: "",
  nome: "",
  descricao: "",
  preco: 0,
  adicionais: [],
});

// Função para abrir modal
function abrirModal(produto: Produto): void {
  produtoSelecionado.value = produto;
  showModal.value = true;
}

// Estado da API
const cardapio = ref<Cardapio>({});
const loading = ref<boolean>(true);
const error = ref<string | null>(null);

// Fetch data
const fetchCardapio = async (): Promise<void> => {
  try {
    loading.value = true;
    const response = await axios.get<Cardapio>(
      "https://deliveryapp-2pr1.onrender.com/cardapio"
    );
    cardapio.value = response.data;
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : "Erro desconhecido";
  } finally {
    loading.value = false;
  }
};
const categorias = ["lanches", "pizzas", "porcoes", "bebidas"] as const;
type Categoria = (typeof categorias)[number]; // "lanches" | "pizzas" | "porcoes" | "bebidas"
const categoriaSelecionada = ref<Categoria>("lanches");

// Lifecycle hook
onMounted(async (): Promise<void> => {
  await fetchCardapio();
  console.log("Dados do cardápio:", cardapio.value);
  const categoriaSelected = cardapio.value["pizzas"];
  console.log(categoriaSelected);
});

function removerAcentos(texto: string): string {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const emit = defineEmits(["open-cart"]);

const termoBusca = ref("");
const todosProdutos = computed(() => {
  const categoriasDisponiveis = Object.values(cardapio.value);
  return categoriasDisponiveis.flatMap((lista) => lista ?? []);
});

// Computado com os resultados
const resultadosBusca = computed(() => {
  if (!termoBusca.value) return [];

  const termo = removerAcentos(termoBusca.value.toLowerCase());

  return todosProdutos.value.filter((produto) => {
    const nome = removerAcentos(produto.nome.toLowerCase());
    const descricao = removerAcentos(produto.descricao.toLowerCase());

    return nome.includes(termo) || descricao.includes(termo);
  });
});
</script>

<template>
  <main class="ml-10 mr-10">
    <div
      class="relative flex flex-row gap-5 mt-20 mb-10 items-center justify-center w-full"
    >
      <div class="max-w-96 relative flex flex-row items-center justify-center">
        <input
          type="text"
          name="search"
          id="search"
          class="min-w-96 bg-white text-black placeholder-stone-500 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 rounded-lg px-4 py-2"
          placeholder="Oque você vai querer hoje ?"
          v-model="termoBusca"
        />
        <font-awesome-icon
          :icon="['fas', 'magnifying-glass']"
          class="text-black absolute right-2"
        />
      </div>
    </div>
    <div class="filter-buttons">
      <button
        v-for="cat in categorias"
        :key="cat"
        :class="['filter-btn', { active: categoriaSelecionada === cat }]"
        @click="categoriaSelecionada = cat"
      >
        {{ cat }}
      </button>
    </div>

    <div class="flex items-center justify-center mt-20">
      <h1 v-if="loading" class="text-4xl text-black">Loading...</h1>
    </div>

    <!-- Se estiver buscando, mostra só os resultados -->
    <section v-if="termoBusca" class="flex flex-col items-center pb-10">
      <h2 class="text-xl font-bold mb-4 mt-5">Resultados da busca</h2>
      <div
        v-if="resultadosBusca.length"
        class="flex flex-wrap gap-4 items-center justify-center"
      >
        <ProductCard
          v-for="(produto, index) in resultadosBusca"
          :key="index"
          :showModal="showModal"
          :img="produto.img"
          :nome="produto.nome"
          :descricao="produto.descricao"
          :preco="produto.preco"
          @open-modal="abrirModal(produto)"
        />
      </div>
      <p v-else class="text-gray-500">Nenhum produto encontrado.</p>
    </section>

    <!-- Se não estiver buscando, mostra os produtos da categoria -->
    <section
      v-else-if="
        cardapio[categoriaSelecionada] && cardapio[categoriaSelecionada]?.length
      "
      class="flex flex-col gap-5 items-center pb-20"
    >
      <h2
        class="lg:text-4xl md:text-3xl text-2xl font-bold mb-4 capitalize mt-5"
      >
        {{ categoriaSelecionada }}
      </h2>
      <div class="flex flex-wrap gap-4 items-center justify-center">
        <ProductCard
          v-for="(produto, index) in cardapio[categoriaSelecionada]"
          :key="index"
          :showModal="showModal"
          :img="produto.img"
          :nome="produto.nome"
          :descricao="produto.descricao"
          :preco="produto.preco"
          @open-modal="abrirModal(produto)"
        />
      </div>
    </section>

    <AdicionalModal
      :id="produtoSelecionado.id"
      :visible="showModal"
      :img="produtoSelecionado.img"
      :nome="produtoSelecionado.nome"
      :descricao="produtoSelecionado.descricao"
      :preco="produtoSelecionado.preco"
      :adicionais="produtoSelecionado.adicionais"
      @close="showModal = false"
      @open-cart="emit('open-cart')"
    />
  </main>
</template>

<style>
.filter-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background-color: #f0f0f0;
  color: #333;
  cursor: pointer;
}

.filter-btn.active {
  background-color: #e32636;
  color: white;
}

.product-item {
  margin: 10px 0;
  padding: 10px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
