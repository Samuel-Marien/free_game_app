export async function changePasswordHandler(passwordData) {
  const response = await fetch('/api/user/change-password', {
    method: 'PATCH',
    body: JSON.stringify(passwordData),
    headers: {
      'content-type': 'application/json'
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong :(')
  }

  return data
}

export async function createUser({ firstName, lastName, email, password }) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, email, password }),
    headers: { 'Content-Type': 'application/json' }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong :(')
  }

  return data
}

export async function createComment({ title, content, gameId, gameTitle }) {
  const response = await fetch('/api/user/add-comment', {
    method: 'POST',
    body: JSON.stringify({ title, content, gameId, gameTitle }),
    headers: { 'Content-Type': 'application/json' }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong :(')
  }

  return data
}

export async function addNotation({ gameId, gameTitle, note }) {
  const response = await fetch('/api/user/add-notation', {
    method: 'POST',
    body: JSON.stringify({ gameId, gameTitle, note }),
    headers: { 'Content-Type': 'application/json' }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong :(')
  }

  return data
}
