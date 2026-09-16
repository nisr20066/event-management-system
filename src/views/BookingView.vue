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
  <div class="container py-5 booking-page">
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

    <p class="eyebrow">STEP 1 OF 2</p>
    <h1 class="mb-4">Choose your seats</h1>
    <p class="lead">Select available seats, then review your booking securely.</p>

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
        class="seat-row"
      >

        <div class="seat-line">

          <strong style="width: 30px;">
            {{ rowLabel }}
          </strong>

          <button
            v-for="seat in rowSeats"
            :key="seat.id"
            class="seat"
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
      <div class="selection-summary">

        <h4>Selected seats</h4>

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
        class="checkout-button"
        @click="goToCheckout"
        :disabled="bookingStore.selectedSeats.length === 0"
      >
        Continue to Checkout
      </button>

    </div>

  </div>
</template>

<style scoped>
.booking-page{max-width:880px}.eyebrow{margin:0 0 8px;color:#fb923c;font-size:.75rem;font-weight:800;letter-spacing:.12em}.lead{color:#94a3b8;margin-bottom:32px}.seat-row{margin:16px 0}.seat-line{display:flex;align-items:center;gap:10px;flex-wrap:wrap;background:#1e293b;border:1px solid #334155;border-radius:12px;padding:14px}.seat-line strong{width:28px;color:#fb923c}.seat{min-width:42px;padding:9px 7px!important;background:#0f172a!important;border:1px solid #475569!important;color:#cbd5e1!important}.seat.btn-primary{background:#f97316!important;border-color:#f97316!important;color:#fff!important}.seat.btn-secondary{background:#475569!important;color:#94a3b8!important}.selection-summary{margin-top:32px;padding:20px;background:#1e293b;border:1px solid #334155;border-radius:12px}.selection-summary h4{margin:0 0 8px}.selection-summary p{color:#cbd5e1}.checkout-button{margin-top:16px;background:#f97316!important}@media(max-width:560px){.seat-line{gap:7px}.seat{min-width:36px;padding:8px 5px!important}}
</style>
