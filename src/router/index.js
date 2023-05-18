import { createRouter, createWebHistory } from 'vue-router';
import MainPageView from '@/components/HomeView.vue';
import PofolView from "@/components/PofolView.vue";

const routes = [
  {
    path: '/home',
    name: 'home',
    component: MainPageView,
  },
  {
    path: '/portfolios',
    name: 'portfolios',
    component: PofolView,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;