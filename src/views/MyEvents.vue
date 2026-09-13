<template>
    <div class="p-6 max-w-4xl mx-auto">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">My Events</h1>
            <router-link to="/organizer/events/create" class="border px-4 py-2 rounded">
                Create New Event
            </router-link>
        </div>

        <div v-if="loading" class="text-center py-6">
            Loading events...
        </div>

        <div v-if="error" class="border p-4 rounded mb-4">
            {{ error }}
        </div>

        <div v-if="!loading && events.length > 0" class="grid grid-cols-1 gap-4">
            <!-- show event if loading ->False & there is events to show -->

            <div v-for="event in events" :key="event.id" class="p-4 rounded border">
                <!-- id ia a key value "unique" for each event -->

                <h2 class="text-xl font-semibold">{{ event.title }}</h2>
                <p class="mt-1">{{ event.description }}</p>
                <div class="flex justify-between items-center mt-4 text-sm">
                    <span>Date: {{ event.event_date }}</span>
                    <span class="font-medium">Seats: {{ event.available_seats }}</span>
                </div>
                <router-link :to="`/organizer/events/edit/${event.id}`"
                    class="inline-block mt-4 border px-4 py-2 rounded">
                    Edit
                </router-link>
            </div>
        </div>

        <div v-if="!loading && events.length === 0 && !error" class="text-center py-6">
            No events found. Create your first event!
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiRequest } from '@/services/api.js'

const events = ref([])
const loading = ref(true)
const error = ref(null)

const fetchEvents = async () => { // get data from back end
    try {
        loading.value = true
        const data = await apiRequest('api/organizer/events', 'GET')
        events.value = data || []
    } catch (err) {
        error.value = 'Failed to load events. Please try again later.'
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchEvents()
})
</script>