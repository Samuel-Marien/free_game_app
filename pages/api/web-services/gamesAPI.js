import axios from 'axios'

export async function getAllGames(platform, category, sorted, numOfGames) {
  let data = []
  let url = ''
  // console.log(platform, category, sorted)
  if (category === 'all') {
    url = `${process.env.API_URL}?platform=${platform}&sort-by=${sorted}`
  } else {
    url = `${process.env.API_URL}?platform=${platform}&category=${category}&sort-by=${sorted}`
  }

  try {
    const res = await axios.get(url).then((value) => value.data)
    // data = await res
    data = await res
  } catch (error) {
    console.log(error)
  }

  return data.slice(0, numOfGames)
}

export async function getGame(gameId) {
  let data = []
  let url = `${process.env.API_URL_ONE_GAME}${gameId}`

  try {
    const res = await axios.get(url).then((value) => value.data)
    data = await res
  } catch (error) {
    console.log(error)
  }

  return data
}

export async function getSuggestedGames(genresString, numOfGames) {
  let data = []
  let url = `${process.env.API_URL_MULTI_TAGS}${genresString}&platform=all&sort-by=relevance`

  try {
    const res = await axios.get(url).then((value) => value.data)
    data = await res
  } catch (error) {
    console.log(error)
  }

  return data.slice(0, numOfGames)
}

export async function getRandomGame() {
  let data = []
  let allGamesDatas = []
  let oneGameData = []
  let url = process.env.API_URL

  try {
    const res = await axios.get(url).then((value) => value.data)
    data = await res
    for (let i = 0; i < 2; i++) {
      const getRandomInt = Math.floor(Math.random() * data.length)
      oneGameData = data[getRandomInt]
      allGamesDatas.push(oneGameData)
    }
  } catch (error) {
    console.log(error)
  }

  return allGamesDatas
}
