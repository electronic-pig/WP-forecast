import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView'
import PowerPredict from '../views/PowerPredict'
import DataAnalysis from '../views/DataAnalysis'
import IndustryTrending from '../views/IndustryTrending'
import MapPredict from '../views/MapPredict'
import TurbineManage from '../views/TurbineManage'
import KnowledgePage from '../views/KnowledgePage'

const routes = [
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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
