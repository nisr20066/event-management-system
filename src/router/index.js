import { createRouter, createWebHistory } from 'vue-router'
import OrganizerDashboard from '@/views/OrganizerDashboard.vue'
import MyEvents from '@/views/MyEvents.vue'
import CreateEditEvent from '@/views/CreateEditEvent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
  ],
})

export default router