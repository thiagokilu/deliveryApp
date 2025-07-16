import { defineStore } from "pinia";

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
  quantidade: number; // 👈 Quantidade adicionada
  adicionais?: Adicional[];
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [] as Product[],
  }),

  actions: {
    cartAdd(product: Product) {
      const produtoComQuantidade = {
        ...product,
        quantidade: product.quantidade ?? 1, // se não tiver, assume 1
      };

      const existing = this.cart.find((p) => p.id === produtoComQuantidade.id);

      if (existing) {
        existing.quantidade += produtoComQuantidade.quantidade;
      } else {
        this.cart.push(produtoComQuantidade);
      }
    },

    cartRemove(id: Number) {
      this.cart = this.cart.filter((item) => item.id !== id);
    },

    cartSoma() {
      return this.cart.reduce(
        (total, item) => total + item.preco * item.quantidade,
        0
      );
    },

    cartSomaFormatado() {
      const total = this.cartSoma();
      return `R$ ${total.toFixed(2).replace(".", ",")}`;
    },
    updateQuantidade(id: number, novaQuantidade: number) {
      const item = this.cart.find((p) => p.id === id);
      if (item && novaQuantidade > 0) {
        item.quantidade = novaQuantidade;
      }
    },
    clearCart() {
      this.cart = [];
    },
  },
  persist: true, // 👈 ativa persistência automática
});
