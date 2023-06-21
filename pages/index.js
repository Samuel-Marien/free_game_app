/* eslint-disable @next/next/no-img-element */
import { useSession, getSession } from 'next-auth/react'

import { connectToDataBase } from '../lib/db'
import { getSuggestedGames, getAllGames } from './api/web-services/gamesAPI'

import Head from 'next/head'
import Navbar from '../components/Navbar'
import SuggestedContainer from '../components/user/SuggestedContainer'
import RecentlyAddedContainer from '../components/user/RecentlyAddedContainer'

export default function Home(data) {
  const { data: session, status } = useSession()

  // console.log(data.pageProps)

  // console.log(session)
  // console.log(status)

  return (
    <div>
      <Head>
        <title>My Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" ">
        <Navbar />
        welcome{' '}
        {session ? <span>{session.user.email} </span> : <span>visitor </span>}
        its Home page
        <SuggestedContainer
          user={session && session}
          suggestedGames={data.pageProps.suggestedGames}
        />
        <RecentlyAddedContainer
          recentlyAddedGames={data.pageProps.recentlyAddedGames}
        />
      </main>
      <footer></footer>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })
  // console.log(session)

  const recentlyAddedPlatform = context?.query?.platform || 'all'

  const userEmail = session?.user?.email || ''

  const client = await connectToDataBase()
  const userCollection = client.db().collection('users')
  const user = await userCollection.findOne({ email: userEmail })

  const data = user?.games_collection || [
    { genre: 'mmorpg' },
    { genre: 'shooter' }
  ]

  const genresAvailableTemp = []
  const userGenresAvailable = [...data].map((item) => {
    genresAvailableTemp.push(item.genre)
  })

  function classementRedondance(myArray) {
    // Créer un objet pour stocker la fréquence de chaque élément
    const frequencies = {}
    myArray.forEach((element) => {
      if (frequencies[element]) {
        frequencies[element]++
      } else {
        frequencies[element] = 1
      }
    })

    // Trier les éléments en fonction de leur fréquence (du plus grand au plus petit)
    const sortedElements = Object.keys(frequencies).sort(
      (a, b) => frequencies[b] - frequencies[a]
    )

    // Retourner les deux premiers éléments (ou tous les éléments s'il y en a moins de deux)
    return sortedElements.slice(0, 2).join('.').toLowerCase()
  }

  const result = classementRedondance(genresAvailableTemp)
  // console.log(result)

  const apiData = await getSuggestedGames(result)
  const suggestedGames = apiData.slice(0, 3)

  const getRecentlyAddedGames = await getAllGames(
    recentlyAddedPlatform,
    'all',
    'release-date'
  )
  const recentlyAddedGames = getRecentlyAddedGames.slice(0, 7)

  const getGamesNotations = client.db().collection('notations')
  const gamesNotations = await getGamesNotations.find({}).toArray()

  // console.log(gamesNotations)

  function sortByVotes(array) {
    const scoreMap = { 1: -10, 2: 0, 3: 10 }

    // Ajouter un score à chaque élément
    const elementsWithScores = array.map((element) => {
      const totalScore = element.asVoted.flat().reduce((acc, vote) => {
        const note = vote.note
        return acc + (scoreMap[note] || 0)
      }, 0)

      return { element, totalScore }
    })

    // Trier les éléments par nombre d'éléments dans asVoted, puis par score
    const sortedElements = elementsWithScores.sort((a, b) => {
      if (a.element.asVoted.length !== b.element.asVoted.length) {
        return b.element.asVoted.length - a.element.asVoted.length
      }
      return b.totalScore - a.totalScore
    })

    // Retourner uniquement les éléments triés
    return sortedElements.map((elementWithScore) => elementWithScore.element)
  }

  const communityRecommendedGames = JSON.parse(
    JSON.stringify(sortByVotes(gamesNotations))
  )

  return {
    props: { suggestedGames, recentlyAddedGames, communityRecommendedGames }
  }
}
