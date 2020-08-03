import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
        {
            path: '/categories/create',
            component:  CategoryEdit,
        },
        {
            path: '/categories/list',
            component: CategoryList,
        },
        {
            path: '/categories/edit/:id',
            component: CategoryEdit,
            props:true  //注入所有路由参数
        },
        {
            path: '/items/create',
            component:  ItemEdit,
        },
        {
            path: '/items/list',
            component: ItemList,
        },
        {
            path: '/items/edit/:id',
            component: ItemEdit,
            props:true  //注入所有路由参数
        },
        {
            path: '/heroes/create',
            component:  HeroEdit,
        },
        {
            path: '/heroes/list',
            component: HeroList,
        },
        {
            path: '/heroes/edit/:id',
            component: HeroEdit,
            props:true  //注入所有路由参数
        }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
