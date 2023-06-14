import React from 'react'

import { getSession } from 'next-auth/react'

import { getGame } from '../api/web-services/gamesAPI'
import { connectToDataBase } from '../../lib/db'

import Navbar from '../../components/Navbar'
import GameDetails from '../../components/games/GameDetails'
import GameCommentsContainer from '../../components/games/GameCommentsContainer'

const DetailsGamePage = (data) => {
  // console.log(data.pageProps)
  return (
    <div>
      <Navbar />
      <GameDetails game={data.pageProps.data} />
      <GameCommentsContainer
        gameTitle={data.pageProps.data.title}
        comments={data.pageProps.comments}
      />
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

  // test debut
  //check if user is really authenticated
  const userEmail = JSON.parse(JSON.stringify(session.user.email))
  const client = await connectToDataBase()
  const userCollection = client.db().collection('users')
  const user = await userCollection.findOne({ email: userEmail })

  if (!user) {
    res.status(404).json({ message: 'User No Found!' })
    client.close()
    return
  }

  // fetch db with gameId
  const db = client.db()
  const existingComments = await db
    .collection('comments')
    .findOne({ gameId: gameId })
  //

  const comments = JSON.parse(
    JSON.stringify(existingComments.comments_collection)
  )

  //test fin
  const data = await getGame(gameId)

  return { props: { session, data, comments } }
}
