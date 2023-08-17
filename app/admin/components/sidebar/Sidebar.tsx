'use client'

import getCurrentUser from '@/app/actions/getCurrentUser'
import Avatar from '@/app/components/Avatar'
import Link from 'next/link'
import React from 'react'
import { useQuery } from 'react-query'

const Sidebar = () => {
  const { data, isLoading } = useQuery('getCurrentUser', getCurrentUser)
  return (
    <>
      <aside className="bg-gray-300 w-[20%] h-full">
        <ul>
          <li>
            <Avatar user={data} />
            <p>{data?.name}</p>
          </li>
          <li>
            <Link href={'/admin/manageUser'}>manageUsers</Link>
          </li>
          <li>signOut</li>
        </ul>
      </aside>
    </>
  )
}

export default Sidebar
