'use client'

import { getOtherUsers } from '@/app/actions/getOtherUsers'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import UserCard from '../userCard/UserCard'
import Modal from '@/app/components/Modal'
import RemoveUser from '../removeUser/RemoveUser'
import EditUser from '../editUser/EditUser'

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

const UsersBox = () => {
  const { data, isLoading } = useQuery('getOtherUsers', getOtherUsers)
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

export default UsersBox
