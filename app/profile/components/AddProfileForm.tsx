'use client'

import Button from '@/app/components/Button'
import Input from '@/app/components/inputs/Input'
import { SelectInput } from '@/app/components/inputs/Select'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { CldUploadButton } from 'next-cloudinary'
import getCurrentUser from '@/app/actions/getCurrentUser'

interface AddProfileFormProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddProfileForm: React.FC<AddProfileFormProps> = ({ setIsModalOpen }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      image: '',
      name: '',
      email: '',
      password: '',
    },
  })
  const image = watch('image')
  const handleUpload = (result: any) => {
    setValue('image', result?.info?.secure_url, { shouldValidate: true })
  }
  const updateData = async (Data: FieldValues) => {
    try {
      const { data } = await axios.post('/api/addProfile', Data)
      return data
    } catch (error) {
      console.log(error)
    }
  }
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      toast.success('Account Update successfully')
      queryClient.invalidateQueries('getProfiles')
      setIsModalOpen(false)
    },
    onError: () => {
      toast.error('Somthing went wrong!!!')
    },
  })
  const onSubmit: SubmitHandler<FieldValues> = Data => {
    console.log(Data)
    mutate(Data)
  }
  return (
    <>
      <div className="flex items-center jusify-center w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full gap-3 p-4">
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="relative flex flex-col items-center justify-center w-[200px] h-[200px]">
              <Image
                fill
                className="rounded-full object-cover"
                src={image || '/images/placeholder.jpg'}
                alt="Avatar"
              />
            </div>
            <CldUploadButton
              options={{ maxFiles: 1 }}
              onUpload={handleUpload}
              uploadPreset="l7osseh6">
              <Button type="button" danger>
                Add image
              </Button>
            </CldUploadButton>
          </div>
          <div className="flex md:flex-row flex-col w-full gap-5">
            <Input
              id="name"
              lable="Full name:"
              required
              register={register}
              errors={errors}
              pattern={/([a-zA-Z]{2}|[^0-9]{2}|\D{2}|[^\d]{2})/}
              text="Enter valid name"
            />
            <Input
              id="email"
              lable="Email Address:"
              required
              register={register}
              errors={errors}
              pattern={/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,4}$/}
              text="Example@gmail.com"
            />
          </div>
          <div className="flex  md:flex-row flex-col w-full gap-5">
            <Input
              id="password"
              lable="Password:"
              required
              register={register}
              errors={errors}
              pattern={/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/}
              text="Enter strong password"
            />
          </div>
          <Button type="submit">Add</Button>
        </form>
      </div>
    </>
  )
}

export default AddProfileForm
