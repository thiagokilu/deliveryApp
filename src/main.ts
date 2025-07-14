import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia"; // ✅ Novo
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faStar,
  faPlusCircle,
  faShareSquare,
  faCartShopping,
  faMagnifyingGlass,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faStar,
  faPlusCircle,
  faShareSquare,
  faCartShopping,
  faMagnifyingGlass,
  faTrash
);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);

app.mount("#app");
