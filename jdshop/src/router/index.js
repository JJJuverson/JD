import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    /* name: 'login', */
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/index',
    name: 'index',
    component: () => import(/* webpackChunkName: "about" */ '../views/Index.vue')
  },
  //二级路由
  {
    path: '/botnav',
    name: 'botnav',
    component: () => import(/* webpackChunkName: "about" */ '../views/Botnav.vue'),
	children:[
		{
		  path: 'index',
		  name: '首页',
		  component: () => import(/* webpackChunkName: "about" */ '../views/Index.vue')
		},
		{
		  path: 'list',
		  name: '分类',
		  component: () => import(/* webpackChunkName: "about" */ '../views/List.vue')
		},
		{
		  path: 'search',
		  name: '搜索',
		  component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
		},
		{
		  path: 'cart',
		  name: '购物车',
		  meta:{
			  requireAuth:true, //当有这个字段时，我们就认为这个路由页面是要有登录权限的
		  },
		  component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue')
		},
		{
		  path: 'mine',
		  name: '我的',
		  meta:{
		  			  requireAuth:true, //当有这个字段时，我们就认为这个路由页面是要有登录权限的
		  },
		  component: () => import(/* webpackChunkName: "about" */ '../views/Mine.vue')
		}
	]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
