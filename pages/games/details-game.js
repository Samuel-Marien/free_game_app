import React from 'react'

import { getSession } from 'next-auth/react'

import { getGame } from '../api/web-services/gamesAPI'

import Navbar from '../../components/Navbar'
import GameDetails from '../../components/games/GameDetails'
import GameCommentsContainer from '../../components/games/GameCommentsContainer'

const DetailsGamePage = (data) => {
  console.log(data.pageProps.data)
  return (
    <div>
      <Navbar />
      <GameDetails game={data.pageProps.data} />
      <GameCommentsContainer gameTitle={data.pageProps.data.title} />
    </div>
  )
}

export default DetailsGamePage

export async function getServerSideProps(context) {
  const gameId = context.query.id
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: { destination: '/signin', permanent: false }
    }
  }

  const data = await getGame(gameId)

  return { props: { session, data } }
}
