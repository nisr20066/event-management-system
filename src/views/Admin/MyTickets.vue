<template>
  <div class="page">
    <h1>My Tickets</h1>

    <p v-if="loading">Loading tickets...</p>

    <p v-else-if="error">{{ error }}</p>

    <p v-else-if="tickets.length === 0">
      You don't have any tickets yet.
    </p>

    <div v-else>
      <div
        v-for="ticket in tickets"
        :key="ticket.id"
        class="ticket"
      >
        <h2>Digital Ticket</h2>

        <p>
          <strong>Booking ID:</strong>
          {{ ticket.id }}
        </p>

        <p>
          <strong>Event:</strong>
          {{ ticket.event_id }}
        </p>

        <p>
          <strong>Seats:</strong>
          {{ formatSeats(ticket.seat_ids) }}
        </p>

        <button @click="viewTicket(ticket)">
          View Ticket
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiRequest } from '../../services/api.js'

const tickets = ref([])
const loading = ref(false)
const error = ref('')

async function loadTickets() {
  loading.value = true
  error.value = ''

  try {
    const data = await apiRequest('api/bookings')
    tickets.value = data || []
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load tickets.'
  } finally {
    loading.value = false
  }
}

function formatSeats(seats) {
  if (!seats) {
    return 'No seats'
  }

  if (Array.isArray(seats)) {
    return seats.join(', ')
  }

  return seats
}

function viewTicket(ticket) {
  console.log('Digital ticket:', ticket)
}

onMounted(() => {
  loadTickets()
})
</script>

<style scoped>
.page {
  border: 2px solid black;
  padding: 30px;
  margin: 20px;
}

.ticket {
  border: 1px solid black;
  padding: 20px;
  margin-top: 20px;
}

button {
  padding: 8px 15px;
}
</style>