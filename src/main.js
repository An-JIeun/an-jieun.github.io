import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./index.css";
import VNetworkGraph from "v-network-graph"
import "v-network-graph/lib/style.css"



// navbar추가

// navbar-icon
// import Vue from 'vue'

const app = createApp(App)
app.use(router).use(VNetworkGraph).mount('#app')

// network graph 추가


