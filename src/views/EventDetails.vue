<template>

    <div class="details-page">
  
      <div class="details-container">
  
        <!-- Event Visual -->
  
        <div class="event-visual">
  
          <span>
            {{ event.icon }}
          </span>
  
        </div>
  
  
        <!-- Event Information -->
  
        <div class="event-details">
  
          <p class="category">
            {{ event.category }}
          </p>
  
          <h1>
            {{ event.title }}
          </h1>
  
          <p class="description">
            Join us for an amazing experience filled with
            entertainment, great people and unforgettable moments.
          </p>
  
  
          <div class="information">
  
            <div class="info-item">
  
              <span>📅</span>
  
              <div>
                <small>Date</small>
                <strong>{{ event.date }}</strong>
              </div>
  
            </div>
  
  
            <div class="info-item">
  
              <span>📍</span>
  
              <div>
                <small>Location</small>
                <strong>{{ event.location }}</strong>
              </div>
  
            </div>
  
  
            <div class="info-item">
  
              <span>🎟️</span>
  
              <div>
                <small>Ticket Price</small>
                <strong>{{ event.price }} EGP</strong>
              </div>
  
            </div>
  
          </div>
  
  
          <!-- Actions -->
  
          <div class="actions">
  
            <router-link
              to="/events"
              class="back-btn"
            >
              ← Back to Events
            </router-link>
  
            <button
              class="book-btn"
              @click="bookEvent"
            >
              Book Now
            </button>
  
          </div>
  
        </div>
  
      </div>
  
    </div>
  
  </template>
  
  
  <script setup>
  
  import { useRoute, useRouter } from 'vue-router'
  
  
  const route = useRoute()
  
  const router = useRouter()
  
  
  /* Events */
  
  const events = {
  
    1: {
      title: 'Music Festival',
      category: 'Music',
      date: '20 September 2026',
      location: 'Cairo Festival City',
      price: 500,
      icon: '🎵'
    },
  
    2: {
      title: 'Tech Conference',
      category: 'Technology',
      date: '25 September 2026',
      location: 'New Cairo',
      price: 750,
      icon: '💻'
    },
  
    3: {
      title: 'Modern Art Exhibition',
      category: 'Art',
      date: '1 October 2026',
      location: 'Alexandria Art Center',
      price: 250,
      icon: '🎨'
    },
  
    4: {
      title: 'Business Summit',
      category: 'Business',
      date: '10 October 2026',
      location: 'Cairo',
      price: 1000,
      icon: '💼'
    },
  
    5: {
      title: 'Live Music Night',
      category: 'Music',
      date: '15 October 2026',
      location: 'Cairo',
      price: 400,
      icon: '🎸'
    },
  
    6: {
      title: 'AI & Future Technology',
      category: 'Technology',
      date: '20 October 2026',
      location: 'Giza',
      price: 850,
      icon: '🤖'
    }
  
  }
  
  
  /* Get ID from URL */
  
  const event = events[route.params.id] || events[1]
  
  
  /* Booking */
  
  function bookEvent() {
  
    router.push('/booking')
  
  }
  
  </script>
  
  
  <style scoped>
  
  .details-page {
    min-height: 100vh;
  
    padding: 80px 20px;
  
    background: #f8f6ff;
  }
  
  
  .details-container {
  
    max-width: 1000px;
  
    margin: auto;
  
    background: white;
  
    border-radius: 20px;
  
    overflow: hidden;
  
    display: grid;
  
    grid-template-columns: 40% 60%;
  
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  
  }
  
  
  /* VISUAL */
  
  .event-visual {
  
    min-height: 500px;
  
    background: linear-gradient(
      135deg,
      #4b2e83,
      #8b6bc1
    );
  
    display: flex;
  
    justify-content: center;
  
    align-items: center;
  
    font-size: 150px;
  
  }
  
  
  /* DETAILS */
  
  .event-details {
  
    padding: 50px;
  
  }
  
  .category {
  
    color: #7b55b5;
  
    font-weight: bold;
  
    letter-spacing: 1px;
  
  }
  
  .event-details h1 {
  
    font-size: 45px;
  
    color: #4b2e83;
  
    margin: 15px 0;
  
  }
  
  .description {
  
    color: #666;
  
    line-height: 1.8;
  
  }
  
  
  /* INFORMATION */
  
  .information {
  
    margin: 30px 0;
  
  }
  
  .info-item {
  
    display: flex;
  
    align-items: center;
  
    gap: 15px;
  
    margin-bottom: 20px;
  
  }
  
  .info-item > span {
  
    font-size: 30px;
  
  }
  
  .info-item small {
  
    display: block;
  
    color: #999;
  
    margin-bottom: 5px;
  
  }
  
  .info-item strong {
  
    display: block;
  
    color: #333;
  
  }
  
  
  /* BUTTONS */
  
  .actions {
  
    display: flex;
  
    gap: 15px;
  
    align-items: center;
  
  }
  
  .back-btn {
  
    color: #4b2e83;
  
    text-decoration: none;
  
    font-weight: bold;
  
  }
  
  .book-btn {
  
    border: none;
  
    background: #4b2e83;
  
    color: white;
  
    padding: 14px 25px;
  
    border-radius: 8px;
  
    cursor: pointer;
  
    font-size: 15px;
  
  }
  
  
  /* RESPONSIVE */
  
  @media (max-width: 800px) {
  
    .details-container {
  
      grid-template-columns: 1fr;
  
    }
  
    .event-visual {
  
      min-height: 250px;
  
    }
  
    .event-details h1 {
  
      font-size: 35px;
  
    }
  
  }
  
  </style>