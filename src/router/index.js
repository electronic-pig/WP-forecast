import { createRouter, createWebHistory } from 'vue-router'

const MainFrame = () => import('@/views/MainFrame.vue')
const PowerPredict = () => import('@/views/mainFunc/PowerPredict.vue')
const WeatherData = () => import('@/views/mainFunc/WeatherData.vue')

const LoginView = () => import('@/views/LoginView.vue')
const RegisterView = () => import('@/views/RegisterView.vue')
const HistoryList = () => import('@/views/mainFunc/HistoryList.vue')
const HistoryVue = () => import('@/views/mainFunc/WindData.vue')
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
        props: true,
      },
      {
        path: '/WeatherData',
        name: 'WeatherData',
        component: WeatherData,
      },
        props: true,
      },
      {
        path: '/History',
        name: 'History',
        component: HistoryVue,
        props: true,
      }
    ]
  },
  {
    path:'/LoginView',
    name:'LoginView',
    component: LoginView
  },
  {
    path:'/RegisterView',
    name:'RegisterView',
    component: RegisterView
  },
  {
    path:'/HistoryList',
    name:'HistoryList',
    component: HistoryList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
export default router
