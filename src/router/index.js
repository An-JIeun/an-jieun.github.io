import { createRouter, createWebHistory } from 'vue-router';
import MainPageView from '@/components/HomeView.vue';
import PofolView from "@/components/PofolView.vue";
import HomeView from "@/components/EnterView.vue"
import StudyView from "@/components/StudyView.vue"

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
  {
    path: '/',
    name: 'home2',
    component: HomeView,
  },
  {
    path: '/study',
    name: 'study',
    component: StudyView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;