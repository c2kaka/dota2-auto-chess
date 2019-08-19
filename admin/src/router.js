import Vue from 'vue'
import Router from 'vue-router'
import ListContainer from './views/ListContainer'
import CategoryEdit from './views/CategoryEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: ListContainer,
      children:[
        {path: '/categories/create',component: CategoryEdit}
      ]
    }
  ]
})
