

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { request } from '@/api'

export const useAuthStore = defineStore('auth', () => {

  const token = ref(
    localStorage.getItem('token')
  )

  const user = ref(
    JSON.parse(
      localStorage.getItem('user') || 'null'
    )
  )

  const isAuthenticated = computed(
    () => !!token.value
  )


  async function login(email, password) {

    const data = await request('/auth/login', {
      method: 'POST',

      body: JSON.stringify({
        email: email,
        password: password
      })
    })

    token.value = data.access_token
    user.value = data.user

    localStorage.setItem(
      'token',
      token.value
    )

    localStorage.setItem(
      'user',
      JSON.stringify(user.value)
    )

    return data
  }


  async function register(name, email, password) {

    const data = await request('/auth/register', {
      method: 'POST',

      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        role: 'participant'
      })
    })

    token.value = data.access_token
    user.value = data.user

    localStorage.setItem('token', token.value)
  localStorage.setItem('user', JSON.stringify(user.value))

    return data
  }


  async function fetchProfile() {

    const data = await request('/auth/me')

    user.value = data

    localStorage.setItem(
      'user',
      JSON.stringify(user.value)
    )

    return user.value
  }


  function logout() {

    token.value = null
    user.value = null

    localStorage.removeItem('token')
    localStorage.removeItem('user')
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