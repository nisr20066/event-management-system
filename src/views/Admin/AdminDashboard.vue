<template>
  <div class="page">
    <h1>Admin Dashboard</h1>

    <div class="dashboard">
      <div class="card">
        <h2>Total Events</h2>
        <p>{{ stats.events }}</p>
      </div>

      <div class="card">
        <h2>Total Users</h2>
        <p>{{ stats.users }}</p>
      </div>

      <div class="card">
        <h2>Total Organizers</h2>
        <p>{{ stats.organizers }}</p>
      </div>

      <div class="card">
        <h2>Total Bookings</h2>
        <p>{{ stats.bookings }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiRequest } from '../../services/api.js'

const stats = ref({
  events: 0,
  users: 0,
  organizers: 0,
  bookings: 0,
})

onMounted(async () => {
  try {
    const data = await apiRequest('api/admin/analytics')

    console.log('Admin analytics:', data)

    if (data) {
      stats.value = {
        events: data.events ?? data.total_events ?? 0,
        users: data.users ?? data.total_users ?? 0,
        organizers: data.organizers ?? data.total_organizers ?? 0,
        bookings: data.bookings ?? data.total_bookings ?? 0,
      }
    }
  } catch (error) {
    console.error('Failed to load admin analytics:', error)
  }
})
</script>

<style scoped>
.page {
  border: 2px solid black;
  padding: 30px;
  margin: 20px;
}

.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 30px;
}

.card {
  border: 1px solid black;
  padding: 20px;
}

.card h2 {
  margin-top: 0;
}
</style>