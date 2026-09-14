<!-- <script setup>
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
</template> -->


<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import { useBookingStore } from "@/stores/bookingStore";
import { createBooking } from "@/services/bookingService";

const router = useRouter();

const bookingStore = useBookingStore();

const loading = ref(false);
const error = ref("");

const totalPrice = computed(() => {
  return (
    bookingStore.selectedSeats.length *
    bookingStore.ticketPrice
  );
});

const goBack = () => {
  router.back();
};

const confirmBooking = async () => {
  try {
    loading.value = true;
    error.value = "";

    const bookingData = {
      event_id: bookingStore.eventId,
      seat_ids: bookingStore.selectedSeats,
    };

    const booking = await createBooking(bookingData);

    console.log("Booking created:", booking);

    alert("Booking confirmed successfully!");

    bookingStore.clearBooking();

    router.push("/my-bookings");
  } catch (err) {
    console.error(err);
    error.value = "Could not complete the booking.";
  } finally {
    loading.value = false;
  }
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

      <p
        v-if="error"
        class="text-danger mt-3"
      >
        {{ error }}
      </p>

      <div class="mt-4">

        <button
          class="btn btn-secondary me-2"
          @click="goBack"
          :disabled="loading"
        >
          Back
        </button>

        <button
          class="btn btn-success"
          @click="confirmBooking"
          :disabled="loading"
        >
          {{ loading ? "Confirming..." : "Confirm Booking" }}
        </button>

      </div>

    </div>

  </div>
</template>