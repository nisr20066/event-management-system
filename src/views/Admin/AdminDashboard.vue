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
      const summary = data.summary ?? data

      stats.value = {
        events: summary.events ?? summary.total_events ?? 0,
        users: summary.users ?? summary.total_users ?? 0,
        organizers: summary.organizers ?? summary.total_organizers ?? 0,
        bookings: summary.bookings ?? summary.total_bookings ?? 0,
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

<style scoped>
.page{max-width:1120px;margin:0 auto;background:#0f172a;border:0!important;color:#fff}.page h1{font-size:2.2rem}.dashboard{grid-template-columns:repeat(4,minmax(0,1fr))}.card{background:#1e293b;border:1px solid #334155!important;border-radius:12px;border-top:3px solid #f97316!important}.card h2{color:#94a3b8;font-size:.9rem;text-transform:uppercase;letter-spacing:.08em}.card p{color:#fff;font-size:2.1rem;font-weight:800;margin-bottom:0}@media(max-width:850px){.dashboard{grid-template-columns:repeat(2,1fr)}}@media(max-width:480px){.dashboard{grid-template-columns:1fr}}
</style>
