import { createApp } from 'vue'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css' 
import './main.css'
import store from './store'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'


const app= createApp(App)

app.use(router)
app.use(store)
app.use(Antd)
app.mount('#app')


