import { createRouter, createWebHistory } from 'vue-router'
import EventReviews from '../views/EventReviews.vue'
import WriteReview from '../views/WriteReview.vue'
import Recommendations from '../views/Recommendations.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/event-reviews/:id',
      name: 'EventReviews',
      component: EventReviews,
    },
    {
      path: '/write-review/:id',
      name: 'WriteReview',
      component: WriteReview,
    },
    {
      path: '/recommendations',
      name: 'Recommendations',
      component: Recommendations,
    },
  ],
})

export default router