import { getServerSession } from 'next-auth'
import { connectToDataBase } from '../../../lib/db'
import { authOptions } from '../auth/[...nextauth].js'

async function handler(req, res) {
  if (req.method !== 'POST') {
    return
  }

  const { title, content, gameId, gameTitle } = req.body

  const session = await getServerSession(req, res, authOptions)

  if (
    !title ||
    !content ||
    title.trim().length < 3 ||
    content.trim().length < 3
  ) {
    res.status(422).json({ message: 'Invalid title or comment' })
    return
  }

  if (!session) {
    res.status(401).json({ message: 'Not authenticated' })
    return
  }

  const userName = session.user.name[0]

  const client = await connectToDataBase()
  const db = client.db()

  const myDate = new Date()

  const existingComment = await db
    .collection('comments')
    .findOne({ gameId: gameId })

  if (existingComment === null) {
    const result = await db.collection('comments').insertOne({
      gameId: gameId,
      gameTitle: gameTitle,
      comments_collection: [
        {
          title: title,
          content: content,
          createdBy: userName,
          createdAt: myDate
        }
      ]
    })
    client.close()
    res.status(201).json({ message: 'Successfully created new comment!' })
  } else {
    const result = await db.collection('comments').updateOne(
      { gameId: gameId },
      {
        $push: {
          comments_collection: {
            title: title,
            content: content,
            createdBy: userName,
            createdAt: myDate
          }
        }
      }
    )
    client.close()
    res
      .status(201)
      .json({ message: 'Successfully add comments for this game!' })
  }
}

export default handler
