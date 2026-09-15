<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { apiRequest } from '@/services/api.js';

const route = useRoute();
const eventId = route.params.id || 1; // لو مفيش id في الرابط، هيستخدم 1 كـ fallback مؤقت
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
            <p><strong>{{ review.user_name }}</strong> — Rating: {{ review.rating }} / 5</p>
            <p>{{ review.comment }}</p>
            <hr />
        </div>
    </div>
</template>