'use client'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import Avatar from '../components/Avatar'

const Profile = () => {
  const session = useSession()
  const { data } = session
  console.log(data?.user)
  return (
    <>
      <button className="bg-red-500" onClick={() => signOut()}>
        SignOut
      </button>
      <div>
        <p>{data?.user?.name}</p>
        <Avatar user={data?.user} />
      </div>
    </>
  )
}

export default Profile
