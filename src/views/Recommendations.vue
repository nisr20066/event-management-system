<script setup>
import { ref, onMounted } from 'vue';
import { apiRequest } from '@/services/api.js';

const recommendations = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
    try {
        recommendations.value = await apiRequest('api/recommendations');
    } catch (err) {
        error.value = "Failed to load recommendations. You may need to log in first.";
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div class="content-page recommendations-page">
        <p class="eyebrow">PICKED FOR YOU</p>
        <h1>Recommended events</h1>

        <p v-if="loading">Loading...</p>
        <p v-else-if="error">{{ error }}</p>
        <p v-else-if="recommendations.length === 0">No recommendations available</p>

        <RouterLink v-else v-for="event in recommendations" :key="event.id" :to="`/events/${event.id}`" class="recommendation-card">
            <h3>{{ event.title }}</h3>
            <p v-if="event.description">{{ event.description }}</p>
            <p>Venue: {{ event.venue }}</p>
            <p>Date: {{ event.event_date }}</p>
            <p>Price: {{ event.ticket_price }}</p>
            <p v-if="event.category">Category: {{ event.category }}</p>
        </RouterLink>
    </div>
</template>

<style scoped>
.content-page{width:min(1000px,calc(100% - 32px));margin:0 auto;padding:56px 0}.eyebrow{color:#fb923c;font-size:.75rem;font-weight:800;letter-spacing:.12em}.recommendation-card{display:block;margin-top:16px;padding:22px;background:#1e293b;border:1px solid #334155;border-radius:12px;color:#cbd5e1;text-decoration:none;transition:.2s}.recommendation-card:hover{border-color:#f97316;transform:scale(1.01)}.recommendation-card h3{color:#fff;margin-top:0}.recommendation-card p{margin:.45rem 0}.recommendation-card p:last-child{color:#fb923c}
</style>
