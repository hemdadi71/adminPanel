'use client'

import getCurrentUser from '@/app/actions/getCurrentUser'
import Avatar from '@/app/components/Avatar'
import Link from 'next/link'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { FaUserAlt } from 'react-icons/fa'
import { MdManageAccounts } from 'react-icons/md'
import { PiSignOutBold } from 'react-icons/pi'
import { signOut } from 'next-auth/react'
import Modal from '@/app/components/Modal'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
const Sidebar = () => {
  const { data, isLoading } = useQuery('getCurrentUser', getCurrentUser)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const pathname = usePathname()
  return (
    <>
      <aside className="bg-[#ffffff] lg:w-[25%] items-center lg:py-4 py-2">
        <div className="flex flex-col items-center lg:gap-3 text-xl font-semibold lg:w-full">
          <Avatar user={data} className="w-32 h-32" />
          <p className="text-gray-900">{data?.name}</p>
          <div className="w-[85%] lg:my-0 my-3 bg-gray-300 rounded-full h-[1px]" />
        </div>
        <ul className="flex lg:flex-col justify-center mt-2 flex-row-reverse gap-5 px-5">
          <li className="px-1">
            <Link
              href={'/profile'}
              className={`hover:bg-[#a05aff] ${
                pathname === '/profile' && 'bg-[#a05aff] text-white'
              } font-semibold text-gray-900 hover:text-white rounded-md py-2 px-5 flex items-center gap-3 transition-all ease-in-out duration-300`}>
              <MdManageAccounts size={28} />
              <p className="hidden sm:block">Account Setting</p>
            </Link>
          </li>
          <li>
            <Link
              href={'/profile/profilesSetting'}
              className={`hover:bg-[#a05aff] ${
                pathname === '/profile/profilesSetting' &&
                'bg-[#a05aff] text-white'
              } text-gray-900 font-semibold hover:text-white rounded-md py-2 px-5 flex items-center gap-5 transition-all ease-in-out duration-300`}>
              <FaUserAlt size={20} />
              <p className="hidden sm:block">Profiles Setting</p>
            </Link>
          </li>
          <li
            onClick={() => signOut()}
            className="hover:bg-[#a05aff] align-bottom text-gray-900 font-semibold hover:text-white rounded-md py-2 px-5 flex items-center gap-6 cursor-pointer transition-all ease-in-out duration-300">
            <PiSignOutBold className="rotate-180" size={28} />
            <p className="hidden sm:block">SignOut</p>
          </li>
        </ul>
      </aside>
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <div className="flex justify-center">
          <div className="w-[300px] h-[300px] relative">
            <Image
              src={data?.image}
              alt="image"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Sidebar
