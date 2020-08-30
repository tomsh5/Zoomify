import vue from 'vue'
import app from './app.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/store.js'
import "element-ui/lib/theme-chalk/index.css";
import "./assets/styles/main.scss";
import ElementUI from "element-ui";
import { ValidationProvider } from "vee-validate";

import locale from 'element-ui/lib/locale/lang/en'


vue.component("ValidationProvider", ValidationProvider);

vue.use(ElementUI, {locale});

vue.config.productionTip = false

new vue({
	router,
	store,
	render: (h) => h(app),
}).$mount("#app");
