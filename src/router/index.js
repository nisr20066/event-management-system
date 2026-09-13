

import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Events from '../views/Events.vue'
import EventDetails from '../views/EventDetails.vue'

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
    }

  ]

})

export default router