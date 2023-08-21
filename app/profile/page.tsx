


import React from 'react'

import Form from '@/app/admin/components/form/Form'
import Header from './components/header/Header'


const Admin = () => {
  return (
    <>
      <div className="bg-[#F2EDF3] w-full h-full">
        <Header>
          <p className="text-xl font-semibold text-gray-900">Account Setting</p>
        </Header>
        <Form />
      </div>
    </>
  )
}

export default Admin
