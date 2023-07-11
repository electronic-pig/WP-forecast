import { createRouter, createWebHistory } from 'vue-router'

const MainFrame = () => import('@/views/MainFrame.vue')
const PowerPredict = () => import('@/views/mainFunc/PowerPredict.vue')
const WeatherData = () => import('@/views/mainFunc/WeatherData.vue')

const routes = [
  {
    path: '/',
    redirect: '/PowerPredict'
  },
  {
    path: '/MainFrame',
    name: 'MainFrame',
    component: MainFrame,
    children: [
      {
        path: '/PowerPredict',
        name: 'PowerPredict',
        component: PowerPredict,
      },
      {
        path: '/WeatherData',
        name: 'WeatherData',
        component: WeatherData,
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
export default router
