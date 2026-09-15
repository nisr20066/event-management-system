<template>
  <div class="p-6 max-w-lg mx-auto rounded border">
    <h1 class="text-2xl font-bold mb-4">
      {{ isEditMode ? 'Edit Event' : 'Create Event' }}
    </h1>

    <div v-if="loadingEvent" class="text-center py-4">
      Loading event...
    </div>

    <form v-else @submit.prevent="handleSubmit">

      <!-- Event Title -->
      <div class="mb-4">
        <label class="block mb-2">Event Title</label>

        <input
          type="text"
          v-model="form.title"
          class="w-full p-2 border rounded"
          required
        />
      </div>

      <!-- Description -->
      <div class="mb-4">
        <label class="block mb-2">Description</label>

        <textarea
          v-model="form.description"
          class="w-full p-2 border rounded"
          required
        ></textarea>
      </div>

      <!-- Event Date -->
      <div class="mb-4">
        <label class="block mb-2">Event Date</label>

        <input
          type="date"
          v-model="form.event_date"
          class="w-full p-2 border rounded"
          required
        />
      </div>

      <!-- Available Seats -->
      <div class="mb-4">
        <label class="block mb-2">Available Seats</label>

        <input
          type="number"
          v-model="form.available_seats"
          class="w-full p-2 border rounded"
          required
          min="0"
        />
      </div>

      <!-- Save Button -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full p-2 rounded font-semibold border"
      >
        {{
          loading
            ? 'Saving...'
            : (isEditMode ? 'Update Event' : 'Create Event')
        }}
      </button>

    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apiRequest } from '@/services/api.js'

const route = useRoute()
const router = useRouter()

const loading = ref(false)          // update or create
const loadingEvent = ref(false)    //fetch

const form = ref({   // object to store event
  title: '',
  description: '',
  event_date: '',
  available_seats: 0
})

// check if we are editing an existing event or creating
const isEditMode = computed(() => !!route.params.id)  // !! convert to boolean


// =========================
// get Event for edit
// =========================
const fetchEvent = async () => {
  if (!isEditMode.value) return // if not edit --> skip

  try {
    loadingEvent.value = true //det event data to edit "tell user that page is loading"

    const data = await apiRequest(
      `api/events/${route.params.id}`,   // request ID
      'GET'
    ) // save data of event in "data"

    form.value = {              // put the data comes from backend in a form
      title: data.title || '', // if not exist put ''
      description: data.description || '',
      event_date: data.event_date
        ? data.event_date.split('T')[0]
        : '',
      available_seats: data.available_seats ?? 0 // Null or undefined -->0
    }

  } catch (err) {  // catch error of API
    console.error('Failed to load event:', err)

    alert(`Failed to load event: ${err.message}`)

  } finally {
    loadingEvent.value = false // stop loading for both
  }
}


// =========================
// Create / Update Event
// =========================
const handleSubmit = async () => {   // when press submit

  try {
    loading.value = true

    const eventData = {   // send to back end
      title: form.value.title,
      description: form.value.description,
      event_date: form.value.event_date,
      available_seats: Number(form.value.available_seats)
    }


    // =========================
    // EDIT
    // =========================
    if (isEditMode.value) {

      await apiRequest(
        `api/events/${route.params.id}`,
        'PUT',
        eventData
      )

      alert('Event updated successfully!')

    }

    // =========================
    // CREATE
    // =========================
    else {

      await apiRequest(
        'api/events',
        'POST',
        eventData
      )

      alert('Event created successfully!')

    }


    // go back to My Events
    router.push('/organizer/my-events')


  } catch (err) {

    console.error('Failed to save event:', err)

    // show the REAL error --> authoration 401 error
    alert(`Failed to save event: ${err.message}`)

  } finally {

    loading.value = false

  }
}


// load event when editing
onMounted(() => {
  fetchEvent()
})


// edit --> front end 
// update --> edit back end
</script>