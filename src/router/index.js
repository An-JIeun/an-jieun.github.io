import { createRouter, createWebHistory } from 'vue-router';
import MainPageView from '@/components/HomeView.vue';
import PofolView from "@/components/PofolView.vue";
import HomeView from "@/components/EnterView.vue"

const routes = [
  {
    path: '/about',
    name: 'about',
    component: MainPageView,
  },
  {
    path: '/portfolios',
    name: 'portfolios',
    component: PofolView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;