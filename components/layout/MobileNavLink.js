import React from 'react'
import Link from 'next/link'

const MobileNavLink = (props) => {
  const { href, icon, isActive } = props
  return (
    <button
      className={`rounded-full  p-2 ${
        isActive ? 'bg-myOrange shadow-xl' : 'bg-myDarkViolet'
      }`}
    >
      <Link href={href}>
        <div
          className={` text-xl ${
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
