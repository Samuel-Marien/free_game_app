import React from 'react'

import { getSession } from 'next-auth/react'
import { connectToDataBase } from '../lib/db'

import Navbar from '../components/Navbar'
import GamesContainer from '../components/user/GamesContainer'
import SortGameContainer from '../components/user/SortGameContainer'

const UserLibrairy = (data) => {
  const gamesDatas = data.pageProps.result

  // console.log(data.pageProps)
  // console.log(gamesDatas)

  return (
    <div>
      <Navbar />
      <SortGameContainer genres={data.pageProps.genresAvailable} />
      <div className="flex space-x-3">
        <GamesContainer games={gamesDatas} />
      </div>
    </div>
  )
}

export default UserLibrairy

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: { destination: '/signin', permanent: false }
    }
  }
  const { query } = context
  const choice = query.choice || 'sortByDateAdded'
  const option = query.option || 'plus'

  // console.log(context.query)

  const userEmail = JSON.parse(JSON.stringify(session.user.email))
  const client = await connectToDataBase()
  const userCollection = client.db().collection('users')
  const user = await userCollection.findOne({ email: userEmail })

  if (!user) {
    res.status(404).json({ message: 'User No Found!' })
    client.close()
    return
  }

  const data = JSON.parse(JSON.stringify(user.games_collection))

  const genresAvailableTemp = []
  const userGenresAvailable = [...data].map((item) => {
    genresAvailableTemp.push(item.genre)
  })

  const genresAvailable = [...new Set(genresAvailableTemp)]

  const datasSortedByDate = [...data].sort(function (a, b) {
    const titleA = Date.parse(a.release_date)
    const titleB = Date.parse(b.release_date)

    if (titleA < titleB) {
      return -1
    }
    if (titleA > titleB) {
      return 1
    }
    return 0
  })
  const datasSortedByPlatefrom = [...data].sort(function (a, b) {
    const titleA = a.platform
    const titleB = b.platform

    if (titleA < titleB) {
      return -1
    }
    if (titleA > titleB) {
      return 1
    }
    return 0
  })
  const datasSortedByTitles = [...data].sort(function (a, b) {
    const titleA = a.title
    const titleB = b.title

    if (titleA < titleB) {
      return -1
    }
    if (titleA > titleB) {
      return 1
    }
    return 0
  })
  function sortByGenres() {
    const test = [...data].filter((item) =>
      item.genre.toUpperCase().includes(option.toUpperCase())
    )

    return test
  }

  let result = []

  switch (choice) {
    case 'sortByDateAdded':
      option === 'plus' ? (result = [...data]) : (result = [...data].reverse())
      break
    case 'sortByTitle':
      option === 'plus'
        ? (result = [...datasSortedByTitles])
        : (result = [...datasSortedByTitles].reverse())
      break
    case 'sortByRealeaseDate':
      option === 'plus'
        ? (result = [...datasSortedByDate])
        : (result = [...datasSortedByDate].reverse())
      break
    case 'sortByPlatform':
      option === 'plus'
        ? (result = [...datasSortedByPlatefrom].filter(
            (item) =>
              item.platform === 'PC (Windows)' || item.platform === 'Windows'
          ))
        : (result = [...datasSortedByPlatefrom].filter(
            (item) => item.platform === 'Web Browser'
          ))
      break
    case 'sortByGenres':
      result = sortByGenres()
      break

    default:
      result = [...data]
      break
  }

  // console.log(user)

  return {
    props: { choice, option, result, genresAvailable }
  }
}
