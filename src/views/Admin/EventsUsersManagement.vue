<template>
  <div class="page">
    <div class="page-heading">
      <div>
        <p class="eyebrow">Administration</p>
        <h1>Events management</h1>
        <p class="page-description">Review, edit, or remove any event.</p>
      </div>
      <button class="refresh-button" type="button" :disabled="loading" @click="loadEvents">
        {{ loading ? 'Refreshing…' : 'Refresh' }}
      </button>
    </div>

    <p v-if="error" class="feedback error" role="alert">{{ error }}</p>
    <p v-if="success" class="feedback success" role="status">{{ success }}</p>

    <section aria-labelledby="events-heading">
      <div class="section-heading"><h2 id="events-heading">All events</h2><p>{{ events.length }} event{{ events.length === 1 ? '' : 's' }}</p></div>
      <p v-if="loading" class="empty-state">Loading events…</p>
      <p v-else-if="!events.length" class="empty-state">There are no events to manage.</p>
      <div v-else class="management-list">
        <article v-for="event in events" :key="event.id" class="management-card">
          <div class="card-copy">
            <h3>{{ event.title }}</h3>
            <p>{{ event.venue || 'Venue not specified' }}</p>
            <p class="muted">{{ event.category || 'Uncategorized' }} · {{ formatPrice(event.ticket_price) }}</p>
          </div>
          <div class="actions">
            <button class="secondary-button" type="button" @click="editEvent(event)">Edit</button>
            <button class="danger-button" type="button" :disabled="deletingEventId === event.id" @click="deleteEvent(event)">
              {{ deletingEventId === event.id ? 'Deleting…' : 'Delete' }}
            </button>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiRequest } from '../../services/api.js'

const router = useRouter()
const events = ref([])
const loading = ref(false)
const deletingEventId = ref(null)
const error = ref('')
const success = ref('')

function setFeedback(message = '', isError = false) {
  if (isError) { error.value = message; success.value = '' } else { success.value = message; error.value = '' }
}

async function loadEvents() {
  loading.value = true
  error.value = ''
  success.value = ''
  try {
    const data = await apiRequest('api/events?limit=100')
    events.value = Array.isArray(data) ? data : data?.items || []
  } catch (err) {
    setFeedback(`Could not load events: ${err.message}`, true)
  } finally {
    loading.value = false
  }
}

function editEvent(event) { router.push(`/organizer/events/edit/${event.id}`) }

async function deleteEvent(event) {
  if (!confirm(`Delete “${event.title}”? This cannot be undone.`)) return

  deletingEventId.value = event.id
  error.value = ''
  try {
    await apiRequest(`api/events/${event.id}`, 'DELETE')
    events.value = events.value.filter(item => item.id !== event.id)
    setFeedback('Event deleted successfully.')
  } catch (err) {
    setFeedback(`Could not delete event: ${err.message}`, true)
  } finally {
    deletingEventId.value = null
  }
}

function formatPrice(value) {
  const amount = Number(value)
  return Number.isFinite(amount) ? `${amount.toLocaleString()} EGP` : 'Price not set'
}

onMounted(loadEvents)
</script>

<style scoped>
.page{max-width:1120px;margin:0 auto;color:#fff}.page-heading,.section-heading,.management-card,.actions{display:flex}.page-heading,.section-heading,.management-card{justify-content:space-between;gap:20px}.page-heading{align-items:center;margin-bottom:24px}.eyebrow{margin:0 0 6px;color:#fb923c;font-size:.78rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase}h1{margin:0;font-size:clamp(1.8rem,4vw,2.2rem)}.page-description,.section-heading p,.card-copy p,.muted{color:#94a3b8}.page-description{margin:8px 0 0}section{padding:24px;background:#1e293b;border:1px solid #334155;border-radius:12px}.section-heading{align-items:start;margin-bottom:16px}.section-heading h2,.section-heading p{margin:0}.section-heading h2{font-size:1.3rem}.management-list{display:grid;gap:12px}.management-card{align-items:center;padding:16px;background:#0f172a;border:1px solid #334155;border-left:3px solid #f97316;border-radius:10px}.card-copy h3{margin:0 0 7px;font-size:1rem}.card-copy p{margin:4px 0;overflow-wrap:anywhere}.muted{font-size:.9rem}.actions{flex:0 0 auto;gap:8px;align-items:center}button{border:0;border-radius:7px;padding:9px 12px;color:#fff;font:inherit;font-weight:700;cursor:pointer}button:disabled{opacity:.55;cursor:not-allowed}.refresh-button,.secondary-button{background:#334155}.danger-button{background:#dc2626}.danger-button:not(:disabled):hover{background:#ef4444}.refresh-button:not(:disabled):hover,.secondary-button:hover{background:#475569}.feedback,.empty-state{margin:16px 0;padding:12px 14px;border-radius:8px}.feedback.error{color:#fecaca;background:#450a0a;border:1px solid #991b1b}.feedback.success{color:#bbf7d0;background:#052e16;border:1px solid #166534}.empty-state{color:#94a3b8;background:#0f172a}@media(max-width:620px){.page-heading,.management-card{align-items:stretch;flex-direction:column}.actions{justify-content:flex-end}section{padding:16px}}
</style>
