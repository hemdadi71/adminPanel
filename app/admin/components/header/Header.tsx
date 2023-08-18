import React from 'react'

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="bg-neutral-200 border-b py-4 flex items-center justify-center">
        {children}
      </header>
    </>
  )
}

export default Header
