import React from 'react'

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

export async function getServerSideProps() {
  const data = await getAllGames()

  return { props: { data } }
}
