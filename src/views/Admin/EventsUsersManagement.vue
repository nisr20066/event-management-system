<template>
  <div class="page">
    <h1>Events / Users Management</h1>

    <section>
      <h2>Events</h2>

      <p v-if="loading">Loading events...</p>

      <p v-if="error">{{ error }}</p>

      <div v-for="event in events" :key="event.id" class="event-card">
        <div>
          <h3>{{ event.title }}</h3>
          <p>{{ event.venue }}</p>
          <p>{{ event.category }}</p>
          <p>{{ event.ticket_price }}</p>
        </div>

        <div class="actions">
          <button @click="editEvent(event)">Edit</button>
          <button @click="deleteEvent(event.id)">Delete</button>
        </div>
      </div>
    </section>

    <section>
      <h2>Users</h2>
      <p>
        User management will be connected when the Admin Users API is
        available.
      </p>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiRequest } from '../../services/api.js'

const events = ref([])
const loading = ref(false)
const error = ref('')

async function loadEvents() {
  loading.value = true
  error.value = ''

  try {
    const data = await apiRequest('api/events')
    events.value = data || []
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load events.'
  } finally {
    loading.value = false
  }
}

function editEvent(event) {
  console.log('Edit event:', event)
}

async function deleteEvent(eventId) {
  const confirmed = confirm('Are you sure you want to delete this event?')

  if (!confirmed) {
    return
  }

  try {
    await apiRequest(`api/events/${eventId}`, 'DELETE')
    events.value = events.value.filter(event => event.id !== eventId)
  } catch (err) {
    console.error(err)
    error.value = 'Failed to delete event.'
  }
}

onMounted(() => {
  loadEvents()
})
</script>

<style scoped>
.page {
  border: 2px solid black;
  padding: 30px;
  margin: 20px;
}

section {
  border: 1px solid black;
  padding: 20px;
  margin-top: 20px;
}

.event-card {
  border: 1px solid black;
  padding: 15px;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

button {
  padding: 8px 15px;
}
</style>