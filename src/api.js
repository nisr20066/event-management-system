const BASE_URL = 'https://eventhub-backend-m01d.onrender.com/api'

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

    throw new Error(
      data.message || `Error ${response.status}: Something went wrong`
    )
  }

  return data
}
