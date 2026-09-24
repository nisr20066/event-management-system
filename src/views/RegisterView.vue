<!-- <script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const fullName = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const role = ref('participant')
const errorMessage = ref('')
const isLoading = ref(false)

const handleRegister = async () => {
  errorMessage.value = ''

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'كلمات المرور غير متطابقة'
    return
  }

  isLoading.value = true

  try {
    await authStore.register({
      name: fullName.value,
      email: email.value,
      phone: phone.value,
      password: password.value
    })
    router.push('/profile')
  } catch (err) {
    errorMessage.value = err.message || 'حدث خطأ أثناء إنشاء الحساب'
  } finally {
    isLoading.value = false
  }
}
</script> -->

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')

const password = ref('')
const confirmPassword = ref('')
const role = ref('participant')

const errorMessage = ref('')
const isLoading = ref(false)

async function handleRegister() {
  errorMessage.value = ''

  if (
    !name.value ||
    !email.value ||
    !password.value ||
    !confirmPassword.value
  ) {
    errorMessage.value = 'Please fill in all fields.'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  if (password.value.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters.'
    return
  }

  isLoading.value = true

  try {
    await authStore.register(
      name.value,
      email.value,
      password.value,
      role.value
    )

    const registeredRole = String(authStore.user?.role || '').toLowerCase()

    if (registeredRole === 'admin') {
      router.push('/admin')
    } else if (registeredRole === 'organizer') {
      router.push('/organizer/dashboard')
    } else {
      router.push('/profile')
    }

  } catch (error) {
    errorMessage.value =
      error.message || 'Registration failed.'

  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="auth-page">

    <div class="auth-card">

      <h1>EventHub</h1>

      <h2>Create Account</h2>

      <p class="subtitle">
        Register to book your favorite events
      </p>

      <form @submit.prevent="handleRegister">

        <div class="form-group">
          <label>Full Name</label>

          <input
            v-model="name"
            type="text"
            placeholder="Enter your name"
          />
        </div>

        <div class="form-group">
          <label>Email</label>

          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>

        

        <div class="form-group">
          <label for="role">Account type</label>

          <select id="role" v-model="role">
            <option value="participant">Participant</option>
            <option value="organizer">Organizer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div class="form-group">
          <label>Password</label>

          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            autocomplete="new-password"
          />
        </div>

        <div class="form-group">
          <label>Confirm Password</label>

          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            autocomplete="new-password"
          />
        </div>

        <p
          v-if="errorMessage"
          class="error"
        >
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Creating Account...' : 'Register' }}
        </button>

      </form>

      <p class="bottom-text">
        Already have an account?

        <RouterLink to="/login">
          Login
        </RouterLink>
      </p>

    </div>

  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 10px;
}

h2 {
  text-align: center;
  margin-bottom: 5px;
}

.subtitle {
  text-align: center;
  color: #777;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 18px;
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
}

select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 6px;
  background: #111;
  color: white;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
}

.error {
  color: red;
  margin-bottom: 15px;
}

.bottom-text {
  text-align: center;
  margin-top: 20px;
}
</style>

<style scoped>
.auth-page{background:radial-gradient(circle at 80% 15%,rgba(249,115,22,.16),transparent 28%),#0f172a}.auth-card{border-top:3px solid #f97316!important}.auth-card h1,.auth-card h2{color:#fff}.subtitle,.bottom-text{color:#94a3b8}.form-group label{color:#cbd5e1}.form-group input,.form-group select{background:#0f172a;color:#fff;border-color:#475569}.form-group input:focus,.form-group select:focus{border-color:#f97316}.auth-card button{background:#f97316}.bottom-text a{color:#fb923c}
</style>
