import { getSession } from 'next-auth/react'

import ProfileForm from '../components/forms/ProfileForm'

const ProfilePage = () => {
  return (
    <>
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
