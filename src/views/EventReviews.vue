<script setup>
import { ref, onMounted } from 'vue';
import { apiRequest } from '@/services/api.js';

const eventId = 1;
const reviews = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
    try {
        reviews.value = await apiRequest(`api/events/${eventId}/reviews`);
    } catch (err) {
        error.value = "Failed to load reviews";
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div>
        <h1>Event Reviews</h1>

        <p v-if="loading">Loading...</p>
        <p v-else-if="error">{{ error }}</p>
        <p v-else-if="reviews.length === 0">No reviews yet</p>

        <div v-else v-for="review in reviews" :key="review.id">
            <p>Rating: {{ review.rating }} / 5</p>
            <p>{{ review.comment }}</p>
            <hr />
        </div>
    </div>
</template>