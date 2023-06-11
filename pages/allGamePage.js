import React from 'react'
import { getSession } from 'next-auth/react'

import Navbar from '../components/Navbar'
import AllGamesContainer from '../components/AllGamesContainer'
import { getAllGames } from './api/web-services/getAllGames'

const AllGamePage = (data) => {
  return (
    <div>
      <Navbar />
      <AllGamesContainer games={data.pageProps.data} />
    </div>
  )
}

export default AllGamePage

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: { destination: '/signPage', permanent: false }
    }
  }

  const data = await getAllGames()

  return { props: { data, session } }
}
