'use client'

import getCurrentUser from '@/app/actions/getCurrentUser'
import Avatar from '@/app/components/Avatar'
import Link from 'next/link'
import React from 'react'
import { useQuery } from 'react-query'
import { FaUserAlt } from 'react-icons/fa'
import { MdManageAccounts } from 'react-icons/md'
import { PiSignOutBold } from 'react-icons/pi'
import { signOut } from 'next-auth/react'
const Sidebar = () => {
  const { data, isLoading } = useQuery('getCurrentUser', getCurrentUser)
  return (
    <>
      <aside className="bg-[#ffffff] w-[25%] h-full flex flex-col gap-3 items-center py-4">
        <div className="flex flex-col items-center gap-3 text-xl font-semibold w-full">
          <Avatar user={data} className="w-32 h-32" />
          <p className="text-gray-900">{data?.name}</p>
          <div className="w-[85%] bg-gray-300 rounded-full h-[1px]" />
        </div>
        <ul className="flex flex-col gap-5">
          <li>
            <Link
              href={'/profile'}
              className="hover:bg-[#a05aff] font-semibold text-gray-900 hover:text-white rounded-md py-2 px-5 flex items-center gap-3 transition-all ease-in-out duration-300">
              <MdManageAccounts size={28} />
              <p>Account Setting</p>
            </Link>
          </li>
          <li>
            <Link
              href={'/profile/profilesSetting'}
              className="hover:bg-[#a05aff] text-gray-900 font-semibold hover:text-white rounded-md py-2 px-5 flex items-center gap-5 transition-all ease-in-out duration-300">
              <FaUserAlt size={20} />
              <p>Profiles Setting</p>
            </Link>
          </li>
          <li
            onClick={() => signOut()}
            className="hover:bg-[#a05aff] align-bottom text-gray-900 font-semibold hover:text-white rounded-md py-2 px-5 flex items-center gap-6 cursor-pointer transition-all ease-in-out duration-300">
            <PiSignOutBold className="rotate-180" size={28} />
            <p>SignOut</p>
          </li>
        </ul>
      </aside>
    </>
  )
}

export default Sidebar
