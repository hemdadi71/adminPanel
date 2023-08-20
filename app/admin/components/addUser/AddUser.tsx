'use client'
import Button from '@/app/components/Button'
import Modal from '@/app/components/Modal'
import React, { useState } from 'react'
import AdminAddUser from '../adminAddUser/AdminAddUser'

const AddUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-center py-3">
        <div className="w-[20%]">
          <Button onClick={() => setIsModalOpen(true)} type="button" fullWidth>
            Add User
          </Button>
        </div>
      </div>
      <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <AdminAddUser setIsModalOpen={setIsModalOpen} />
      </Modal>
    </>
  )
}

export default AddUser
