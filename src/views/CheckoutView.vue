<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

import { useBookingStore } from "@/stores/bookingStore";

const router = useRouter();

const bookingStore = useBookingStore();

const totalPrice = computed(() => {
  return (
    bookingStore.selectedSeats.length *
    bookingStore.ticketPrice
  );
});

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="container py-5">

    <h1>Checkout</h1>

    <div class="card mt-4 p-4">

      <h3>{{ bookingStore.eventTitle }}</h3>

      <p>
        Number of seats:
        {{ bookingStore.selectedSeats.length }}
      </p>

      <p>
        Ticket price:
        {{ bookingStore.ticketPrice }}
      </p>

      <hr />

      <h4>
        Total:
        {{ totalPrice }}
      </h4>

      <button
        class="btn btn-secondary mt-3"
        @click="goBack"
      >
        Back
      </button>

    </div>

  </div>
</template>