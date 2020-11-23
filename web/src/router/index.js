import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            //hero
            {
                path: '/heros',
                name: 'heros',
                component: () => import(/* webpackChunkName: "hero" */ '../views/Data/herosData/index.vue'),
                redirect:"/heros/allHero",
                children: [
                    {
                        path: '/heros/allHero',
                        name: 'allHero',
                        component: () => import(/* webpackChunkName: "allhero" */ '../views/Data/herosData/AllHero.vue')
                    },
                    {
                        path: '/heros/mostPlayed',
                        name: 'mostPlayed',
                        component: () => import(/* webpackChunkName: "mostplayed" */ '../views/Data/herosData/mostPlayed.vue')
                    },
                    {
                        path: '/heros/rate',
                        name: 'rate',
                        component: () => import(/* webpackChunkName: "rate" */ '../views/Data/herosData/rate.vue')
                    },
                    {
                        path: '/heros/kda',
                        name: 'kda',
                        component: () => import(/* webpackChunkName: "kda" */ '../views/Data/herosData/kda.vue')
                    },
                    {
                        path: '/heros/cs',
                        name: 'cs',
                        component: () => import(/* webpackChunkName: "gpm" */ '../views/Data/herosData/cs.vue')
                    },
                    {
                        path: '/heros/dmg',
                        name: 'dmg',
                        component: () => import(/* webpackChunkName: "dmg" */ '../views/Data/herosData/dmg.vue')
                    },
                    {
                        path: '/heros/gpm',
                        name: 'gpm',
                        component: () => import(/* webpackChunkName: "dmg" */ '../views/Data/herosData/gpm.vue')
                    }

                ]
            },
            //item
            {
                path: '/items',
                name: 'items',
                component: () => import(/* webpackChunkName: "item" */ '../views/Data/itemsData/index.vue'),
                children: [

                    {
                        path: '/items/mostPlayed',
                        name: 'itemmostPlayed',
                        component: () => import(/* webpackChunkName: "mostplayed" */ '../views/Data/itemsData/mostPlayed.vue')
                    },
                    {
                        path: '/items/rate',
                        name: 'itemrate',
                        component: () => import(/* webpackChunkName: "rate" */ '../views/Data/itemsData/rate.vue')
                    },
                    {
                        path: '/items/kda',
                        name: 'itemkda',
                        component: () => import(/* webpackChunkName: "kda" */ '../views/Data/itemsData/kda.vue')
                    },

                    {
                        path: '/items/dmg',
                        name: 'itemdmg',
                        component: () => import(/* webpackChunkName: "dmg" */ '../views/Data/itemsData/dmg.vue')
                    },
                    {
                        path: '/items/gpm',
                        name: 'itemgpm',
                        component: () => import(/* webpackChunkName: "dmg" */ '../views/Data/itemsData/gpm.vue')
                    },
                    {
                        path: '/items/details/:id',
                        name: 'itemDetail',
                        component: () => import(/* webpackChunkName: "dmg" */ '../views/Data/itemsData/itemsDetail/index.vue')
                    },
                ]
            },
            //
            {
                path: '/heros/details/:id',
                redirect: { name: 'statistics' },  
                name: 'detail',
                component: () => import(/* webpackChunkName: "detailIndex" */ '../views/Data/herosData/details/index.vue'),
                children:[
                    {
                        path: '/heros/details/:id/statistics',
                        name:'statistics',
                    
                        component: () => import(/* webpackChunkName: "heroitems" */ '../views/Data/herosData/details/statistics.vue')
                    },
                    {
                        path: '/heros/details/:id/heroitems',
                    
                        component: () => import(/* webpackChunkName: "heroitems" */ '../views/Data/herosData/details/heroItems.vue')
                    },
                    {
                        path: '/heros/details/:id/skills',
                    
                        component: () => import(/* webpackChunkName: "skills" */ '../views/Data/herosData/details/skills.vue')
                    },
                    {
                        path: '/heros/details/:id/opponents',
                    
                        component: () => import(/* webpackChunkName: "opponents" */ '../views/Data/herosData/details/opponents.vue')
                    },
                    {
                        path: '/heros/details/:id/teammates',
                    
                        component: () => import(/* webpackChunkName: "teammates" */ '../views/Data/herosData/details/teammates.vue')
                    },
                    {
                        path: '/heros/details/:id/trends',
                    
                        component: () => import(/* webpackChunkName: "teammates" */ '../views/Data/herosData/details/trends.vue')
                    },
                ]
            },
        ]
    },
    {
        path: '/download',
        name: 'Download',
        component: () => import(/* webpackChunkName: "about" */ '../views/Download.vue')
    },
    {
        path: '/news',
        name: 'News',
        component: () => import(/* webpackChunkName: "about" */ '../views/News.vue')
    },

]

const router = new VueRouter({
    routes,
    // scrollBehavior:function(){
    //     return {x:0,y:0}
    // }
})

export default router
