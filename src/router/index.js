import { createRouter, createWebHistory } from 'vue-router'
import EventReviews from '../views/EventReviews.vue'
import WriteReview from '../views/WriteReview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/event-reviews',
      name: 'EventReviews',
      component: EventReviews,
    },
    {
      path: '/write-review',
      name: 'WriteReview',
      component: WriteReview,
    },
  ],
})

export default router