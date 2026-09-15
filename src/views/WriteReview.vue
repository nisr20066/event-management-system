<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { apiRequest } from '@/services/api.js';

const route = useRoute();
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
    } catch (err) {
        message.value = "Failed to submit review. You may need to log in first.";
    } finally {
        submitting.value = false;
    }
}
</script>

<template>
    <div>
        <h1>Write a Review</h1>

        <label>Rating:</label>
        <select v-model.number="rating">
            <option :value="1">1</option>
            <option :value="2">2</option>
            <option :value="3">3</option>
            <option :value="4">4</option>
            <option :value="5">5</option>
        </select>

        <br /><br />

        <label>Comment:</label><br />
        <textarea v-model="comment" rows="4" cols="40"></textarea>

        <br /><br />

        <button @click="submitReview" :disabled="submitting">
            {{ submitting ? 'Submitting...' : 'Submit Review' }}
        </button>

        <p v-if="message">{{ message }}</p>
    </div>
</template>