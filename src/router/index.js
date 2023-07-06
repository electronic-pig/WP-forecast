import { createRouter, createWebHistory } from 'vue-router'

const MainFrame = () => import('@/views/MainFrame.vue')
const PowerPredict = () => import('@/views/mainFunc/PowerPredict.vue')

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
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
export default router
