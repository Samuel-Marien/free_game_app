import axios from 'axios'

export async function getAllGames() {
  let data = []
  let url = process.env.API_URL + '/games'

  try {
    const res = await axios.get(url).then((value) => value.data)
    data = await res
  } catch (error) {
    console.log(error)
  }

  return data
}

export async function getGame(gameId) {
  let data = []
  let url = `${process.env.API_URL}/game?id=${gameId}`

  try {
    const res = await axios.get(url).then((value) => value.data)
    data = await res
  } catch (error) {
    console.log(error)
  }

  return data
}
