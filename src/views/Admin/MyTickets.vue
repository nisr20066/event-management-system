<template>
  <div class="page tickets-page">
    <p class="eyebrow">EVENTHUB WALLET</p>
    <h1>My tickets</h1>

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
        <div class="ticket-top"><span>EVENT TICKET</span><h2>Digital Ticket</h2></div>

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
          {{ formatSeats(ticketSeats(ticket)) }}
        </p>

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

function ticketSeats(ticket) {
  return ticket.seats ?? ticket.seat_ids ?? ticket.seat_numbers ?? ticket.booked_seats
}

function formatSeats(seats) {
  if (!seats || (Array.isArray(seats) && seats.length === 0)) {
    return 'No seats'
  }

  if (Array.isArray(seats)) {
    return seats.map((seat) => {
      if (typeof seat === 'object') {
        return `${seat.row_label ?? seat.row ?? ''}${seat.seat_number ?? seat.number ?? seat.id ?? ''}`
      }
      return seat
    }).join(', ')
  }

  return seats
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

<style scoped>
.tickets-page{max-width:960px;margin:0 auto;background:#0f172a;border:0!important;color:#fff}.eyebrow{color:#fb923c;font-size:.75rem;font-weight:800;letter-spacing:.12em}.ticket{position:relative;overflow:hidden;border-left:4px solid #f97316!important;border-radius:12px}.ticket:after{content:"";position:absolute;width:34px;height:34px;border-radius:50%;background:#0f172a;right:-17px;top:95px}.ticket-top{border-bottom:1px dashed #64748b;padding-bottom:14px}.ticket-top span{color:#fb923c;font-size:.75rem;font-weight:800;letter-spacing:.12em}.ticket h2{margin:8px 0 0}.ticket p{color:#cbd5e1}.ticket strong{color:#94a3b8}.ticket button{background:#334155}
</style>
