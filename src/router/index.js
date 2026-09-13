
import { createRouter, createWebHistory } from "vue-router";

import BookingView from "@/views/BookingView.vue";
import CheckoutView from "@/views/CheckoutView.vue";
import MyBookingsView from "@/views/MyBookingsView.vue";

const routes = [
  {
    path: "/events/:id/booking",
    name: "booking",
    component: BookingView,
  },

  {
    path: "/checkout",
    name: "checkout",
    component: CheckoutView,
  },

  {
    path: "/my-bookings",
    name: "my-bookings",
    component: MyBookingsView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;


