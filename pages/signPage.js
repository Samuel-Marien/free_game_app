import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'

import Navbar from '../components/Navbar'
import SignForm from '../components/SignForm'

const SignPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/')
      } else {
        setIsLoading(false)
      }
    })
  }, [router])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Navbar />
      <SignForm />
    </>
  )
}

export default SignPage
