import { connectToDataBase } from '../../../lib/db'
import { hashPassword } from '../../../lib/auth'

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body

    const { firstName, lastName, email, password } = data

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !email.includes('@') ||
      password.trim().length < 6
    ) {
      res.status(422).json({ message: 'Invalid username or password' })
      return
    }

    const client = await connectToDataBase()

    const db = client.db()

    const existingUser = await db.collection('users').findOne({ email: email })

    if (existingUser) {
      res.status(422).json({ message: 'User already exist!' })
      client.close()
      // return
    }

    const hashedPassword = await hashPassword(password)

    const result = await db.collection('users').insertOne({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      games_collection: []
    })
    res.status(201).json({ message: 'Successfully created new user!' })
  }
}

export default handler
