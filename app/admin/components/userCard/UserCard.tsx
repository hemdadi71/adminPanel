'use client'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'
interface UserCardProps {
  item: {
    _id: string
    name: string
    email: string
    role: string
    password: string
    image?: string
    hasedPassword: string
    createdAt: string
    updatedAt: string
  }
  onRemoveModalOpen: () => void
  onEditModalOpen: () => void
}

const UserCard: React.FC<UserCardProps> = ({
  item,
  onRemoveModalOpen,
  onEditModalOpen,
}) => {
  const { image, name, email, password, role } = item
  return (
    <>
      <div className="bg-white rounded-xl flex gap-5 cursor-pointer py-3 px-5 border text-gray-900 hover:bg-purple-100 hover:scale-[1.02] transition-all ease-in-out duration-200">
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
          <div>
            <p
              className={clsx(
                `font-semibold`,
                role === 'admin' ? 'text-green-500' : 'text-red-500'
              )}>
              {role}
            </p>
          </div>
          <div className="flex flex-col justify-between ">
            <div onClick={onEditModalOpen}>
              <BiEdit
                size={24}
                className="hover:text-blue-500 transition-all ease-in-out duration-300"
              />
            </div>
            <div onClick={onRemoveModalOpen}>
              <FaTrash
                size={20}
                className="hover:text-red-500 transition-all ease-in-out duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserCard
