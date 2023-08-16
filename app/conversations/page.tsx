'use client'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const Conversations = () => {
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
        <div className="relative w-10 h-10">
          <Image fill src={data?.user?.image} alt='image' />
        </div>
      </div>
    </>
  )
}

export default Conversations
