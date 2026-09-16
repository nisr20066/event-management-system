<template>

    <div class="home">
  
      <!-- Hero -->
      <section class="hero">
  
        <div class="hero-content">
  
          <span class="hero-small">
            DISCOVER • EXPERIENCE • ENJOY
          </span>
  
          <h1>
            Find Your Next
            <span>Great Event</span>
          </h1>
  
          <p>
            Discover concerts, shows, conferences and unforgettable
            experiences all in one place.
          </p>
  
          <button @click="goToEvents">
            Explore Events
          </button>
  
        </div>
  
      </section>
  
  
      <!-- Featured Events -->
      <section class="featured">
  
        <div class="section-header">
  
          <div>
            <span>DON'T MISS OUT</span>
            <h2>Featured Events</h2>
          </div>
  
          <button
            class="view-all"
            @click="goToEvents"
          >
            View All Events →
          </button>
  
        </div>
  
  
        <div
          v-if="loading"
          class="message"
        >
          Loading events...
        </div>
  
  
        <div
          v-else-if="error"
          class="message error"
        >
          {{ error }}
        </div>
  
  
        <div
          v-else
          class="events-grid"
        >
  
          <div
            v-for="event in featuredEvents"
            :key="event.id"
            class="event-card"
            @click="viewEvent(event.id)"
          >
  
            <div class="event-image">
  
              <img
                :src="getEventImage(event)"
                :alt="event.title"
                @error="handleImageError"
              />
  
            </div>
  
  
            <div class="card-content">
  
              <span class="category">
                {{ event.category }}
              </span>
  
              <h3>
                {{ event.title }}
              </h3>
  
              <p>
                📍 {{ event.venue }}
              </p>
  
              <div class="card-bottom">
  
                <strong>
                  {{ event.ticket_price }} EGP
                </strong>
  
                <span>
                  {{ event.available_seats }} seats
                </span>
  
              </div>
  
            </div>
  
          </div>
  
        </div>
  
      </section>
  
    </div>
  
  </template>
  
  
  <script setup>
  
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { apiRequest } from '../services/api.js'
  
  const router = useRouter()
  
  const events = ref([])
  
  const loading = ref(true)
  
  const error = ref('')
  
  const featuredEvents = ref([])
  
  
  // Same fallback images used in Events.vue
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
  
  
  // Get image for event
  function getEventImage(event) {
  
    if (event.image_url) {
      return event.image_url
    }
  
    if (fallbackImages[event.id]) {
      return fallbackImages[event.id]
    }
  
    return "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80"
  
  }
  
  
  // Handle broken image
  function handleImageError(event) {
  
    event.target.src =
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80"
  
  }
  
  
  // Get events from API
  async function fetchEvents() {
  
    try {
  
      loading.value = true
  
      error.value = ''
  
      const response =
        await apiRequest('api/events?skip=0&limit=6')
  
      events.value = response || []
  
      featuredEvents.value = response || []
  
    } catch (err) {
  
      console.error(err)
  
      error.value = 'Failed to load events.'
  
    } finally {
  
      loading.value = false
  
    }
  
  }
  
  
  function goToEvents() {
  
    router.push('/events')
  
  }
  
  
  function viewEvent(id) {
  
    router.push(`/events/${id}`)
  
  }
  
  
  onMounted(() => {
  
    fetchEvents()
  
  })
  
  </script>
  
  
  <style scoped>
  
  .home {
  
    min-height: 100vh;
  
    background: #f8f6fc;
  
  }
  
  
  /* Hero */
  
  .hero {
  
    min-height: 550px;
  
    display: flex;
  
    align-items: center;
  
    padding: 60px 8%;
  
    background:
      linear-gradient(
        90deg,
        rgba(40, 20, 70, 0.95),
        rgba(75, 46, 131, 0.8)
      );
  
  }
  
  
  .hero-content {
  
    max-width: 650px;
  
    color: white;
  
  }
  
  
  .hero-small {
  
    font-size: 13px;
  
    letter-spacing: 3px;
  
    opacity: 0.8;
  
  }
  
  
  .hero h1 {
  
    font-size: 58px;
  
    line-height: 1.1;
  
    margin: 20px 0;
  
  }
  
  
  .hero h1 span {
  
    display: block;
  
    color: #e5d6ff;
  
  }
  
  
  .hero p {
  
    font-size: 18px;
  
    line-height: 1.7;
  
    max-width: 570px;
  
    opacity: 0.9;
  
  }
  
  
  .hero button {
  
    margin-top: 25px;
  
    padding: 14px 28px;
  
    border: none;
  
    border-radius: 10px;
  
    background: white;
  
    color: #4b2e83;
  
    font-weight: bold;
  
    cursor: pointer;
  
    font-size: 15px;
  
  }
  
  
  .hero button:hover {
  
    transform: translateY(-2px);
  
  }
  
  
  /* Featured */
  
  .featured {
  
    padding: 60px 7%;
  
  }
  
  
  .section-header {
  
    display: flex;
  
    justify-content: space-between;
  
    align-items: end;
  
    margin-bottom: 30px;
  
  }
  
  
  .section-header span {
  
    color: #8b70b5;
  
    font-size: 12px;
  
    letter-spacing: 2px;
  
  }
  
  
  .section-header h2 {
  
    color: #222;
  
    font-size: 34px;
  
    margin-top: 7px;
  
  }
  
  
  .view-all {
  
    border: none;
  
    background: transparent;
  
    color: #4b2e83;
  
    font-weight: bold;
  
    cursor: pointer;
  
  }
  
  
  /* Cards */
  
  .events-grid {
  
    display: grid;
  
    grid-template-columns:
      repeat(
        auto-fit,
        minmax(280px, 1fr)
      );
  
    gap: 25px;
  
  }
  
  
  .event-card {
  
    background: white;
  
    border-radius: 16px;
  
    overflow: hidden;
  
    cursor: pointer;
  
    box-shadow:
      0 5px 20px
      rgba(0, 0, 0, 0.07);
  
    transition: 0.3s;
  
  }
  
  
  .event-card:hover {
  
    transform: translateY(-7px);
  
  }
  
  
  .event-image {
  
    height: 210px;
  
    background: #eee;
  
  }
  
  
  .event-image img {
  
    width: 100%;
  
    height: 100%;
  
    object-fit: cover;
  
  }
  
  
  /* Card Content */
  
  .card-content {
  
    padding: 20px;
  
  }
  
  
  .category {
  
    display: inline-block;
  
    padding: 5px 10px;
  
    background: #eee6ff;
  
    color: #4b2e83;
  
    border-radius: 20px;
  
    font-size: 12px;
  
  }
  
  
  .card-content h3 {
  
    margin: 12px 0;
  
    color: #222;
  
  }
  
  
  .card-content p {
  
    color: #777;
  
    font-size: 14px;
  
  }
  
  
  .card-bottom {
  
    display: flex;
  
    justify-content: space-between;
  
    margin-top: 18px;
  
  }
  
  
  .card-bottom strong {
  
    color: #4b2e83;
  
  }
  
  
  .card-bottom span {
  
    color: #777;
  
    font-size: 13px;
  
  }
  
  
  .message {
  
    text-align: center;
  
    padding: 50px;
  
    color: #666;
  
  }
  
  
  .error {
  
    color: #c0392b;
  
  }
  
  
  /* Responsive */
  
  @media (max-width: 700px) {
  
    .hero {
  
      min-height: 500px;
  
      padding: 40px 7%;
  
    }
  
    .hero h1 {
  
      font-size: 40px;
  
    }
  
    .section-header {
  
      align-items: start;
  
      flex-direction: column;
  
      gap: 15px;
  
    }
  
  }
  
  </style>

  <style scoped>
  .home{background:#0f172a}.hero{min-height:520px;background:radial-gradient(circle at 80% 25%,rgba(249,115,22,.24),transparent 28%),#0f172a;border-bottom:1px solid #334155}.hero-content{position:relative}.hero-small,.section-header span{color:#fb923c}.hero h1{font-size:clamp(2.8rem,7vw,5.3rem);letter-spacing:-.065em}.hero h1 span{color:#fb923c}.hero p{color:#cbd5e1}.hero button{background:#f97316;color:#fff;border-radius:8px;box-shadow:0 10px 25px rgba(249,115,22,.22)}.featured{background:#0f172a}.section-header h2{color:#fff}.view-all{color:#fb923c}.events-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.event-card{border:1px solid #334155!important;background:#1e293b!important;box-shadow:none!important}.event-card:hover{transform:scale(1.02);border-color:#f97316!important}.event-image{background:#0f172a}.event-card:hover .event-image img{transform:scale(1.04);transition:.3s}.category{background:rgba(249,115,22,.14)!important;color:#fb923c!important;border-radius:6px!important}.card-content h3{color:#fff!important}.card-content p,.card-bottom span{color:#94a3b8!important}.card-bottom{border-top:1px solid #334155;padding-top:15px}.card-bottom strong{color:#fb923c!important}.message{color:#cbd5e1}.error{color:#fca5a5!important}@media(max-width:900px){.events-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:700px){.events-grid{grid-template-columns:1fr}}
  </style>
