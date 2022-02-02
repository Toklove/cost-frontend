import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./utils/rem";
import { createPinia } from "pinia";
import { Toast } from "vant";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(Toast);
app.mount("#app");
