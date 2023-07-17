import React, { useState } from 'react'
import Link from 'next/link'

const NavLink = (props) => {
  const { href, icon, title, isVisible, isActive, isDark } = props
  const [iconBg, setIconBg] = useState('')

  const handleMouseEnter = () => {
    setIconBg(' animate-pulse text-myOrange')
  }

  const handleMouseLeave = () => {
    setIconBg('')
  }

  return (
    <Link href={href} className="font-myTitle">
      <li
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative hover:-translate-y-0.5 transition-all duration-150"
      >
        <button
          className={`w-full h-10  flex items-center
          justify-between rounded-r-full transition-all duration-300
           ${
             isVisible &&
             !isActive &&
             isDark &&
             '  border-l-4 hover:border-myBlackDarkViolet hover:text-myText hover:bg-myDarkViolet border-myViolet text-myViolet  '
           }
           ${
             isVisible &&
             !isActive &&
             !isDark &&
             '  border-l-4 hover:border-myDarkOrange hover:text-myDarkOrange hover:bg-myLightOrange border-myViolet text-myViolet'
           }
            ${
              isActive &&
              isVisible &&
              'focus:text-myText focus:bg-myOrange border-l-4 border-myLightOrange  rounded-sm bg-myOrange'
            } 
            ${
              isActive &&
              isVisible &&
              !isDark &&
              'focus:text-myText focus:bg-Violet border-l-4 border-myLightOrange  rounded-sm bg-myViolet'
            } 
            `}
        >
          {isVisible && (
            <span
              className={`font-semibold ms-2 ${isActive && ' text-myText'}`}
            >
              {title}
            </span>
          )}
          <div
            className={`flex items-center m-0.5 rounded-full p-2 text-myViolet ${
              isDark
                ? 'bg-myBg  hover:bg-myDarkViolet'
                : ' bg-myLightBg hover:bg-myBrown '
            }`}
          >
            <span
              className={`${isVisible ? 'text-xl' : 'text-2xl p-1'} ${
                isActive && ' text-myOrange'
              }${iconBg}`}
            >
              {icon}
            </span>
          </div>
        </button>
      </li>
    </Link>
  )
}

export default NavLink
