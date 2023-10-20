import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PowerPredict from '../views/PowerPredict.vue'
import DataAnalysis from '../views/DataAnalysis.vue'
import IndustryTrending from '../views/IndustryTrending.vue'
import MapPredict from '../views/MapPredict.vue'
import TurbineManage from '../views/TurbineManage.vue'
import ModelTraining from '../views/ModelTraining.vue'

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
    path: '/ModelTraining',
    name: 'ModelTraining',
    component: ModelTraining
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
