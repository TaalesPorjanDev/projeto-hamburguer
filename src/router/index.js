import Home from '@/views/Home.vue'
import Pedidos from '@/views/Pedidos.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/pedidos',
      name: 'Pedidos',
      component: Pedidos
    }
  ],
})

export default router
