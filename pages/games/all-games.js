import React, { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'

import Navbar from '../../components/Navbar'
import AllGamesContainer from '../../components/games/AllGamesContainer'
import { getAllGames } from '../api/web-services/gamesAPI'
import AllGamesSortContainer from '../../components/games/AllGamesSortContainer'

const AllGamePage = (data) => {
  // console.log(data.pageProps.data)
  return (
    <div>
      <Navbar />
      {/* <AllGamesSortContainer /> */}
      <AllGamesContainer games={data.pageProps.data} />
    </div>
  )
}

export default AllGamePage

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  const { query } = context

  const platform = query?.platform || 'pc'
  const category = query?.category || 'all'
  const sorted = query?.sorted || 'release-date'

  if (!session) {
    return {
      redirect: { destination: '/signin', permanent: false }
    }
  }

  const allDatas = await getAllGames(platform, category, sorted)

  const data = allDatas.slice(0, 10)

  return { props: { data, session } }
}
