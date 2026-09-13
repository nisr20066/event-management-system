<!-- <script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getEventSeats } from "@/services/bookingService";

const route = useRoute();

const seats = ref({});
const loading = ref(true);

const fetchSeats = async () => {
  try {
    const data = await getEventSeats(route.params.id);

    seats.value = data.rows;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchSeats();
});
</script>

<template>
  <div class="container py-5">
    <h2>Select Seats</h2>

    <div v-if="loading">
      Loading...
    </div>

    <pre v-else>
      {{ seats }}
    </pre>
  </div>
</template> -->


<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { getEventSeats,getEvent } from "@/services/bookingService";
import { useBookingStore } from "@/stores/bookingStore";


const route = useRoute();
const router = useRouter();

const bookingStore = useBookingStore();

const seats = ref({});
const loading = ref(true);
const error = ref("");

const selectSeat = (seat) => {
  if (seat.status === "booked") {
    return;
  }

  bookingStore.toggleSeat(seat.id);
};

const goToCheckout = () => {
  if (bookingStore.selectedSeats.length === 0) {
    alert("Please select at least one seat.");
    return;
  }

  router.push("/checkout");
};

const fetchSeats = async () => {
  try {
    loading.value = true;
    error.value = "";

    const eventId = route.params.id;

    const event = await getEvent(eventId);

    bookingStore.setEvent(event);

    const data = await getEventSeats(eventId);

    seats.value = data.rows;
  } catch (err) {
    console.error(err);
    error.value = "Could not load seats.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchSeats();
});
</script>

<template>
  <div class="container py-5">

    <h1 class="mb-4">Select Your Seats</h1>

    <!-- Loading -->
    <div v-if="loading">
      <p>Loading seats...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error">
      <p class="text-danger">
        {{ error }}
      </p>
    </div>

    <!-- Seats -->
    <div v-else>

      <div
        v-for="(rowSeats, rowLabel) in seats"
        :key="rowLabel"
        class="mb-4"
      >

        <div class="d-flex align-items-center gap-3">

          <strong style="width: 30px;">
            {{ rowLabel }}
          </strong>

          <button
            v-for="seat in rowSeats"
            :key="seat.id"
            class="btn"
            :class="{
              'btn-secondary': seat.status === 'booked',
              'btn-outline-primary':
                seat.status === 'available' &&
                !bookingStore.selectedSeats.includes(seat.id),
              'btn-primary':
                bookingStore.selectedSeats.includes(seat.id)
            }"
            :disabled="seat.status === 'booked'"
            @click="selectSeat(seat)"
          >
            {{ seat.seat_number }}
          </button>

        </div>

      </div>

      <!-- Selected seats -->
      <div class="mt-5">

        <h4>Selected Seats</h4>

        <p v-if="bookingStore.selectedSeats.length === 0">
          No seats selected.
        </p>

        <p v-else>
          {{ bookingStore.selectedSeats.length }}
          seat(s) selected.
        </p>

      </div>

      <!-- Continue -->
      <button
        class="btn btn-success mt-3"
        @click="goToCheckout"
        :disabled="bookingStore.selectedSeats.length === 0"
      >
        Continue to Checkout
      </button>

    </div>

  </div>
</template>