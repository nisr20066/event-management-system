<template>
    <div class="events-page">
  
      <!-- Header -->
      <section class="events-header">
        <span class="small-title">DISCOVER AMAZING EXPERIENCES</span>
  
        <h1>Discover Events</h1>
  
        <p>
          Find concerts, sports, comedy, technology, art and more.
        </p>
      </section>
  
  
      <!-- Search & Filter -->
      <section class="filters">
  
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search events..."
        />
  
        <select v-model="selectedCategory">
  
          <option value="">All Categories</option>
  
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
  
        </select>
  
      </section>
  
  
      <!-- Loading -->
      <div v-if="loading" class="message">
        <p>Loading events...</p>
      </div>
  
  
      <!-- Error -->
      <div v-else-if="error" class="message error">
        <p>{{ error }}</p>
      </div>
  
  
      <!-- Events -->
      <section
        v-else-if="filteredEvents.length > 0"
        class="events-grid"
      >
  
        <div
          v-for="event in filteredEvents"
          :key="event.id"
          class="event-card"
        >
  
          <!-- Image -->
          <div class="event-image">
  
            <img
              :src="getEventImage(event)"
              :alt="event.title"
              @error="handleImageError"
            />
  
          </div>
  
  
          <!-- Event Information -->
          <div class="event-info">
  
            <span class="category">
              {{ event.category }}
            </span>
  
            <h2>
              {{ event.title }}
            </h2>
  
            <p class="description">
              {{ shortDescription(event.description) }}
            </p>
  
            <p class="venue">
              📍 {{ event.venue }}
            </p>
  
            <p class="date">
              📅 {{ formatDate(event.event_date) }}
            </p>
  
  
            <div class="event-bottom">
  
              <div>
                <span class="price">
                  {{ event.ticket_price }} EGP
                </span>
              </div>
  
              <div>
                <span class="seats">
                  {{ event.available_seats }} seats
                </span>
              </div>
  
            </div>
  
  
            <button
              @click="viewEvent(event.id)"
            >
              View Details
            </button>
  
          </div>
  
        </div>
  
      </section>
  
  
      <!-- No Results -->
      <div
        v-else
        class="message"
      >
        <p>No events found.</p>
      </div>
  
    </div>
  </template>
  
  
  <script setup>
  
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { apiRequest } from '../services/api.js'
  
  const router = useRouter()
  
  
  // Events
  const events = ref([])
  
  const loading = ref(true)
  
  const error = ref('')
  
  
  // Search & Filter
  const searchQuery = ref('')
  
  const selectedCategory = ref('')
  
  
  // Fallback Images
  const fallbackImages = {
  
    "ad784392-12fe-4ac3-ae3e-502cabedebe7":
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80",
  
    "2fb5d372-31ff-47a3-a436-029773c4d5e0":
      "https://images.unsplash.com/photo-1527224857830-43a7acc85260?auto=format&fit=crop&w=1000&q=80",
  
    "ece8de6b-aa9a-4319-9264-6e9b8b006ea8":
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1000&q=80",
  
    "09fa4dc8-eb6f-47cf-9cfb-21884cbf6c28":
      "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1000&q=80",
  
    "0673f332-b1fc-4512-a19c-74de6532e7b1":
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80",
  
    "bebb50f8-e6fc-4169-a86f-1ef6ce12a958":
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80",
  
    "e72d6313-1d20-46c6-bc80-612036ed49d6":
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1000&q=80",
  
    "9584a06c-410f-4d45-bdaf-e5f1108cd71a":
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80"
  
  }
  
  
  // Fetch Events
  async function fetchEvents() {
  
    try {
  
      loading.value = true
  
      error.value = ''
  
      const response = await apiRequest(
        'api/events?skip=0&limit=20'
      )
  
      events.value = response || []
  
    } catch (err) {
  
      console.error(err)
  
      error.value =
        'Failed to load events. Please try again.'
  
    } finally {
  
      loading.value = false
  
    }
  
  }
  
  
  // Get Event Image
  function getEventImage(event) {
  
    // Image from API
    if (event.image_url) {
      return event.image_url
    }
  
    // Custom fallback image
    if (fallbackImages[event.id]) {
      return fallbackImages[event.id]
    }
  
    // Default image
    return 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80'
  
  }
  
  
  // Handle broken image
  function handleImageError(event) {
  
    event.target.src =
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80'
  
  }
  
  
  // Categories from API
  const categories = computed(() => {
  
    return [
      ...new Set(
        events.value
          .map(event => event.category)
          .filter(Boolean)
      )
    ]
  
  })
  
  
  // Search + Filter
  const filteredEvents = computed(() => {
  
    return events.value.filter(event => {
  
      const search =
        searchQuery.value
          .toLowerCase()
          .trim()
  
      const title =
        event.title?.toLowerCase() || ''
  
      const description =
        event.description?.toLowerCase() || ''
  
      const matchesSearch =
        title.includes(search) ||
        description.includes(search)
  
      const matchesCategory =
        !selectedCategory.value ||
        event.category === selectedCategory.value
  
      return matchesSearch && matchesCategory
  
    })
  
  })
  
  
  // Format Date
  function formatDate(date) {
  
    if (!date) {
      return 'Date not available'
    }
  
    return new Date(date).toLocaleString(
      'en-US',
      {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    )
  
  }
  
  
  // Short Description
  function shortDescription(description) {
  
    if (!description) {
      return 'No description available.'
    }
  
    if (description.length <= 100) {
      return description
    }
  
    return description.substring(0, 100) + '...'
  
  }
  
  
  // View Event Details
  function viewEvent(id) {
  
    router.push(`/events/${id}`)
  
  }
  
  
  // Start
  onMounted(() => {
  
    fetchEvents()
  
  })
  
  </script>
  
  
  <style scoped>
  
  .events-page {
  
    min-height: 100vh;
  
    padding: 50px 7%;
  
    background: #f8f6fc;
  
  }
  
  
  /* Header */
  
  .events-header {
  
    text-align: center;
  
    margin-bottom: 40px;
  
  }
  
  
  .small-title {
  
    display: block;
  
    color: #8b70b5;
  
    font-size: 12px;
  
    font-weight: bold;
  
    letter-spacing: 3px;
  
    margin-bottom: 10px;
  
  }
  
  
  .events-header h1 {
  
    font-size: 44px;
  
    margin: 0 0 12px;
  
    color: #4b2e83;
  
  }
  
  
  .events-header p {
  
    color: #777;
  
    font-size: 17px;
  
  }
  
  
  /* Filters */
  
  .filters {
  
    display: flex;
  
    justify-content: center;
  
    gap: 15px;
  
    margin-bottom: 40px;
  
  }
  
  
  .filters input,
  .filters select {
  
    padding: 14px 17px;
  
    border: 1px solid #ddd;
  
    border-radius: 10px;
  
    font-size: 15px;
  
    background: white;
  
    outline: none;
  
  }
  
  
  .filters input {
  
    width: 340px;
  
  }
  
  
  .filters input:focus,
  .filters select:focus {
  
    border-color: #4b2e83;
  
  }
  
  
  /* Grid */
  
  .events-grid {
  
    display: grid;
  
    grid-template-columns:
      repeat(
        auto-fit,
        minmax(280px, 1fr)
      );
  
    gap: 28px;
  
  }
  
  
  /* Card */
  
  .event-card {
  
    background: white;
  
    border-radius: 18px;
  
    overflow: hidden;
  
    box-shadow:
      0 6px 25px
      rgba(0, 0, 0, 0.08);
  
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  
  }
  
  
  .event-card:hover {
  
    transform: translateY(-7px);
  
    box-shadow:
      0 12px 30px
      rgba(75, 46, 131, 0.15);
  
  }
  
  
  /* Image */
  
  .event-image {
  
    height: 220px;
  
    overflow: hidden;
  
    background: #eee;
  
  }
  
  
  .event-image img {
  
    width: 100%;
  
    height: 100%;
  
    object-fit: cover;
  
    display: block;
  
    transition: transform 0.4s ease;
  
  }
  
  
  .event-card:hover .event-image img {
  
    transform: scale(1.05);
  
  }
  
  
  /* Information */
  
  .event-info {
  
    padding: 21px;
  
  }
  
  
  .category {
  
    display: inline-block;
  
    background: #eee6ff;
  
    color: #4b2e83;
  
    padding: 6px 12px;
  
    border-radius: 20px;
  
    font-size: 12px;
  
    font-weight: bold;
  
    margin-bottom: 10px;
  
  }
  
  
  .event-info h2 {
  
    color: #222;
  
    font-size: 20px;
  
    line-height: 1.35;
  
    margin: 5px 0 12px;
  
  }
  
  
  .description {
  
    color: #777;
  
    font-size: 14px;
  
    line-height: 1.6;
  
    min-height: 45px;
  
  }
  
  
  .venue,
  .date {
  
    color: #666;
  
    font-size: 14px;
  
    margin: 8px 0;
  
  }
  
  
  /* Price / Seats */
  
  .event-bottom {
  
    display: flex;
  
    justify-content: space-between;
  
    align-items: center;
  
    margin: 20px 0;
  
    padding-top: 15px;
  
    border-top: 1px solid #eee;
  
  }
  
  
  .price {
  
    color: #4b2e83;
  
    font-size: 18px;
  
    font-weight: bold;
  
  }
  
  
  .seats {
  
    color: #777;
  
    font-size: 13px;
  
  }
  
  
  /* Button */
  
  .event-info button {
  
    width: 100%;
  
    padding: 13px;
  
    border: none;
  
    border-radius: 9px;
  
    background: #4b2e83;
  
    color: white;
  
    cursor: pointer;
  
    font-size: 15px;
  
    font-weight: 500;
  
    transition: 0.3s;
  
  }
  
  
  .event-info button:hover {
  
    background: #372060;
  
  }
  
  
  /* Messages */
  
  .message {
  
    text-align: center;
  
    padding: 70px;
  
    font-size: 18px;
  
    color: #666;
  
  }
  
  
  .error {
  
    color: #c0392b;
  
  }
  
  
  /* Responsive */
  
  @media (max-width: 700px) {
  
    .events-page {
  
      padding: 35px 5%;
  
    }
  
    .events-header h1 {
  
      font-size: 34px;
  
    }
  
    .filters {
  
      flex-direction: column;
  
    }
  
    .filters input {
  
      width: 100%;
  
    }
  
  }
  
  </style>