

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { request } from '@/api'

const TOKEN_KEY = 'token'
const USER_KEY = 'user'

function getStoredUser() {
  const storedUser = localStorage.getItem(USER_KEY)

  if (!storedUser) return null

  try {
    return JSON.parse(storedUser)
  } catch {
    // A malformed value should never prevent the application from loading.
    localStorage.removeItem(USER_KEY)
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {

  const token = ref(localStorage.getItem(TOKEN_KEY))
  const user = ref(getStoredUser())

  if (!token.value && user.value) {
    user.value = null
    localStorage.removeItem(USER_KEY)
  }

  const isAuthenticated = computed(
    () => !!token.value
  )

  function saveSession(sessionToken, sessionUser) {
    if (!sessionToken) {
      throw new Error('The login response did not include an access token.')
    }

    token.value = sessionToken
    user.value = sessionUser || null

    localStorage.setItem(TOKEN_KEY, sessionToken)

    if (user.value) {
      localStorage.setItem(USER_KEY, JSON.stringify(user.value))
    } else {
      localStorage.removeItem(USER_KEY)
    }
  }

  async function login(email, password) {

    const data = await request('/auth/login', {
      method: 'POST',

      body: JSON.stringify({
        email: email,
        password: password
      })
    })

    saveSession(data.access_token, data.user)

    return data
  }


  async function register(name, email, password, role = 'participant') {

    const data = await request('/auth/register', {
      method: 'POST',

      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        role
      })
    })

    saveSession(data.access_token, data.user)

    return data
  }


  async function fetchProfile() {

    const data = await request('/auth/me')

    user.value = data

    localStorage.setItem(USER_KEY, JSON.stringify(user.value))

    return user.value
  }


  function logout() {

    token.value = null
    user.value = null

    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }


  return {
    token,
    user,
    isAuthenticated,
    login,
    register,
    fetchProfile,
    logout
  }
})
