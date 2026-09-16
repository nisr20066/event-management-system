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

        <div class="border p-4 rounded-lg">
          <h3 class="text-sm font-medium">Active Bookings</h3>
          <p class="text-2xl font-bold mt-2">
            {{ activeBookings }}
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

      <p v-if="error" class="dashboard-error">{{ error }}</p>

      <div class="p-6 rounded-lg border quick-actions-panel">
        <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>

        <div class="quick-actions">
          <router-link
            to="/organizer/my-events"
            class="action-link action-link-secondary"
          >
            <span>Manage events</span>
            <small>View and edit your events</small>
          </router-link>

          <router-link
            to="/organizer/events/create"
            class="action-link action-link-primary"
          >
            <span>Create an event</span>
            <small>Publish a new experience</small>
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
const activeBookings = ref(0)
const availableSeats = ref(0)
const loading = ref(true)
const error = ref('')

function metric(value) {
  return Number(value) || 0
}

function availableSeatsFor(event) {
  if (event.available_seats !== null && event.available_seats !== undefined) {
    return metric(event.available_seats)
  }

  return metric(event.total_rows) * metric(event.seats_per_row)
}

const fetchDashboardStats = async () => {
  try {
    loading.value = true
    error.value = ''

    const [eventsResult, analyticsResult] = await Promise.allSettled([
      apiRequest('api/organizer/events'),
      apiRequest('api/organizer/analytics')
    ])

    if (eventsResult.status !== 'fulfilled') {
      throw eventsResult.reason
    }

    const eventsData = eventsResult.value
    const events = Array.isArray(eventsData)
      ? eventsData
      : eventsData?.events ?? []

    totalEvents.value = events.length
    availableSeats.value = events.reduce(
      (total, event) => total + availableSeatsFor(event),
      0
    )

    if (analyticsResult.status === 'fulfilled') {
      const summary = analyticsResult.value?.summary ?? analyticsResult.value ?? {}
      activeBookings.value = metric(summary.active_bookings ?? summary.bookings ?? summary.total_bookings)
    }

  } catch (err) {
    console.error('Failed to fetch dashboard stats', err)
    error.value = 'Could not load organizer analytics from the API.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {  // when the page stat
  fetchDashboardStats()
})
</script>

<style scoped>
.p-6{color:#fff}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.border{background:#1e293b;border:1px solid #334155!important}.rounded-lg{border-radius:12px!important}.text-3xl,.text-xl,.text-2xl{color:#fff}.text-sm{color:#94a3b8}.text-2xl{font-size:2rem;color:#fb923c}.dashboard-error{margin:18px 0 0;color:#fca5a5}.quick-actions-panel{margin-top:24px}.quick-actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.action-link{display:flex;min-height:110px;flex-direction:column;justify-content:center;gap:7px;padding:20px;border:1px solid #475569;border-radius:10px;color:#fff;text-decoration:none;transition:transform .18s ease,border-color .18s ease,background .18s ease}.action-link:hover{transform:translateY(-2px);border-color:#fb923c}.action-link span{font-size:1rem;font-weight:800}.action-link small{color:#94a3b8}.action-link-primary{background:#f97316;border-color:#f97316}.action-link-primary:hover{background:#fb923c}.action-link-primary small{color:#fff}.action-link-secondary{background:#0f172a}@media(max-width:720px){.grid,.quick-actions{grid-template-columns:1fr}}
</style>
