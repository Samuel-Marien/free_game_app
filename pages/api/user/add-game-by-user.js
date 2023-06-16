import { getServerSession } from 'next-auth'
import { connectToDataBase } from '../../../lib/db'
import { authOptions } from '../auth/[...nextauth].js'

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return
  }

  const { id, title } = req.body

  // res.status(201).json({ message: 'plop plop avec succès' })

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ message: 'Not authenticated' })
    return
  }

  const userEmail = session.user.email

  console.log(id, title, userEmail)

  const client = await connectToDataBase()
  const db = client.db()

  const myDate = new Date()

  const result = await db.collection('gamesOwners').updateOne(
    {
      gameId: id
    },
    {
      $set: {
        gameTitle: title
      },
      $addToSet: {
        owners: {
          createdBy: userEmail,
          createdAt: myDate
        }
      }
    },
    { upsert: true } // Insérer si aucune correspondance gameId n'est trouvée
  )
  client.close()
  res.status(201).json({ message: 'Nouveau propiétaire insérée avec succès' })
}

export default handler
