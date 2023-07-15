import axios from 'axios'

const headers = {
  Accept: 'application/json',
  'Client-ID': process.env.IGBD_CLIENT_ID,
  Authorization: process.env.IGBD_AUTH
}

export async function getVideoByGameName(name) {
  try {
    const res = await fetch(
      `https://api.igdb.com/v4/games?fields=*&limit=2&search=${name}`,
      {
        method: 'POST',
        headers: headers
      }
    )
      .then((response) => response.json())
      .catch((err) => {
        console.error(err)
      })

    const videosIds = res
      .map((video) => video.videos)
      .filter((video) => video !== undefined)
      .flat()

    // Get one video
    const videoUrl = await getVideosUrls(videosIds[0])
    const videoUrlSanitized = videoUrl[0].video_id

    return { video: videoUrlSanitized }
  } catch (error) {
    console.error(error)
  }
}

export async function getVideosUrls(id) {
  const res = await fetch(
    `https://api.igdb.com/v4/game_videos/${id}?fields=video_id`,
    {
      method: 'GET',
      headers: headers
    }
  )
    .then((response) => response.json())
    .catch((err) => {
      console.error(err)
    })

  return res
}

export async function getArtworksByGameName(name) {
  try {
    const res = await fetch(
      `https://api.igdb.com/v4/games?fields=*&limit=2&search=${name}`,
      {
        method: 'POST',
        headers: headers
      }
    )
      .then((response) => response.json())
      .catch((err) => {
        console.error(err)
      })

    const artworksIds = res
      .map((artworks) => artworks.artworks)
      .filter((artworks) => artworks !== [])

      .flat()

    // console.log(artworksIds)

    // Get one artworks
    let artworksSanitized = ''
    try {
      const myArtworksurl = await getArtworksUrls(artworksIds[0])
      if (myArtworksurl === undefined) {
        artworksSanitized = 'no data'
      } else {
        artworksSanitized =
          myArtworksurl[0].url.replace('t_thumb', 't_screenshot_huge') || null
      }

      return { artworks: artworksSanitized }
    } catch (error) {
      console.error(error)
    }
  } catch (error) {
    console.error(error)
  }
}

export async function getArtworksUrls(id) {
  const res = await fetch(
    `https://api.igdb.com/v4/artworks/${id}?fields=url,height,width`,
    {
      method: 'GET',
      headers: headers
    }
  )
    .then((response) => response.json())
    .catch((err) => {
      console.error(err)
    })

  // console.log(res)
  return res
}

// const screenShotsIds = res
//   .map((screenshot) => screenshot.screenshots)
//   .filter((video) => video !== undefined)
//   .flat()

// const artworksIds = res
//   .map((artwork) => artwork.artworks)
//   .filter((artwork) => artwork !== undefined)
//   .flat()

// console.log(res)
// console.log(videosIds)
// console.log(screenShotsIds)
// console.log(artworksIds)

// Get array of artworks
// let artworksUrlsTemp = []
// for (let i = 0; i < artworksIds.length; i++) {
//   artworksUrlsTemp.push(await getArtworksUrls(artworksIds[i]))
// }

// console.log(artworksUrlsTemp)
