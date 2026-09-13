<template>

    <div class="details-page">
  
      <div v-if="loading" class="message">
        Loading event...
      </div>
  
      <div v-else-if="error" class="message error">
        {{ error }}
      </div>
  
      <div v-else-if="event" class="event-details">
  
        <div class="details-image">
  
          <img
            v-if="event.image_url"
            :src="event.image_url"
            :alt="event.title"
          />
  
          <div v-else class="no-image">
            No Image Available
          </div>
  
        </div>
  
  
        <div class="details-content">
  
          <span class="category">
            {{ event.category }}
          </span>
  
          <h1>
            {{ event.title }}
          </h1>
  
          <p class="description">
            {{ event.description }}
          </p>
  
  
          <div class="info">
  
            <div class="info-item">
              <strong>📍 Venue</strong>
              <span>{{ event.venue }}</span>
            </div>
  
            <div class="info-item">
              <strong>📅 Date</strong>
              <span>{{ formatDate(event.event_date) }}</span>
            </div>
  
            <div class="info-item">
              <strong>💰 Ticket Price</strong>
              <span>{{ event.ticket_price }} EGP</span>
            </div>
  
            <div class="info-item">
              <strong>🎟️ Available Seats</strong>
              <span>{{ event.available_seats }}</span>
            </div>
  
          </div>
  
  
          <div class="actions">
  
            <button
              class="back-btn"
              @click="goBack"
            >
              ← Back to Events
            </button>
  
            <button
              class="book-btn"
              disabled
            >
              Book Now
            </button>
  
          </div>
  
        </div>
  
      </div>
  
    </div>
  
  </template>
  
  
  <script setup>
  
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { apiRequest } from '../services/api.js'
  
  const route = useRoute()
  const router = useRouter()
  
  const event = ref(null)
  
  const loading = ref(true)
  
  const error = ref('')
  
  
  async function fetchEvent() {
  
    try {
  
      loading.value = true
      error.value = ''
  
      const eventId = route.params.id
  
      const response = await apiRequest(
        `api/events/${eventId}`
      )
  
      event.value = response
  
    } catch (err) {
  
      console.error(err)
  
      error.value = 'Failed to load event details.'
  
    } finally {
  
      loading.value = false
  
    }
  
  }
  
  
  function formatDate(date) {
  
    if (!date) {
      return 'Date not available'
    }
  
    return new Date(date).toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short'
    })
  
  }
  
  
  function goBack() {
  
    router.push('/events')
  
  }
  
  
  onMounted(() => {
  
    fetchEvent()
  
  })
  
  </script>
  
  
  <style scoped>
  
  .details-page {
  
    min-height: 100vh;
  
    padding: 50px 7%;
  
    background: #f8f6fc;
  
  }
  
  
  .event-details {
  
    max-width: 1100px;
  
    margin: auto;
  
    background: white;
  
    border-radius: 20px;
  
    overflow: hidden;
  
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  
  }
  
  
  .details-image {
  
    height: 400px;
  
    background: #eee;
  
  }
  
  
  .details-image img {
  
    width: 100%;
  
    height: 100%;
  
    object-fit: cover;
  
  }
  
  
  .no-image {
  
    height: 100%;
  
    display: flex;
  
    align-items: center;
  
    justify-content: center;
  
    color: #999;
  
    font-size: 20px;
  
  }
  
  
  .details-content {
  
    padding: 35px;
  
  }
  
  
  .category {
  
    display: inline-block;
  
    background: #eee6ff;
  
    color: #4b2e83;
  
    padding: 7px 14px;
  
    border-radius: 20px;
  
    font-size: 14px;
  
  }
  
  
  h1 {
  
    color: #222;
  
    font-size: 40px;
  
    margin: 15px 0;
  
  }
  
  
  .description {
  
    color: #666;
  
    line-height: 1.8;
  
    font-size: 16px;
  
    margin-bottom: 30px;
  
  }
  
  
  .info {
  
    display: grid;
  
    grid-template-columns: repeat(2, 1fr);
  
    gap: 20px;
  
    margin-bottom: 30px;
  
  }
  
  
  .info-item {
  
    padding: 18px;
  
    background: #f8f6fc;
  
    border-radius: 12px;
  
  }
  
  
  .info-item strong {
  
    display: block;
  
    color: #4b2e83;
  
    margin-bottom: 7px;
  
  }
  
  
  .info-item span {
  
    color: #555;
  
  }
  
  
  .actions {
  
    display: flex;
  
    gap: 15px;
  
  }
  
  
  .actions button {
  
    padding: 13px 25px;
  
    border: none;
  
    border-radius: 9px;
  
    font-size: 15px;
  
  }
  
  
  .back-btn {
  
    background: #eee;
  
    color: #333;
  
    cursor: pointer;
  
  }
  
  
  .book-btn {
  
    background: #4b2e83;
  
    color: white;
  
    cursor: not-allowed;
  
    opacity: 0.6;
  
  }
  
  
  .message {
  
    text-align: center;
  
    padding: 80px;
  
    font-size: 20px;
  
    color: #666;
  
  }
  
  
  .error {
  
    color: #c0392b;
  
  }
  
  
  @media (max-width: 700px) {
  
    .details-page {
  
      padding: 30px 5%;
  
    }
  
  
    .details-image {
  
      height: 250px;
  
    }
  
  
    h1 {
  
      font-size: 30px;
  
    }
  
  
    .info {
  
      grid-template-columns: 1fr;
  
    }
  
  
    .actions {
  
      flex-direction: column;
  
    }
  
  }
  
  </style>