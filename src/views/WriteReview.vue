<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { apiRequest } from '@/services/api.js';

const route = useRoute();
const router = useRouter();
const eventId = route.params.id;
const rating = ref(5);
const comment = ref('');
const submitting = ref(false);
const message = ref('');

async function submitReview() {
    submitting.value = true;
    message.value = '';
    try {
        await apiRequest(`api/events/${eventId}/reviews`, "POST", {
            rating: rating.value,
            comment: comment.value,
        });
        message.value = "Review submitted successfully!";
        comment.value = '';
        router.push(`/event-reviews/${eventId}`);
    } catch (err) {
        message.value = "Failed to submit review. You may need to log in first.";
    } finally {
        submitting.value = false;
    }
}
</script>

<template>
    <form class="review-form" @submit.prevent="submitReview">
        <p class="eyebrow">SHARE YOUR EXPERIENCE</p>
        <h1>Write a review</h1>

        <button class="back-btn" type="button" @click="router.push(`/event-reviews/${eventId}`)">
            ← Back to reviews
        </button>

        <label for="rating">Rating</label>
        <select id="rating" v-model.number="rating">
            <option :value="1">1</option>
            <option :value="2">2</option>
            <option :value="3">3</option>
            <option :value="4">4</option>
            <option :value="5">5</option>
        </select>

        <label for="comment">Comment</label>
        <textarea id="comment" v-model="comment" rows="5" placeholder="Tell others what you thought about this event."></textarea>

        <button type="submit" :disabled="submitting || !comment.trim()">
            {{ submitting ? 'Submitting...' : 'Submit Review' }}
        </button>

        <p v-if="message">{{ message }}</p>
    </form>
</template>

<style scoped>
.review-form{width:min(680px,calc(100% - 32px));margin:56px auto;padding:28px;background:#1e293b;border:1px solid #334155;border-top:3px solid #f97316;border-radius:12px}.eyebrow{color:#fb923c;font-size:.75rem;font-weight:800;letter-spacing:.12em}.review-form h1{margin:8px 0 18px}.review-form .back-btn{margin:0;background:#334155}.review-form label{display:block;margin:16px 0 8px}.review-form button{margin-top:20px}.review-form p:last-child{color:#86efac}
</style>
