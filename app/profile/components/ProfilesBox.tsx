'use client'


import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Modal from '@/app/components/Modal'
import UserCard from './userCard/UserCard'
import RemoveUser from './RemoveProfile'
import EditUser from './EditProfile'
import { getProfiles } from '@/app/actions/getProfiles'

interface user {
  _id: string
  name: string
  email: string
  password: string
  image?: string
  hasedPassword: string
  role: string
  createdAt: string
  updatedAt: string
}

const ProfilesBox = () => {
  const { data, isLoading } = useQuery('getProfiles', getProfiles)
  console.log(data)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [id, setId] = useState('')
  const onRemoveModalOpen = (id: string) => {
    setIsModalOpen(true)
    setId(id)
  }
  const onEditModalOpen = (id: string) => {
    setIsEditModalOpen(true)
    setId(id)
  }
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 p-5 gap-5 lg:max-h-[400px] overflow-auto">
        {!isLoading && data
          ? data.map((item: user) => (
              <UserCard
                onRemoveModalOpen={() => onRemoveModalOpen(item._id)}
                onEditModalOpen={() => onEditModalOpen(item._id)}
                key={item._id}
                item={item}
              />
            ))
          : []}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RemoveUser setIsModalOpen={setIsModalOpen} id={id} />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditUser setIsEditModalOpen={setIsEditModalOpen} id={id} />
      </Modal>
    </>
  )
}

export default ProfilesBox
