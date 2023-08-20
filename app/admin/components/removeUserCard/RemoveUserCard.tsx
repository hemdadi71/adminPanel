import Image from 'next/image'
import React from 'react'

interface RemoveUserCardProps {
  data: {
    _id: string
    name: string
    email: string
    password: string
    image?: string
    hasedPassword: string
    createdAt: string
    updatedAt: string
  }
}

const RemoveUserCard: React.FC<RemoveUserCardProps> = ({ data }) => {
  const { name, image, email, password } = data
  return (
    <>
      <div className="bg-red-100 rounded-xl flex gap-5 py-3 px-5 border text-gray-900">
        <div className="relative h-[80px] w-[80px]">
          <Image
            src={image || '/images/placeholder.jpg'}
            fill
            className="rounded-full border border-white object-cover"
            alt="image"
          />
        </div>
        <div className="flex justify-between flex-1">
          <div className="flex flex-col gap-1">
            <p>
              Name: <span className="font-semibold">{name}</span>
            </p>
            <p>
              Email: <span className="font-semibold">{email}</span>
            </p>
            <p>
              Password: <span className="font-semibold">{password}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default RemoveUserCard
