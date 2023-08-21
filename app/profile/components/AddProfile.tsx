'use client'
import Button from '@/app/components/Button'
import Modal from '@/app/components/Modal'
import React, { useState } from 'react'
import AddProfileForm from './AddProfileForm'

const AddProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-center py-3">
        <div className="w-[20%]">
          <Button onClick={() => setIsModalOpen(true)} type="button" fullWidth>
            Add Profile
          </Button>
        </div>
      </div>
      <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <AddProfileForm setIsModalOpen={setIsModalOpen} />
      </Modal>
    </>
  )
}

export default AddProfile
