import App from "./App.vue";
import { createApp } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import router from "@/router";
import store from "./store";
import "@/plugins/axios";

const app = createApp(App);

app.use(Antd).use(router).use(store).mount("#app");
