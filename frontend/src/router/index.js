import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PowerPredict from '@/views/PowerPredict.vue'
import DataAnalysis from '@/views/DataAnalysis.vue'
import IndustryTrending from '@/views/IndustryTrending.vue'
import MapPredict from '@/views/MapPredict.vue'
import TurbineManage from '@/views/TurbineManage.vue'
import KnowledgePage from '@/views/KnowledgePage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
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
    },
    {
      path: '/MapPredict',
      name: 'MapPredict',
      component: MapPredict
    },
    {
      path: '/TurbineManage',
      name: 'TurbineManage',
      component: TurbineManage
    },
    {
      path: '/KnowledgePage',
      name: 'KnowledgePage',
      component: KnowledgePage
    }
  ]
})

export default router
