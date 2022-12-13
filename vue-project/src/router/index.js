import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/a-position',
      name: 'a-position',
      component: () => import('../views/PositionAdminView.vue')
    },
    {
      path: '/a-organization',
      name: 'a-organization',
      component: () => import('../views/OrganizationAdminView.vue')
    },
    {
      path: '/a-salary',
      name: 'a-salary',
      component: () => import('../views/SalaryAdminView.vue')
    },
    {
      path: '/search-salary',
      name: 'searchSalary',
      component: () => import('../views/SalarySearchView.vue')
    }
  ]
})

export default router
