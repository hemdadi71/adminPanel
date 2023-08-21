'use client'


import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Spinner from '@/app/components/Spinner'
import Button from '@/app/components/Button'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import RemoveUserCard from './removeUserCard/RemoveUserCard'
import { getUserById } from '@/app/actions/getUserById'

interface RemoveUserProps {
  id: string
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const RemoveUser: React.FC<RemoveUserProps> = ({ id, setIsModalOpen }) => {
  const { data, isLoading } = useQuery(['getUserById', id], () =>
    getUserById({ id })
  )
  console.log(data)
  const deleteUser = async (id: string) => {
    try {
      await axios.post(`/api/removeUser`, { id })
    } catch (error) {
      console.log(error)
    }
  }
  const queryClient = useQueryClient()
  const { mutate, isLoading: loading } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      setIsModalOpen(false)
      toast.success('Account delete successfully')
      queryClient.invalidateQueries('getProfiles')
    },
  })
  const handleRemoveUser = () => {
    mutate(id)
  }
  return (
    <>
      <div className="flex flex-col gap-3">
        {!isLoading ? (
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">
              Are you sure you want to delete user?
            </p>
            <RemoveUserCard data={data} />
          </div>
        ) : (
          <Spinner className="w-10 h-10" />
        )}
        <div className="flex justify-end gap-5">
          <Button
            disabled={loading}
            onClick={() => setIsModalOpen(false)}
            type="button">
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={handleRemoveUser}
            type="button"
            danger>
            Confirm
          </Button>
        </div>
      </div>
    </>
  )
}

export default RemoveUser
