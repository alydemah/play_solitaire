import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

// Create Pinia instance
const pinia = createPinia()

// Create Vue app
const app = createApp(App)

// Install plugins
app.use(pinia)

// Mount app
app.mount('#app')