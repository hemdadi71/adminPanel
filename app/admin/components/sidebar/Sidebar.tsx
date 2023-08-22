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
      <aside className="bg-[#060606] lg:w-[25%] items-center lg:py-4 py-2">
        <div className="flex flex-col items-center lg:gap-3 text-xl font-semibold lg:w-full">
          <Avatar user={data} className="lg:w-32 lg:h-32 w-20 h-20" />
          <p className="text-gray-100">{data?.name}</p>
          <div className="w-[85%] lg:my-0 my-3 bg-gray-500 rounded-full h-[1px]" />
        </div>
        <ul className="flex lg:flex-col justify-center mt-2 flex-row-reverse gap-5">
          <li>
            <Link
              href={'/admin'}
              className="hover:bg-[#8b8D93] text-gray-300 hover:text-white rounded-md py-2 px-5 flex items-center gap-3 transition-all ease-in-out duration-300">
              <MdManageAccounts size={28} />
              <p className='hidden sm:block'>Account Setting</p>
            </Link>
          </li>
          <li>
            <Link
              href={'/admin/manageUser'}
              className="hover:bg-[#8b8D93] text-gray-300 hover:text-white rounded-md py-2 px-5 flex items-center gap-5 transition-all ease-in-out duration-300">
              <FaUserAlt size={20} />
              <p className='hidden sm:block'>Users Setting</p>
            </Link>
          </li>
          <li
            onClick={() => signOut()}
            className="hover:bg-[#8b8D93] align-bottom text-gray-300 hover:text-white rounded-md py-2 px-5 flex items-center gap-6 cursor-pointer transition-all ease-in-out duration-300">
            <PiSignOutBold className="rotate-180" size={28} />
            <p className='hidden sm:block'>SignOut</p>
          </li>
        </ul>
      </aside>
    </>
  )
}

export default Sidebar
