'use client'
import { getUserById } from '@/app/actions/getUserById'
import Button from '@/app/components/Button'
import Input from '@/app/components/inputs/Input'
import { SelectInput } from '@/app/components/inputs/Select'
import Image from 'next/image'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { CldUploadButton } from 'next-cloudinary'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Spinner from '@/app/components/Spinner'
import { useRouter } from 'next/navigation'
interface EditUserProps {
  id: string
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EditUser: React.FC<EditUserProps> = ({ id, setIsEditModalOpen }) => {
  const { data, isLoading } = useQuery(['getUserById', id], () =>
    getUserById({ id })
  )
  console.log(data)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: data?.name,
      email: data?.email,
      password: data?.password,
      image: data?.image,
      role: 'user',
    },
  })
  const image = watch('image')
  const handleUpload = (result: any) => {
    setValue('image', result?.info?.secure_url, { shouldValidate: true })
  }
  const updateData = async (UpdatedData: FieldValues) => {
    try {
      const { data } = await axios.post('/api/setting', UpdatedData)
      return data
    } catch (error) {
      console.log(data)
    }
  }
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      setIsEditModalOpen(false)
      toast.success('Account Update successfully')
      queryClient.invalidateQueries('getProfiles')
      router.refresh()
    },
  })
  const onSubmit: SubmitHandler<FieldValues> = Data => {
    Data.id = data._id
    console.log(Data)
    mutate(Data)
  }
  return (
    <>
      <div className="flex items-center jusify-center w-full">
        {!isLoading ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full gap-3 p-4">
            <div className="flex flex-col justify-center items-center gap-3">
              <div className="relative flex object-cover flex-col items-center justify-center w-[200px] h-[200px]">
                <Image
                  fill
                  className="rounded-full object-cover"
                  src={image || data?.image || '/images/placeholder.jpg'}
                  alt="Avatar"
                />
              </div>
              <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset="l7osseh6">
                <Button type="button">Change</Button>
              </CldUploadButton>
            </div>
            <div className="flex gap-5">
              <Input
                id="name"
                lable="Full name:"
                defaultValue={data?.name}
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
                defaultValue={data?.email}
                pattern={/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,4}$/}
                text="Example@gmail.com"
              />
            </div>
            <div className="flex gap-5">
              <Input
                id="password"
                lable="Password:"
                required
                register={register}
                errors={errors}
                defaultValue={data?.password}
                pattern={/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/}
                text="Enter strong password"
              />
            </div>
            <Button type="submit">Save</Button>
          </form>
        ) : (
          <Spinner className="w-10 h-10" />
        )}
      </div>
    </>
  )
}

export default EditUser
