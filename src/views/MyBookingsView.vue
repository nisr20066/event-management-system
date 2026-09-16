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

function seatCount(booking) {
  const seats = booking.seats ?? booking.seat_ids ?? booking.seat_numbers ?? booking.booked_seats;
  return Array.isArray(seats) ? seats.length : Number(seats) || 0;
}
</script>

<template>
  <div class="container py-5 bookings-page">
    <p class="eyebrow">YOUR EVENT ACTIVITY</p>
    <h1>My bookings</h1>

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
      class="card booking-card"
    >
      <h4>
        Booking #{{ booking.id }}
      </h4>

      <p><span>Event</span>{{ booking.event_title || booking.event_id }}</p>

      <p><span>Seats</span>{{ seatCount(booking) }}</p>

      <p><span>Status</span><b>Confirmed</b></p>
    </div>
  </div>
</template>

<style scoped>
.bookings-page{max-width:920px}.eyebrow{color:#fb923c;font-size:.75rem;font-weight:800;letter-spacing:.12em}.bookings-page h1{margin-top:8px}.booking-card{margin-top:16px!important;padding:22px!important;border-left:3px solid #f97316!important}.booking-card h4{margin:0 0 16px}.booking-card p{display:flex;justify-content:space-between;color:#fff;border-top:1px solid #334155;margin:0;padding:12px 0}.booking-card p span{color:#94a3b8}.booking-card b{color:#86efac;font-size:.85rem}
</style>
