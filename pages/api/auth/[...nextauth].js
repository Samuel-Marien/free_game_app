import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectToDataBase } from '../../../lib/db'
import { verifyPassword } from '../../../lib/auth'

export const authOptions = {
  jwt: {
    secret: 'helloworld'
  },
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      authorize: async (credentials) => {
        const client = await connectToDataBase()

        const userCollection = client.db().collection('users')

        const user = await userCollection.findOne({ email: credentials.email })

        if (!user) {
          client.close()
          throw new Error('No user found!')
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        )

        if (!isValid) {
          client.close()
          throw new Error('Could not log in!!')
        }

        client.close()
        return { email: user.email }
      },
      credentials: {
        email: {},
        password: {}
      }
    })
  ]
}

export default NextAuth(authOptions)
