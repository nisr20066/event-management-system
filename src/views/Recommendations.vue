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
    <div>
        <h1>Recommended Events</h1>

        <p v-if="loading">Loading...</p>
        <p v-else-if="error">{{ error }}</p>
        <p v-else-if="recommendations.length === 0">No recommendations available</p>

        <div v-else v-for="event in recommendations" :key="event.id">
            <h3>{{ event.title }}</h3>
            <p v-if="event.description">{{ event.description }}</p>
            <p>Venue: {{ event.venue }}</p>
            <p>Date: {{ event.event_date }}</p>
            <p>Price: {{ event.ticket_price }}</p>
            <p v-if="event.category">Category: {{ event.category }}</p>
            <hr />
        </div>
    </div>
</template>