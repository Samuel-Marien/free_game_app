import axios from 'axios'

let url = process.env.API_URL + '/games'

export async function getAllGames() {
  let data = []

  try {
    const res = await axios.get(url).then((value) => value.data)
    data = await res
  } catch (error) {
    console.log(error)
  }

  return data
}
