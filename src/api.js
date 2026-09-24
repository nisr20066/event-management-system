const BASE_URL = 'https://eventhub-backend-m01d.onrender.com/api'

function getErrorMessage(data, status) {
  const details = Array.isArray(data?.detail) ? data.detail : []
  const detail = details.map(item => item?.msg).filter(Boolean).join(' ')
  const rawMessage = String(detail || data?.detail || data?.message || '').toLowerCase()

  if (status === 401 || /incorrect|invalid credentials|not authenticated/.test(rawMessage)) {
    return 'Incorrect email or password.'
  }

  if (/password/.test(rawMessage) && /(8|least|short|length)/.test(rawMessage)) {
    return 'Password must be at least 8 characters.'
  }

  if (/email/.test(rawMessage) && /(already|exist|registered|unique)/.test(rawMessage)) {
    return 'An account with this email already exists.'
  }

  if (/email/.test(rawMessage) && /(valid|format)/.test(rawMessage)) {
    return 'Please enter a valid email address.'
  }

  if (status === 422) {
    return 'Please check your details and try again.'
  }

  return data?.message || `Something went wrong. Please try again.`
}

export async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token')

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    if (response.status === 401) {
      // Do not keep redirecting users with an expired or revoked session.
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }

    throw new Error(getErrorMessage(data, response.status))
  }

  return data
}
