import { getServerSession } from 'next-auth'
import { verifyPassword, hashPassword } from '../../../lib/auth'
import { connectToDataBase } from '../../../lib/db'
import { authOptions } from '../auth/[...nextauth].js'

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ message: 'Not Authenticated' })
    return
  }

  const userEmail = session.user.email
  const oldPassword = req.body.oldPassword
  const newPassword = req.body.newPassword

  const client = await connectToDataBase()
  const userCollectioin = client.db().collection('users')
  const user = await userCollectioin.findOne({ email: userEmail })

  if (!user) {
    res.status(404).json({ message: 'User No Found!' })
    client.close()
    return
  }

  const currentPassword = user.password

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword)

  if (!passwordsAreEqual) {
    res.status(403).json({ message: 'Invalids password!' })
    client.close()
    return
  }

  const hashedPassword = await hashPassword(newPassword)

  const result = await userCollectioin.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  )

  client.close()
  res.status(200).json({ message: 'Password Updated!!' })
}

export default handler
