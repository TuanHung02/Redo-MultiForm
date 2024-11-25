import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import store from './store'

const app = createApp(App)
app.use(store) // Kết nối store
app.mount('#app')
