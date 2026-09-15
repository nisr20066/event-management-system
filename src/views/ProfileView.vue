<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const role = ref('')

onMounted(async () => {
  try {
    await authStore.fetchProfile()
  } catch (error) {
    console.log(error)
  }

  name.value = authStore.user?.name || ''
  email.value = authStore.user?.email || ''
  role.value = authStore.user?.role || ''
})

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="profile-page">

    <div class="profile-card">

      <h1>My Profile</h1>

      <div class="form-group">
        <label>Name</label>

        <input
          v-model="name"
          type="text"
          disabled
        />
      </div>

      <div class="form-group">
        <label>Email</label>

        <input
          v-model="email"
          type="email"
          disabled
        />
      </div>

      <div class="form-group">
        <label>Role</label>

        <input
          v-model="role"
          type="text"
          disabled
        />
      </div>

      <button
        class="logout"
        @click="handleLogout"
      >
        Logout
      </button>

    </div>

  </div>
</template>

<style scoped>
.profile-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  padding: 20px;
}

.profile-card {
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 7px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box;
  background: #f5f5f5;
}

button {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border: none;
  border-radius: 6px;
  background: #111;
  color: white;
  cursor: pointer;
}

.logout {
  background: #777;
}
</style>
