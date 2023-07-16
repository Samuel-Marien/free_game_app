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
      // console.log(myArtworksurl)
      if (myArtworksurl[0] === undefined) {
        artworksSanitized = 'no data'
      } else {
        if (myArtworksurl[0].url) {
          artworksSanitized =
            myArtworksurl[0].url.replace('t_thumb', 't_screenshot_huge') || null
        } else {
          artworksSanitized = 'no data'
        }
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
