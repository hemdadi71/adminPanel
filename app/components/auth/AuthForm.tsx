'use client'

import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import Input from '@/app/components/inputs/Input'
import AuthSocialButton from './AuthSocialButton'
import Button from '@/app/components/Button'
import { toast } from 'react-hot-toast'

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const session = useSession()
  const router = useRouter()
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (session?.status === 'authenticated') {
      if (session?.data?.user?.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/profile')
      }
    }
  }, [session?.status, router, session?.data?.user?.role])

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN')
    }
  }, [variant])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true)
    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .then(() =>
          signIn('credentials', {
            ...data,
            redirect: false,
          })
        )
        .then(callback => {
          if (callback?.error) {
            toast.error('Invalid credentials!')
          }

          if (callback?.ok) {
            if (session?.data?.user?.role === 'admin') {
              router.push('/admin')
            } else {
              router.push('/profile')
            }
            toast.success(`Wellcome 👋`)
          }
        })
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => setIsLoading(false))
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then(callback => {
          console.log(callback)
          if (callback?.error) {
            toast.error('Invalid credentials!')
          }

          if (callback?.ok) {
            if (session?.data?.user?.role === 'admin') {
              router.push('/admin')
            } else {
              router.push('/profile')
            }
            toast.success(`Wellcome 👋`)
          }
        })
        .finally(() => setIsLoading(false))
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true)

    signIn(action, { redirect: false })
      .then(callback => {
        if (callback?.error) {
          toast.error('Invalid credentials!')
        }

        if (callback?.ok) {
          router.push('/conversations')
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        className="
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        ">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="name"
              lable="Name"
              pattern={/([a-zA-Z]{2}|[^0-9]{2}|\D{2}|[^\d]{2})/}
              text="Enter valid name"
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email"
            lable="Email address"
            type="text"
            pattern={/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,4}$/}
            text="Example@gmail.com"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password"
            lable="Password"
            type="password"
            pattern={/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/}
            text="Enter strong password"
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute 
                inset-0 
                flex 
                items-center
              ">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            />
          </div>
        </div>
        <div
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          ">
          <div>
            {variant === 'LOGIN'
              ? 'New to Messenger?'
              : 'Already have an account?'}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
