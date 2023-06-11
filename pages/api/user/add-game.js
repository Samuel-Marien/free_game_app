import { getServerSession } from 'next-auth'
import { connectToDataBase } from '../../../lib/db'
import { authOptions } from '../auth/[...nextauth].js'

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return
  }

  const {
    developer,
    freetogame_profile_url,
    game_url,
    genre,
    id,
    platform,
    publisher,
    release_date,
    short_description,
    thumbnail,
    title
  } = req.body

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

  const myDate = new Date()

  const result = await userCollection.updateOne(
    { email: userEmail },
    {
      $push: {
        games_collection: {
          developer: developer,
          freetogame_profile_url: freetogame_profile_url,
          game_url: game_url,
          genre: genre,
          id: id,
          platform: platform,
          publisher: publisher,
          release_date: release_date,
          short_description: short_description,
          thumbnail: thumbnail,
          title: title,
          saved_date: myDate
          // game
        }
      }
    }
  )
  client.close()
  res
    .status(200)
    .json({ message: 'Successfully add new game in your collection' })
}

export default handler
