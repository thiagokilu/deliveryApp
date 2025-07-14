<script setup lang="ts">
const props = defineProps({
  showModal: Boolean,
  img: String,
  nome: String,
  descricao: String,
  preco: Number,
});
</script>

<template>
  <div
    class="w-72 h-[400px] flex flex-col bg-white rounded-xl shadow-lg overflow-hidden items-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
  >
    <div class="relative w-full">
      <span
        class="absolute top-3 left-3 bg-[#d61326] text-white text-xs font-bold px-2 py-1 rounded-full"
        >MAIS VENDIDA</span
      >
      <img :src="img" alt="Pizza calabresa com catupiry" class="w-full h-52" />
    </div>

    <div class="p-4 w-full">
      <h2 class="text-lg font-semibold text-gray-900">{{ nome }}</h2>
      <p class="text-sm text-gray-600 mt-1">
        {{ descricao }}
      </p>

      <div class="flex items-center mt-2">
        <div class="flex text-yellow-400">
          <font-awesome-icon :icon="['fas', 'star']" v-for="i in 5" :key="i" />
        </div>
        <span class="text-gray-500 text-sm ml-1">(128)</span>
      </div>

      <div class="flex flex-row items-center w-full justify-between mt-5">
        <p class="text-2xl font-semibold text-green-600">
          {{
            preco?.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          }}
        </p>
        <button
          class="bg-[#d61326] text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-[#b01020] transition-colors cursor-pointer"
          @click="$emit('open-modal', { img, nome, descricao, preco })"
        >
          Adicionar
          <font-awesome-icon :icon="['fas', 'circle-plus']" />
        </button>
      </div>
    </div>
  </div>
</template>
