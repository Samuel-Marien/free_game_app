import { getSession } from 'next-auth/react'

import Navbar from '../components/Navbar'
import ProfileForm from '../components/forms/ProfileForm'

const ProfilePage = () => {
  return (
    <>
      <Navbar />
      <ProfileForm />
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: { destination: '/signin', permanent: false }
    }
  }

  return {
    props: { session }
  }
}

export default ProfilePage