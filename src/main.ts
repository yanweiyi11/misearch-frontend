import App from "./App.vue";
import { createApp } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import router from "@/router";

const app = createApp(App);

app.use(Antd).use(router).mount("#app");
