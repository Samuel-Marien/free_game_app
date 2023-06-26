import React from 'react'

import { getSession } from 'next-auth/react'

import { getGame, getAllGames } from '../api/web-services/gamesAPI'
import { connectToDataBase } from '../../lib/db'

import Navbar from '../../components/Navbar'
import GameDetails from '../../components/games/GameDetails'
import GameCommentsContainer from '../../components/games/GameCommentsContainer'
import GameNotationsContainer from '../../components/games/GameNotationsContainer'
import MembersGameInfosContainer from '../../components/games/MembersGameInfosContainer'
import SimilarGamesContainer from '../../components/games/SimilarGamesContainer'

const DetailsGamePage = (data) => {
  // console.log(data.pageProps)

  return (
    <div>
      <Navbar />
      <GameDetails game={data.pageProps.data} />
      <MembersGameInfosContainer
        notations={data.pageProps.notations}
        comments={data.pageProps.comments}
        owners={data.pageProps.owners}
      />
      <GameNotationsContainer
        notations={data.pageProps.notations}
        gameTitle={data.pageProps.data.title}
        currentUser={data.pageProps.session.user.email}
      />
      <GameCommentsContainer
        gameTitle={data.pageProps.data.title}
        comments={data.pageProps.comments}
      />
      <SimilarGamesContainer similarGames={data.pageProps.similarGames} />
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

  const userEmail = JSON.parse(JSON.stringify(session.user.email))
  const client = await connectToDataBase()
  const userCollection = client.db().collection('users')
  const user = await userCollection.findOne({ email: userEmail })

  if (!user) {
    res.status(404).json({ message: 'User No Found!' })
    client.close()
    return
  }

  const db = client.db()

  const existingComments = await db
    .collection('comments')
    .findOne({ gameId: gameId })
  let comments = []
  if (existingComments) {
    comments = JSON.parse(JSON.stringify(existingComments.comments_collection))
  } else {
    comments = null
  }

  const existingNotations = await db
    .collection('notations')
    .findOne({ gameId: gameId })
  let notations = []
  if (existingNotations) {
    notations = JSON.parse(JSON.stringify(existingNotations.asVoted))
  } else {
    notations = null
  }

  let owners = []
  const existingOwners = await db
    .collection('gamesOwners')
    .findOne({ gameId: parseInt(gameId) })
  if (existingOwners) {
    owners = JSON.parse(JSON.stringify(existingOwners.owners))
  } else {
    owners = null
  }

  const data = await getGame(gameId)

  // Similar games
  const currentCategory = data.genre.toLowerCase()

  const getGames = await getAllGames('all', currentCategory, 'relevance')
  const similarGames = getGames.slice(0, 3)

  return {
    props: { session, data, comments, notations, owners, similarGames }
  }
}
