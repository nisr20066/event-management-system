<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { apiRequest } from '@/services/api.js';

const route = useRoute();
const router = useRouter();
const eventId = route.params.id;
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
    <div class="content-page reviews-page">
        <p class="eyebrow">COMMUNITY FEEDBACK</p>
        <h1>Event reviews</h1>
        <div class="review-actions">
            <button class="back-btn" @click="router.push(`/events/${eventId}`)">← Back to event</button>
            <button class="write-review-btn" @click="router.push(`/write-review/${eventId}`)">Write a review</button>
        </div>

        <p v-if="loading">Loading...</p>
        <p v-else-if="error">{{ error }}</p>
        <p v-else-if="reviews.length === 0">No reviews yet</p>

        <div v-else v-for="review in reviews" :key="review.id" class="review-card">
            <p><strong>{{ review.user_name }}</strong> — Rating: {{ review.rating }} / 5</p>
            <p>{{ review.comment }}</p>
            <hr />
        </div>
    </div>
</template>

<style scoped>
.content-page{width:min(860px,calc(100% - 32px));margin:0 auto;padding:56px 0}.eyebrow{color:#fb923c;font-size:.75rem;font-weight:800;letter-spacing:.12em}.review-actions{display:flex;gap:12px;margin:4px 0 16px}.back-btn{background:#334155}.review-card{margin-top:16px;padding:20px;background:#1e293b;border:1px solid #334155;border-radius:12px}.review-card p{color:#cbd5e1}.review-card strong{color:#fff}.review-card hr{border:0;border-top:1px solid #334155}@media(max-width:500px){.review-actions{flex-direction:column}}
</style>
