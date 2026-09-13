```vue
<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Organizer Dashboard</h1>

    <div v-if="loading" class="text-center py-6">
      Loading dashboard...
    </div>

    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        <!-- Total Events -->
        <div class="border p-4 rounded-lg">
          <h3 class="text-sm font-medium">Total Events</h3>
          <p class="text-2xl font-bold mt-2">
            {{ totalEvents }}
          </p>
        </div>

        <!-- Active Bookings -->
        <div class="border p-4 rounded-lg">
          <h3 class="text-sm font-medium">Active Bookings</h3>
          <p class="text-2xl font-bold mt-2">
            —
          </p>
        </div>

        <!-- Available Seats -->
        <div class="border p-4 rounded-lg">
          <h3 class="text-sm font-medium">Available Seats</h3>
          <p class="text-2xl font-bold mt-2">
            {{ availableSeats }}
          </p>
        </div>

      </div>

      <div class="p-6 rounded-lg border">
        <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>

        <div class="flex gap-4 flex-wrap">
          <router-link
            to="/organizer/my-events"
            class="border px-4 py-2 rounded"
          >
            View My Events
          </router-link>

          <router-link
            to="/organizer/events/create"
            class="border px-4 py-2 rounded"
          >
            Create New Event
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiRequest } from '@/services/api.js'

const totalEvents = ref(0)
const availableSeats = ref(0)
const loading = ref(true)

const fetchDashboardStats = async () => {
  try {
    loading.value = true

    const data = await apiRequest(
      'api/organizer/events',
      'GET'
    )

    const events = data || []

    // Total number of events
    totalEvents.value = events.length

    // Total available seats
    availableSeats.value = events.reduce(
      (total, event) => total + Number(event.available_seats || 0), // number --> sure that is a number
      0
      // 0 as initial value
    )

  } catch (err) {
    console.error('Failed to fetch dashboard stats', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {  // when the page stat
  fetchDashboardStats()
})
</script>