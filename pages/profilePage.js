import React, { useEffect, useState } from 'react'
import { getSession } from 'next-auth/client'

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        window.location.href = '/signPage'
      } else {
        setIsLoading(false)
      }
    })
  }, [])

  if (isLoading) {
    return <p className="text-3xl">Loading...</p>
  }

  return (
    <div>
      <h1>Your User Profile</h1>
    </div>
  )
}

export default ProfilePage
