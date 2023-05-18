import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./index.css";



// navbar추가

// navbar-icon
// import Vue from 'vue'

const app = createApp(App)
app.use(router).mount('#app')
