import Vue from 'vue'
import VueRouter, { RouteConfig, Route, NavigationGuardNext } from 'vue-router'
import { userSessionKey, authorities } from '@/config/config'

import DefaultLayout from '../components/layout/DefaultLayout.vue'
import HomeLayout from '../components/layout/HomeLayout.vue'
import DashboardLayout from '../components/layout/DashboardLayout.vue'
import RegistrationLayout from '../components/layout/RegistrationLayout.vue'
import AdministrationLayout from '../components/layout/AdministrationLayout.vue'
import ShoppingLayout from '../components/layout/ShoppingLayout.vue'
import LoginLayout from '../components/layout/LoginLayout.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: 'home',
    component: DefaultLayout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: HomeLayout
      }
    ]
  }, {
    path: '/dashboard',
    redirect: 'dashboard',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: DashboardLayout
      }
    ]
  }, {
    path: '/registration',
    redirect: 'registration',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'registration',
        component: RegistrationLayout
      },
      {
        path: 'departments',
        redirect: 'departments',
        component: RegistrationLayout,
        children: [
          {
            path: '',
            name: 'departments',
            component: () => import(/* webpackChunkName: "departments" */ '@/views/registration/departments/DepartmentList.vue')
          }, {
            path: 'add',
            name: 'departments.add',
            component: () => import(/* webpackChunkName: "departments" */ '@/views/registration/departments/DepartmentForm.vue')
          }, {
            path: 'edit',
            name: 'departments.edit',
            props: (route) => ({ id: route.params.id, editing: true }),
            component: () => import(/* webpackChunkName: "departments" */ '@/views/registration/departments/DepartmentForm.vue')
          }, {
            path: 'delete',
            name: 'departments.delete',
            props: (route) => ({ id: route.params.id, deleting: true }),
            component: () => import(/* webpackChunkName: "departments" */ '@/views/registration/departments/DepartmentForm.vue')
          }, {
            path: 'detail',
            name: 'departments.detail',
            props: (route) => ({ id: route.params.id, detailing: true }),
            component: () => import(/* webpackChunkName: "departments" */ '@/views/registration/departments/DepartmentForm.vue')
          }
        ]
      },
      {
        path: 'products',
        redirect: 'products',
        component: RegistrationLayout,
        children: [
          {
            path: '',
            name: 'products',
            component: () => import(/* webpackChunkName: "products" */ '@/views/registration/products/ProductList.vue')
          }, {
            path: 'add',
            name: 'products.add',
            component: () => import(/* webpackChunkName: "products" */ '@/views/registration/products/ProductForm.vue')
          }, {
            path: 'edit',
            name: 'products.edit',
            props: (route) => ({ id: route.params.id, editing: true }),
            component: () => import(/* webpackChunkName: "products" */ '@/views/registration/products/ProductForm.vue')
          }, {
            path: 'delete',
            name: 'products.delete',
            props: (route) => ({ id: route.params.id, deleting: true }),
            component: () => import(/* webpackChunkName: "products" */ '@/views/registration/products/ProductForm.vue')
          }, {
            path: 'detail',
            name: 'products.detail',
            props: (route) => ({ id: route.params.id, detailing: true }),
            component: () => import(/* webpackChunkName: "products" */ '@/views/registration/products/ProductForm.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/administration',
    redirect: 'administration',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'administration',
        component: AdministrationLayout
      },
      {
        path: 'users',
        redirect: 'users',
        component: AdministrationLayout,
        children: [
          {
            path: '',
            name: 'users',
            component: () => import(/* webpackChunkName: "users" */ '@/views/administration/users/UserList.vue')
          }, {
            path: 'add',
            name: 'users.add',
            component: () => import(/* webpackChunkName: "users" */ '@/views/administration/users/UserForm.vue')
          }, {
            path: 'edit',
            name: 'users.edit',
            props: (route) => ({ id: route.params.id, editing: true }),
            component: () => import(/* webpackChunkName: "users" */ '@/views/administration/users/UserForm.vue')
          }, {
            path: 'delete',
            name: 'users.delete',
            props: (route) => ({ id: route.params.id, deleting: true }),
            component: () => import(/* webpackChunkName: "users" */ '@/views/administration/users/UserForm.vue')
          }, {
            path: 'detail',
            name: 'users.detail',
            props: (route) => ({ id: route.params.id, detailing: true }),
            component: () => import(/* webpackChunkName: "users" */ '@/views/administration/users/UserForm.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/shopping',
    redirect: 'shopping',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'shopping',
        component: ShoppingLayout
      },
      {
        path: 'plannings',
        redirect: 'plannings',
        component: ShoppingLayout,
        children: [
          {
            path: '',
            name: 'plannings',
            component: () => import(/* webpackChunkName: "plannings" */ '@/views/shopping/planning/PlanningList.vue')
          },
          {
            path: 'add',
            name: 'plannings.add',
            component: () => import(/* webpackChunkName: "plannings" */ '@/views/shopping/planning/PlanningForm.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    redirect: 'login',
    component: LoginLayout,
    children: [
      {
        path: '',
        name: 'login',
        component: () => import(/* webpackChunkName: "public" */ '../views/Login.vue')
      }
    ]
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import(/* webpackChunkName: "public" */ '@/views/ForgotPassword.vue')
  },
  {
    path: '/error',
    component: DefaultLayout,
    children: [
      {
        path: '/401',
        name: '401',
        component: () => import(/* webpackChunkName: "401" */ '../views/errors/401.vue')
      },
      {
        path: '/403',
        name: '403',
        component: () => import(/* webpackChunkName: "403" */ '../views/errors/403.vue')
      },
      {
        path: '/404',
        name: '404',
        component: () => import(/* webpackChunkName: "404" */ '../views/errors/404.vue')
      },
      {
        path: '/500',
        name: '500',
        component: () => import(/* webpackChunkName: "500" */ '../views/errors/500.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: '404'
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-active'
})

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
  const userSession = Vue.prototype.$cookies.get(userSessionKey)
  if (to.matched.some(route => route.meta.authenticated) && userSession === null) {
    next({ name: 'login', params: { redirect: to.path } })
  } else {
    next()
  }
})

export default router
