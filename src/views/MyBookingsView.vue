<script setup>
import { ref, onMounted } from "vue";
import { getBookings } from "@/services/bookingService";

const bookings = ref([]);
const loading = ref(true);
const error = ref("");

const fetchBookings = async () => {
  try {
    loading.value = true;

    const data = await getBookings();

    bookings.value = data;
  } catch (err) {
    console.error(err);

    error.value =
      "Login is required to view bookings.";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchBookings);
</script>

<template>
  <div class="container py-5">
    <h1>My Bookings</h1>

    <div v-if="loading">
      Loading bookings...
    </div>

    <div
      v-else-if="error"
      class="alert alert-warning mt-3"
    >
      {{ error }}
    </div>

    <div
      v-else-if="bookings.length === 0"
      class="alert alert-info mt-3"
    >
      No bookings found.
    </div>

    <div
      v-for="booking in bookings"
      :key="booking.id"
      class="card mt-3 p-3"
    >
      <h4>
        Booking #{{ booking.id }}
      </h4>

      <p>
        Event:
        {{ booking.event_id }}
      </p>

      <p>
        Seats:
        {{ booking.seat_ids?.length || 0 }}
      </p>

      <p>
        Status:
        Confirmed
      </p>
    </div>
  </div>
</template>
