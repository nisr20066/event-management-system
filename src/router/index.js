// const BASE_URL = 'https://eventhub-backend-m01d.onrender.com/api'

// export async function request(endpoint, options = {}) {
//   const token = localStorage.getItem('token')

//   const headers = {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     ...(token && { Authorization: `Bearer ${token}` }),
//     ...options.headers
//   }

//   const response = await fetch(`${BASE_URL}${endpoint}`, {
//     ...options,
//     headers
//   })

//   const data = await response.json().catch(() => ({}))

//   if (!response.ok) {
//     const errorMsg = data.message || `Error ${response.status}: Failed to fetch`
//     throw new Error(errorMsg)
//   }

//   return data
// }


import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      redirect: '/login'
    },

    {
      path: '/login',
      name: 'login',
      component: LoginView
    },

    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },

    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    return '/login'
  }

  if (
    (to.name === 'login' || to.name === 'register') &&
    token
  ) {
    return '/profile'
  }
})

export default router
