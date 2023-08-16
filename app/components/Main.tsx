import React from 'react'
import AuthForm from './auth/AuthForm'

const Main = () => {
  return (
    <>
      <main className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg-px-8 bg-gray-100">
        <div className='mt-6 text-center text-3xl font-bold tracking-tighter text-gray-900'>
          <p>Login to your account</p>
        </div>
        <AuthForm />
      </main>
    </>
  )
}

export default Main
