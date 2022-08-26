import "./styles/base.scss";
import App from "./App.vue";
import { createApp } from "vue";

export const app = createApp(App);

async function init() {
  // 挂载
  app.mount("#app");
}

init();
