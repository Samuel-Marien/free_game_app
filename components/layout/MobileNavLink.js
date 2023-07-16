import React from 'react'
import Link from 'next/link'

const MobileNavLink = (props) => {
  const { href, icon, isActive, isDark } = props
  const bgClass = isDark
    ? 'bg-myDarkViolet transition-all duration-150'
    : 'bg-myBrown transition-all duration-150'

  return (
    <button
      className={`rounded-full p-2 ${
        isActive ? 'bg-myOrange shadow-xl' : bgClass
      }`}
    >
      <Link href={href}>
        <div
          className={`text-xl ${
            isActive ? 'text-myText animate-pulse' : 'text-myViolet'
          }`}
        >
          {icon}
        </div>
      </Link>
    </button>
  )
}

export default MobileNavLink
