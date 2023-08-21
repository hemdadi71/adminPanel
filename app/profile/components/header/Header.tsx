'use client'
import React from 'react'

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="bg-[#4bcbeb] border-b py-4 flex items-center justify-center">
        {children}
      </header>
    </>
  )
}

export default Header
