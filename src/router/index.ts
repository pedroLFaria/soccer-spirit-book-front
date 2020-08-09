import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/characters-book',
    name: 'CharactersBook',
    component: () => import('../views/CharactersBook.vue')
  },
  {
    path: '/stones-book',
    name: 'StonesBook',
    component: () => import('../views/StonesBook.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
