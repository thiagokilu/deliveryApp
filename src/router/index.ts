import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/order",
      name: "order",
      component: () => import("../views/OrderDetailsView.vue"),
    },
    {
      path: "/order/:id", // ← rota dinâmica com ID do pedido
      name: "order-details",
      component: () => import("../views/OrderDetailsView.vue"), // crie essa view
      props: true, // permite passar o `id` como prop
    },
  ],
});

export default router;
