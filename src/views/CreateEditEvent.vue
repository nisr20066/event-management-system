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

      <div class="mb-4">
        <label class="block mb-2">Venue</label>

        <input
          type="text"
          v-model="form.venue"
          class="w-full p-2 border rounded"
          required
        />
      </div>

      <!-- Event Date -->
      <div class="mb-4">
        <label class="block mb-2">Event Date</label>

        <input
          type="datetime-local"
          v-model="form.event_date"
          class="w-full p-2 border rounded"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block mb-2">Number of Rows</label>

        <input
          type="number"
          v-model.number="form.total_rows"
          class="w-full p-2 border rounded"
          required
          min="1"
        />
      </div>

      <div class="mb-4">
        <label class="block mb-2">Seats per Row</label>

        <input
          type="number"
          v-model.number="form.seats_per_row"
          class="w-full p-2 border rounded"
          required
          min="1"
        />
      </div>

      <div class="mb-4">
        <label class="block mb-2">Ticket Price (EGP)</label>

        <input
          type="number"
          v-model.number="form.ticket_price"
          class="w-full p-2 border rounded"
          required
          min="0"
          step="0.01"
        />
      </div>

      <div class="mb-4">
        <label class="block mb-2">Category <small>(optional)</small></label>

        <input
          type="text"
          v-model="form.category"
          class="w-full p-2 border rounded"
        />
      </div>

      <div class="mb-4">
        <label class="block mb-2">Image URL <small>(optional)</small></label>

        <input
          type="url"
          v-model="form.image_url"
          class="w-full p-2 border rounded"
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
  venue: '',
  total_rows: 10,
  seats_per_row: 20,
  ticket_price: 0,
  category: '',
  image_url: ''
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
        ? data.event_date.slice(0, 16)
        : '',
      venue: data.venue || '',
      total_rows: data.total_rows ?? 10,
      seats_per_row: data.seats_per_row ?? 20,
      ticket_price: data.ticket_price ?? 0,
      category: data.category || '',
      image_url: data.image_url || ''
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

    const eventData = {
      title: form.value.title.trim(),
      description: form.value.description.trim() || null,
      venue: form.value.venue.trim(),
      event_date: form.value.event_date,
      ticket_price: Number(form.value.ticket_price),
      category: form.value.category.trim() || null,
      image_url: form.value.image_url.trim() || null
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

      eventData.total_rows = Number(form.value.total_rows)
      eventData.seats_per_row = Number(form.value.seats_per_row)

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

<style scoped>
.p-6{background:#1e293b;border:1px solid #334155!important;border-top:3px solid #f97316!important;border-radius:12px!important;color:#fff}.max-w-lg{max-width:680px}.mx-auto{margin:56px auto}.text-2xl{color:#fff}.mb-2{margin-bottom:8px}.block{display:block}.w-full{width:100%}.p-2{padding:12px!important}.border{border-color:#475569!important}.rounded{border-radius:8px!important}.font-semibold{font-weight:700}.p-6 button{background:#f97316;color:#fff;border:0}.text-center{color:#94a3b8}
</style>
