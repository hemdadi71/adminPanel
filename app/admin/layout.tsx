'use client'

import React from 'react'
import Avatar from '../components/Avatar'
import { useQuery } from 'react-query'
import getCurrentUser from '../actions/getCurrentUser'
import Link from 'next/link'
import Sidebar from './components/sidebar/Sidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex h-full">
        <Sidebar />
        {children}
      </div>
    </>
  )
}

export default Layout
