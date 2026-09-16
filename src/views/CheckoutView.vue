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
  <div class="container py-5 checkout-page">

    <p class="eyebrow">STEP 2 OF 2</p>
    <h1>Review and confirm</h1>

    <div class="card checkout-card">

      <span class="ticket-label">EVENT TICKET</span>
      <h3>{{ bookingStore.eventTitle || 'Your event' }}</h3>

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

      <div class="checkout-actions">

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

<style scoped>
.checkout-page{max-width:720px}.eyebrow,.ticket-label{color:#fb923c;font-size:.75rem;font-weight:800;letter-spacing:.12em}.checkout-card{margin-top:22px!important;padding:30px!important}.checkout-card h3{font-size:1.55rem;margin:10px 0 24px}.checkout-card p{display:flex;justify-content:space-between;color:#cbd5e1}.checkout-card h4{font-size:1.4rem;color:#fff}.checkout-card hr{border:0;border-top:1px solid #475569;margin:24px 0}.checkout-actions{display:flex;gap:12px;margin-top:24px}.checkout-actions .btn-success{background:#f97316!important}@media(max-width:500px){.checkout-actions{flex-direction:column}}
</style>
