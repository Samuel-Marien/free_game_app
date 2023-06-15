import { getServerSession } from 'next-auth'
import { connectToDataBase } from '../../../lib/db'
import { authOptions } from '../auth/[...nextauth].js'

async function handler(req, res) {
  if (req.method !== 'POST') {
    return
  }

  const { gameId, gameTitle, note } = req.body

  const session = await getServerSession(req, res, authOptions)

  const userEmail = session.user.email

  if (!gameId || !note) {
    res.status(422).json({ message: 'Invalid note' })
    return
  }

  if (!session) {
    res.status(401).json({ message: 'Not authenticated' })
    return
  }

  const client = await connectToDataBase()
  const db = client.db()

  const myDate = new Date()

  const existingNotation = await db.collection('notations').findOne({
    gameId: gameId,
    'asVoted.createdBy': userEmail
  })

  if (existingNotation) {
    // Utilisateur et gameId trouvés, mettez à jour la note
    const updatedResult = await db.collection('notations').updateOne(
      {
        gameId: gameId,
        'asVoted.createdBy': userEmail
      },
      {
        $set: {
          'asVoted.$.note': note
        }
      }
    )

    // Ajoutez le nouvel élément au tableau asVoted
    const pushResult = await db.collection('notations').updateOne(
      {
        gameId: gameId,
        'asVoted.createdBy': { $ne: userEmail } // Exclure l'utilisateur actuel
      },
      {
        $push: {
          asVoted: {
            createdBy: userEmail,
            note: note,
            createdAt: myDate
          }
        }
      }
    )

    if (pushResult.modifiedCount > 0) {
      res.status(201).json({ message: 'Nouvel élément ajouté avec succès' })
    } else {
      res.status(201).json({ message: 'Note mise à jour avec succès' })
    }
  } else {
    // Utilisateur ou gameId non trouvés, insérez une nouvelle notation
    const result = await db.collection('notations').updateOne(
      {
        gameId: gameId
      },
      {
        $set: {
          gameTitle: gameTitle
        },
        $addToSet: {
          asVoted: {
            createdBy: userEmail,
            note: note,
            createdAt: myDate
          }
        }
      },
      { upsert: true } // Insérer si aucune correspondance gameId n'est trouvée
    )

    if (result.upsertedCount > 0) {
      res.status(201).json({ message: 'Nouvelle notation insérée avec succès' })
    } else {
      res.status(201).json({ message: 'Note mise à jour avec succès' })
    }
  }
}

export default handler
