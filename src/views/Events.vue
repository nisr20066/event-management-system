<template>
    <div class="events-page">
  
      <!-- Header -->
      <section class="events-header">
  
        <p>DISCOVER</p>
  
        <h1>All Events</h1>
  
        <span>
          Find the perfect event and make your next experience unforgettable.
        </span>
  
      </section>
  
  
      <!-- Search & Filter -->
  
      <section class="filters">
  
        <input
          v-model="search"
          type="text"
          placeholder="Search events..."
        />
  
        <select v-model="selectedCategory">
  
          <option value="All">All Categories</option>
  
          <option value="Music">Music</option>
  
          <option value="Technology">Technology</option>
  
          <option value="Art">Art</option>
  
          <option value="Business">Business</option>
  
        </select>
  
      </section>
  
  
      <!-- Events -->
  
      <section class="events-container">
  
        <div
          v-for="event in filteredEvents"
          :key="event.id"
          class="event-card"
        >
  
          <!-- Image / Icon -->
  
          <div class="event-image">
  
            <span>
              {{ event.icon }}
            </span>
  
          </div>
  
  
          <!-- Content -->
  
          <div class="event-content">
  
            <p class="category">
              {{ event.category }}
            </p>
  
            <h2>
              {{ event.title }}
            </h2>
  
            <p class="event-info">
              📅 {{ event.date }}
            </p>
  
            <p class="event-info">
              📍 {{ event.location }}
            </p>
  
            <div class="card-bottom">
  
              <strong>
                {{ event.price }} EGP
              </strong>
  
              <router-link
                :to="`/events/${event.id}`"
                class="details-btn"
              >
                View Details
              </router-link>
  
            </div>
  
          </div>
  
        </div>
  
  
        <!-- No Results -->
  
        <div
          v-if="filteredEvents.length === 0"
          class="no-results"
        >
          <div>😕</div>
  
          <h2>No Events Found</h2>
  
          <p>
            Try searching for another event or category.
          </p>
  
        </div>
  
      </section>
  
    </div>
  </template>
  
  
  <script setup>
  
  import { ref, computed } from 'vue'
  
  
  /* Search */
  
  const search = ref('')
  
  
  /* Category */
  
  const selectedCategory = ref('All')
  
  
  /* Events Data */
  
  const events = ref([
  
    {
      id: 1,
      title: 'Music Festival',
      category: 'Music',
      date: '20 September 2026',
      location: 'Cairo Festival City',
      price: 500,
      icon: '🎵'
    },
  
    {
      id: 2,
      title: 'Tech Conference',
      category: 'Technology',
      date: '25 September 2026',
      location: 'New Cairo',
      price: 750,
      icon: '💻'
    },
  
    {
      id: 3,
      title: 'Modern Art Exhibition',
      category: 'Art',
      date: '1 October 2026',
      location: 'Alexandria Art Center',
      price: 250,
      icon: '🎨'
    },
  
    {
      id: 4,
      title: 'Business Summit',
      category: 'Business',
      date: '10 October 2026',
      location: 'Cairo',
      price: 1000,
      icon: '💼'
    },
  
    {
      id: 5,
      title: 'Live Music Night',
      category: 'Music',
      date: '15 October 2026',
      location: 'Cairo',
      price: 400,
      icon: '🎸'
    },
  
    {
      id: 6,
      title: 'AI & Future Technology',
      category: 'Technology',
      date: '20 October 2026',
      location: 'Giza',
      price: 850,
      icon: '🤖'
    }
  
  ])
  
  
  /* Filter */
  
  const filteredEvents = computed(() => {
  
    return events.value.filter(event => {
  
      const matchesSearch =
        event.title
          .toLowerCase()
          .includes(search.value.toLowerCase())
  
      const matchesCategory =
        selectedCategory.value === 'All' ||
        event.category === selectedCategory.value
  
      return matchesSearch && matchesCategory
  
    })
  
  })
  
  </script>
  
  
  <style scoped>
  
  .events-page {
    min-height: 100vh;
    background: #f8f6ff;
    padding-bottom: 80px;
  }
  
  
  /* HEADER */
  
  .events-header {
    text-align: center;
    padding: 70px 20px 40px;
  }
  
  .events-header p {
    color: #7b55b5;
    font-weight: bold;
    letter-spacing: 3px;
  }
  
  .events-header h1 {
    font-size: 50px;
    color: #4b2e83;
    margin: 15px 0;
  }
  
  .events-header span {
    color: #777;
  }
  
  
  /* FILTERS */
  
  .filters {
    max-width: 1100px;
    margin: 0 auto 40px;
  
    display: flex;
    gap: 15px;
  
    padding: 0 20px;
  }
  
  .filters input,
  .filters select {
    padding: 14px;
  
    border: 1px solid #ddd;
    border-radius: 8px;
  
    background: white;
  
    font-size: 15px;
  }
  
  .filters input {
    flex: 1;
  }
  
  .filters select {
    width: 220px;
  }
  
  
  /* EVENTS GRID */
  
  .events-container {
    max-width: 1100px;
    margin: auto;
    padding: 0 20px;
  
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }
  
  
  /* CARD */
  
  .event-card {
    background: white;
    border-radius: 15px;
    overflow: hidden;
  
    box-shadow: 0 6px 20px rgba(0,0,0,0.07);
  
    transition: 0.3s;
  }
  
  .event-card:hover {
    transform: translateY(-7px);
  }
  
  
  /* IMAGE */
  
  .event-image {
    height: 190px;
  
    background: #e9e1f7;
  
    display: flex;
    justify-content: center;
    align-items: center;
  
    font-size: 80px;
  }
  
  
  /* CONTENT */
  
  .event-content {
    padding: 25px;
  }
  
  .category {
    color: #7b55b5;
    font-size: 14px;
    font-weight: bold;
  }
  
  .event-content h2 {
    color: #333;
    margin: 10px 0 20px;
  }
  
  .event-info {
    color: #666;
    margin: 8px 0;
  }
  
  
  /* BOTTOM */
  
  .card-bottom {
    margin-top: 20px;
  
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .card-bottom strong {
    color: #4b2e83;
    font-size: 20px;
  }
  
  .details-btn {
    background: #4b2e83;
    color: white;
  
    padding: 10px 16px;
  
    border-radius: 7px;
  
    text-decoration: none;
  
    font-size: 14px;
  }
  
  
  /* NO RESULTS */
  
  .no-results {
    grid-column: 1 / -1;
  
    text-align: center;
    padding: 70px;
  
    color: #777;
  }
  
  .no-results div {
    font-size: 60px;
  }
  
  .no-results h2 {
    color: #4b2e83;
  }
  
  
  /* RESPONSIVE */
  
  @media (max-width: 700px) {
  
    .events-container {
      grid-template-columns: 1fr;
    }
  
    .filters {
      flex-direction: column;
    }
  
    .filters select {
      width: 100%;
    }
  
    .events-header h1 {
      font-size: 40px;
    }
  
  }
  
  </style>