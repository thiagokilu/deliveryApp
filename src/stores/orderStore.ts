// src/stores/orderStore.ts
import { defineStore } from "pinia";

import { nanoid } from "nanoid"; // você pode instalar com `npm i nanoid`

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
  quantidade: number;
  adicionais?: Adicional[];
}

interface Order {
  id: string; // ID único do pedido
  items: Product[];
  createdAt: string; // data/hora
}

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [] as Order[],
  }),
  actions: {
    saveOrder(products: Product[]): string {
      const id = nanoid(); // gera um ID único
      const newOrder: Order = {
        id,
        items: products,
        createdAt: new Date().toISOString(),
      };
      this.orders.push(newOrder);
      return id;
    },
    getOrderById(id: string): Order | undefined {
      return this.orders.find((o) => o.id === id);
    },
  },
  persist: true,
});
