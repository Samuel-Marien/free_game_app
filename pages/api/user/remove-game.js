import { getServerSession } from 'next-auth'
import { connectToDataBase } from '../../../lib/db'
import { authOptions } from '../auth/[...nextauth].js'

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return
  }

  const gameIdToDelete = await req.body

  // console.log(gameIdToDelete)

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ message: 'Not authenticated' })
    return
  }

  const userEmail = session.user.email

  const client = await connectToDataBase()

  const userCollection = client.db().collection('users')
  const user = await userCollection.findOne({ email: userEmail })

  if (!user) {
    res.status(404).json({ message: 'User not found!' })
    client.close()
    return
  }

  // delete in user collection
  const currentGamesIds = user.games_collection.map((item) => item.id)
  const isSaved = currentGamesIds.includes(gameIdToDelete)

  if (!isSaved) {
    res.status(422).json({ message: 'Game dont exist!' })
    client.close()
    return
  }

  const result = await userCollection.updateOne(
    { email: userEmail },
    { $pull: { games_collection: { id: gameIdToDelete } } }
  )

  if (result.modifiedCount === 1) {
    console.log(
      'Élément supprimé avec succès de la collection games_collection.'
    )
  } else {
    console.log('Élément non trouvé dans la collection games_collection.')
  }

  // delate in gamesOwner collection
  const gamesOwnersCollection = client.db().collection('gamesOwners')
  const gameConcerned = gamesOwnersCollection.findOne({
    gameId: gameIdToDelete
  })

  if (!gameConcerned) {
    res.status(404).json({ message: 'Game not found!' })
    client.close()
    return
  }
  const result2 = await gamesOwnersCollection.updateOne(
    {
      gameId: gameIdToDelete
    },
    { $pull: { owners: { createdBy: userEmail } } }
  )

  client.close()
  res.status(200).json({ message: 'Successfully delete game!' })
}

export default handler
