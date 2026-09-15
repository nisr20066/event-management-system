<!-- <script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  errorMessage.value = ''
  isLoading.value = true

  try {
    await authStore.login({
      email: email.value,
      password: password.value
    })
    router.push('/profile')
  } catch (err) {
    errorMessage.value = err.message || 'فشل تسجيل الدخول، تأكد من البيانات المدخلة'
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

const email = ref('')
const password = ref('')

const errorMessage = ref('')
const isLoading = ref(false)

async function handleLogin() {
  errorMessage.value = ''

  if (!email.value || !password.value) {
    errorMessage.value = 'Please enter your email and password.'
    return
  }

  isLoading.value = true

  try {
    await authStore.login(
      email.value,
      password.value
    )

    router.push('/profile')
  } catch (error) {
    errorMessage.value =
      error.message || 'Login failed.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="auth-page">

    <div class="auth-card">

      <h1>EventHub</h1>

      <h2>Welcome Back</h2>

      <p class="subtitle">
        Login to continue
      </p>

      <form @submit.prevent="handleLogin">

        <div class="form-group">
          <label>Email</label>

          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div class="form-group">
          <label>Password</label>

          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
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
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>

      </form>

      <p class="bottom-text">
        Don't have an account?

        <RouterLink to="/register">
          Register
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
  cursor: not-allowed;
}

.error {
  color: red;
  margin-bottom: 15px;
}

.bottom-text {
  text-align: center;
  margin-top: 20px;
}

.bottom-text a {
  font-weight: bold;
}
</style>