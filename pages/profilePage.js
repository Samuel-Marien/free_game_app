import { getSession } from 'next-auth/client'

import Profile from '../components/Profile'

const ProfilePage = () => {
  return <Profile />
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: { destination: '/signPage', permanent: false }
    }
  }

  return {
    props: { session }
  }
}

export default ProfilePage
