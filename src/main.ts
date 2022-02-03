import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./utils/rem";
import { createPinia } from "pinia";
import "vant/lib/index.css";
import {
  Button,
  Cell,
  CellGroup,
  DatetimePicker,
  Empty,
  Field,
  Form,
  Icon,
  Image as VanImage,
  Popup,
  PullRefresh,
  Tab,
  Tabbar,
  TabbarItem,
  Tabs,
  Toast,
} from "vant/es";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(Toast);
app.use(Tabs);
app.use(Tab);
app.use(Field);
app.use(Form);
app.use(Button);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Icon);
app.use(Popup);
app.use(DatetimePicker);
app.use(Empty);
app.use(Cell);
app.use(CellGroup);
app.use(VanImage);
app.use(PullRefresh);
app.mount("#app");
