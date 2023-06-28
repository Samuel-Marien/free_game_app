import React from 'react'
import { getSession } from 'next-auth/react'

import AllGamesContainer from '../../components/games/AllGamesContainer'
import { getAllGames } from '../api/web-services/gamesAPI'
import AllGamesSortContainer from '../../components/games/AllGamesSortContainer'

const AllGamePage = (data) => {
  // console.log(data.pageProps)
  return (
    <>
      <AllGamesSortContainer
        totalGames={data.pageProps.totalGames}
        itemsByPage={data.pageProps.itemsByPage}
        totalPages={data.pageProps.totalPages}
      />
      <AllGamesContainer games={data.pageProps.data} />
    </>
  )
}

export default AllGamePage

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  const { query } = context

  const platform = query?.platform || 'pc'
  const category = query?.category || 'all'
  const sorted = query?.sorted || 'release-date'
  const page = query?.page

  if (!session) {
    return {
      redirect: { destination: '/signin', permanent: false }
    }
  }

  const allDatas = await getAllGames(platform, category, sorted)

  const totalGames = allDatas.length

  const itemsByPage = 12

  const totalPages = Math.floor(totalGames / itemsByPage)

  const itemsRange = (initialStart, itemsByPage) => {
    const myInitialStart = initialStart * itemsByPage
    if (myInitialStart === itemsByPage) {
      return { start: 0, end: itemsByPage }
    }
    return { start: myInitialStart, end: myInitialStart + itemsByPage }
  }

  const { start, end } = itemsRange(page, itemsByPage)

  const data = allDatas.slice(start, end)

  return { props: { data, session, totalGames, itemsByPage, totalPages } }
}
