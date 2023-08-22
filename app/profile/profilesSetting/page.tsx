'use client'

import { getOtherUsers } from '@/app/actions/getOtherUsers'
import React from 'react'
import { useQuery } from 'react-query'
import Header from '../components/header/Header'
import AddProfile from '../components/AddProfile'
import ProfilesBox from '../components/ProfilesBox'

const ManageUsers = () => {
  return (
    <>
      <div className="bg-neutral-100 w-full">
        <Header>
          <p className="text-xl font-semibold text-gray-900">
            Profiles Setting
          </p>
        </Header>
        <ProfilesBox />
        <AddProfile />
      </div>
    </>
  )
}

export default ManageUsers
