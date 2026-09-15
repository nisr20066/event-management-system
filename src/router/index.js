import { createRouter, createWebHistory } from 'vue-router'
import OrganizerDashboard from '@/views/OrganizerDashboard.vue'
import MyEvents from '@/views/MyEvents.vue'
import CreateEditEvent from '@/views/CreateEditEvent.vue'

import Home from '../views/Home.vue'
import Events from '../views/Events.vue'
import EventDetails from '../views/EventDetails.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'

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
      component: OrganizerDashboard
    },
    {
      path: '/organizer/my-events',
      name: 'MyEvents',
      component: MyEvents
    },
    {
      path: '/organizer/events/create',
      name: 'CreateEvent',
      component: CreateEditEvent
    },
    {
      path: '/organizer/events/edit/:id',
      name: 'EditEvent',
      component: CreateEditEvent
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