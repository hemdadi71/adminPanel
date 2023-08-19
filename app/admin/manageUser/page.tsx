'use client'

import { getOtherUsers } from '@/app/actions/getOtherUsers'
import React from 'react'
import { useQuery } from 'react-query'
import Header from '../components/header/Header'
import UsersBox from '../components/usersBox/UsersBox'
import AddUser from '../components/addUser/AddUser'

const ManageUsers = () => {
  return (
    <>
      <div className="bg-neutral-100 w-full h-full">
        <Header>
          <p className="text-xl font-semibold text-gray-900">Users Setting</p>
        </Header>
        <UsersBox />
        <AddUser />
      </div>
    </>
  )
}

export default ManageUsers
