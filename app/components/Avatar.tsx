'use client'

import clsx from 'clsx'
import { User } from 'next-auth'
import Image from 'next/image'

interface AvatarProps {
  user?: User
  className?: string
}

const Avatar: React.FC<AvatarProps> = ({ user, className }) => {
  return (
    <>
      <div className="relative">
        <div
          className={clsx(
            `relative inline-block rounded-full overflow-hidden border-2 border-gray-200`,
            className
          )}>
          <Image
            priority={false}
            alt="avatar"
            className="object-cover"
            src={user?.image || '/images/placeholder.jpg'}
            fill
          />
        </div>
      </div>
    </>
  )
}

export default Avatar
