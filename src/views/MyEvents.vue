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
                    <span class="font-medium">Seats: {{ eventSeats(event) }}</span>
                </div>
                <div class="event-actions">
                    <router-link :to="`/organizer/events/edit/${event.id}`"
                        class="inline-block mt-4 border px-4 py-2 rounded">
                        Edit
                    </router-link>
                    <button
                        type="button"
                        class="delete-button"
                        :disabled="deletingEventId === event.id"
                        @click="deleteEvent(event)"
                    >
                        {{ deletingEventId === event.id ? 'Deleting...' : 'Delete' }}
                    </button>
                </div>
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
const deletingEventId = ref(null)

function eventSeats(event) {
    if (event.available_seats !== null && event.available_seats !== undefined) {
        return Number(event.available_seats) || 0
    }

    return (Number(event.total_rows) || 0) * (Number(event.seats_per_row) || 0)
}

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

async function deleteEvent(event) {
    if (!confirm(`Delete “${event.title}”? This cannot be undone.`)) return

    deletingEventId.value = event.id
    error.value = null
    try {
        await apiRequest(`api/events/${event.id}`, 'DELETE')
        events.value = events.value.filter(item => item.id !== event.id)
    } catch (err) {
        error.value = err.message || 'Failed to delete event. Please try again later.'
    } finally {
        deletingEventId.value = null
    }
}

onMounted(() => {
    fetchEvents()
})
</script>

<style scoped>
.p-6{color:#fff}.flex{display:flex}.justify-between{justify-content:space-between}.items-center{align-items:center}.grid{display:grid}.gap-4{gap:16px}.border{background:#1e293b;border:1px solid #334155!important}.rounded{border-radius:12px!important}.text-2xl,.text-xl{color:#fff}.text-sm{color:#94a3b8}.px-4.py-2{background:#f97316;color:#fff;border:0;text-decoration:none}.inline-block{display:inline-block}.mt-4{margin-top:16px}.p-4{padding:20px!important}.grid .border{border-left:3px solid #f97316!important}.grid p{color:#cbd5e1}.text-center{color:#94a3b8}.event-actions{display:flex;gap:10px;align-items:center;margin-top:16px}.event-actions .mt-4{margin-top:0}.event-actions .inline-block{padding:8px 16px;border-radius:8px;line-height:normal}.delete-button{padding:8px 16px;background:#dc2626;color:#fff;border:0;border-radius:8px;font:inherit;line-height:normal;cursor:pointer}.delete-button:hover:not(:disabled){background:#ef4444}.delete-button:disabled{opacity:.55;cursor:not-allowed}
</style>
