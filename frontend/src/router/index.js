import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PowerPredict from '../views/PowerPredict.vue'
import DataAnalysis from '../views/DataAnalysis.vue'
import IndustryTrending from '../views/IndustryTrending.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/PowerPredict',
    name: 'PowerPredict',
    component: PowerPredict
  },
  {
    path: '/DataAnalysis',
    name: 'DataAnalysis',
    component: DataAnalysis
  },
  {
    path: '/IndustryTrending',
    name: 'IndustryTrending',
    component: IndustryTrending
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
