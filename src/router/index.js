import Vue from 'vue'
import Router from 'vue-router'
import PKMain from '@/views/PKMain'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PKMain',
      component: PKMain
    },
  ]
})
