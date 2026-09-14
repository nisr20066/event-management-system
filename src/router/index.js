import { createRouter, createWebHistory } from 'vue-router'

import AdminDashboard from '../views/Admin/AdminDashboard.vue'
import EventsUsersManagement from '../views/Admin/EventsUsersManagement.vue'
import MyTickets from '../views/Admin/MyTickets.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: AdminDashboard
    },
    {
      path: '/admin/events-users',
      name: 'EventsUsersManagement',
      component: EventsUsersManagement
    },
    {
      path: '/my-tickets',
      name: 'MyTickets',
      component: MyTickets
    }
  ],
})

export default router