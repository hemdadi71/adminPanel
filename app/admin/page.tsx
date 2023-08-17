'use client'

import { signOut } from 'next-auth/react'
import React from 'react'
import Avatar from '../components/Avatar'
import getCurrentUser from '../actions/getCurrentUser'
import { useQuery } from 'react-query'

const Admin = () => {
  const { data, isLoading } = useQuery('getCurrentUser', getCurrentUser)
  console.log(data)
  return (
    <>
      <div>First Page</div>
    </>
  )
}

export default Admin
