import Vue from 'vue'
import Router from 'vue-router'
import Homm from "@/horm/Homm"
import Search from '@/horm/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homm',
      component: Homm
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
