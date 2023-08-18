'use client'

import React from 'react'
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
