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
