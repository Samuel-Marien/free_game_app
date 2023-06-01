import { connectToDataBase } from '../../../lib/db'
import { hashPassword } from '../../../lib/auth'

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body

    const { firstName, lastName, email, password } = data
    console.log(data)
    if (
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

    const hashedPassword = await hashPassword(password)

    const result = await db.collection('users').insertOne({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword
    })
    res.status(200).json({ message: 'Successfully created new user!' })
  }
}

export default handler
