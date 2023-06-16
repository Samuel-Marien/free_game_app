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

  const currentGamesIds = user.games_collection.map((item) => item.id)
  const isSaved = currentGamesIds.includes(gameIdToDelete)

  if (!isSaved) {
    res.status(422).json({ message: 'Game dont exist!' })
    client.close()
    return
  }

  // Supprimer l'élément de games_collection en utilisant l'ID
  const result = await userCollection.updateOne(
    { email: userEmail },
    { $pull: { games_collection: { id: gameIdToDelete } } }
  )

  // Vérifier si l'élément a été supprimé avec succès
  if (result.modifiedCount === 1) {
    console.log(
      'Élément supprimé avec succès de la collection games_collection.'
    )
  } else {
    console.log('Élément non trouvé dans la collection games_collection.')
  }

  client.close()
  res.status(200).json({ message: 'Successfully delete game!' })
}

export default handler
