import { createApp } from 'vue';
import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App);
app.use(router);
app.use(ElementPlus,{locale: zhCn});
app.mount('#app');
