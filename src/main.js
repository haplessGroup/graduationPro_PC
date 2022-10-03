import { createApp,Vue } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import store from './store/index.js'

const app=createApp(App)
app.use(router).use(ElementPlus).use(store).mount('#app')
