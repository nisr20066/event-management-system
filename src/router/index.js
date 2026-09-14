import { createRouter, createWebHistory } from 'vue-router'
import EventReviews from '../views/EventReviews.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/event-reviews',
      name: 'EventReviews',
      component: EventReviews,
    },
  ],
})

export default router