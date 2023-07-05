import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import '@/assets/font/iconfont.css'
import '@/assets/css/normalize.css'
import '@/assets/css/app.css'
import '@/assets/css/font.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
app.use(router).use(ElementPlus, { locale: zhCn }).mount('#app')
