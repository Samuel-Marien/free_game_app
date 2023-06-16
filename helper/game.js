export async function addGame(game) {
  const response = await fetch('/api/user/add-game', {
    method: 'PATCH',
    body: JSON.stringify(game),
    headers: {
      'content-type': 'application/json'
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong in add game!')
  }

  return data
}

export async function addGameByUser(game) {
  const response = await fetch('/api/user/add-game-by-user', {
    method: 'PATCH',
    body: JSON.stringify(game),
    headers: { 'content-type': 'application/json' }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong in add game!')
  }

  return data
}

export async function removeGame(game) {
  const response = await fetch('/api/user/remove-game', {
    method: 'PATCH',
    body: JSON.stringify(game),
    headers: { 'content-type': 'application/json' }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong in add game!')
  }

  return data
}
