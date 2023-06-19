import React from 'react'
import { getSession } from 'next-auth/react'

import Navbar from '../../components/Navbar'
import AllGamesContainer from '../../components/games/AllGamesContainer'
import { getAllGames } from '../api/web-services/gamesAPI'
import AllGamesSortContainer from '../../components/games/AllGamesSortContainer'

const AllGamePage = (data) => {
  return (
    <div>
      <Navbar />
      <AllGamesSortContainer />
      <AllGamesContainer games={data.pageProps.data} />
    </div>
  )
}

export default AllGamePage

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  const { query } = context

  const platform = query.platform
  const category = query.category
  const sorted = query.sorted

  // console.log(query)
  // console.log(platform)
  // console.log(category)
  // console.log(sorted)

  if (!session) {
    return {
      redirect: { destination: '/signin', permanent: false }
    }
  }

  const data = await getAllGames(platform, category, sorted)

  return { props: { data, session } }
}
