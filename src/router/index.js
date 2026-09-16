import { createRouter, createWebHistory } from 'vue-router'


import BookingView from '@/views/BookingView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import MyBookingsView from '@/views/MyBookingsView.vue'


import EventReviews from '../views/EventReviews.vue'
import WriteReview from '../views/WriteReview.vue'
import Recommendations from '../views/Recommendations.vue'


import OrganizerDashboard from '@/views/OrganizerDashboard.vue'
import MyEvents from '@/views/MyEvents.vue'
import CreateEditEvent from '@/views/CreateEditEvent.vue'


import Home from '../views/Home.vue'
import Events from '../views/Events.vue'
import EventDetails from '../views/EventDetails.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'

import AdminDashboard from '../views/Admin/AdminDashboard.vue'
import EventsUsersManagement from '../views/Admin/EventsUsersManagement.vue'
import MyTickets from '../views/Admin/MyTickets.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/events',
      name: 'events',
      component: Events
    },
    {
      path: '/events/:id',
      name: 'event-details',
      component: EventDetails
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
    },
    {
      path: '/organizer/dashboard',
      name: 'OrganizerDashboard',
      component: OrganizerDashboard,
      meta: { requiresAuth: true, roles: ['organizer', 'admin'] }
    },
    {
      path: '/organizer/my-events',
      name: 'MyEvents',
      component: MyEvents,
      meta: { requiresAuth: true, roles: ['organizer', 'admin'] }
    },
    {
      path: '/organizer/events/create',
      name: 'CreateEvent',
      component: CreateEditEvent,
      meta: { requiresAuth: true, roles: ['organizer', 'admin'] }
    },
    {
      path: '/organizer/events/edit/:id',
      name: 'EditEvent',
      component: CreateEditEvent,
      meta: { requiresAuth: true, roles: ['organizer', 'admin'] }
    },
    {
      path: '/event-reviews/:id',
      name: 'EventReviews',
      component: EventReviews,
    },
    {
      path: '/write-review/:id',
      name: 'WriteReview',
      component: WriteReview,
      meta: { requiresAuth: true }
    },
    {
      path: '/recommendations',
      name: 'Recommendations',
      component: Recommendations,
      meta: { requiresAuth: true, roles: ['admin'] }
    },
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true, roles: ['admin'] }
    },
    {
      path: '/admin/events-users',
      name: 'EventsUsersManagement',
      component: EventsUsersManagement,
      meta: { requiresAuth: true, roles: ['admin'] }
    },
    {
      path: '/my-tickets',
      name: 'MyTickets',
      component: MyTickets,
      meta: { requiresAuth: true }
    },
    // Booking Routes
    {
      path: '/events/:id/booking',
      name: 'booking',
      component: BookingView,
      meta: { requiresAuth: true }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
      meta: { requiresAuth: true }
    },
    {
      path: '/my-bookings',
      name: 'my-bookings',
      component: MyBookingsView,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  let user = null
  try {
    user = JSON.parse(localStorage.getItem('user') || 'null')
  } catch {
    localStorage.removeItem('user')
  }

  if (to.meta.requiresAuth && !token) {
    return {
      name: 'login',
      query: { redirect: to.fullPath }
    }
  }

  if (to.meta.roles && !to.meta.roles.includes(String(user?.role || '').toLowerCase())) {
    return { name: 'home' }
  }

  if (
    (to.name === 'login' || to.name === 'register') &&
    token
  ) {
    return '/profile'
  }
})

export default router
