


import React from 'react'
import Header from './components/header/Header'
import Form from './components/form/Form'

const Admin = () => {
  return (
    <>
      <div className="bg-neutral-100 w-full">
        <Header>
          <p className="text-xl font-semibold text-gray-900">Account Setting</p>
        </Header>
        <Form />
      </div>
    </>
  )
}

export default Admin
