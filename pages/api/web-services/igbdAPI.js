// import axios from 'axios'

// const headers = {
//   Accept: 'application/json',
//   'Client-ID': process.env.IGBD_CLIENT_ID,
//   Authorization: process.env.IGBD_AUTH
// }

// export async function getGameByName(name) {
//   const res = await fetch(
//     `https://api.igdb.com/v4/games?fields=*&limit=2&search=${name}`,
//     {
//       method: 'POST',
//       headers: headers
//     }
//   )
//     .then((response) => response.json())
//     .catch((err) => {
//       console.error(err)
//     })

//   const videosIds = res
//     .map((video) => video.videos)
//     .filter((video) => video !== undefined)
//     .flat()

//   // const screenShotsIds = res
//   //   .map((screenshot) => screenshot.screenshots)
//   //   .filter((video) => video !== undefined)
//   //   .flat()

//   // const artworksIds = res
//   //   .map((artwork) => artwork.artworks)
//   //   .filter((artwork) => artwork !== undefined)
//   //   .flat()

//   // console.log(res)
//   // console.log(videosIds)
//   // console.log(screenShotsIds)
//   // console.log(artworksIds)

//   // Get array of artworks
//   // let artworksUrlsTemp = []
//   // for (let i = 0; i < artworksIds.length; i++) {
//   //   artworksUrlsTemp.push(await getArtworksUrls(artworksIds[i]))
//   // }

//   // console.log(artworksUrlsTemp)

//   // Get one video (more fast)
//   const videoUrl = await getVideosUrls(videosIds[0])
//   const videoUrlSanitized = videoUrl[0].video_id
//   // return { video: videoUrlSanitized, artworks: artworksUrlsTemp }
//   return { video: videoUrlSanitized }
// }

// export async function getVideosUrls(id) {
//   const res = await fetch(
//     `https://api.igdb.com/v4/game_videos/${id}?fields=video_id`,
//     {
//       method: 'GET',
//       headers: headers
//     }
//   )
//     .then((response) => response.json())
//     .catch((err) => {
//       console.error(err)
//     })

//   return res
// }

// export async function getArtworksUrls(id) {
//   const res = await fetch(
//     `https://api.igdb.com/v4/artworks/${id}?fields=url,height,width`,
//     {
//       method: 'GET',
//       headers: headers
//     }
//   )
//     .then((response) => response.json())
//     .catch((err) => {
//       console.error(err)
//     })

//   // console.log(res)
//   return res
// }
