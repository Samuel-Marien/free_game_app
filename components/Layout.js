import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import { BsFillCollectionFill } from 'react-icons/bs'
import { RiMenuUnfoldFill } from 'react-icons/ri'
import { HiOutlineLogout, HiOutlineLogin } from 'react-icons/hi'
import {
  FaHome,
  FaStore,
  FaCog,
  FaUserMinus,
  FaUserCheck,
  FaSun,
  FaMoon
} from 'react-icons/fa'
import { MdContactMail } from 'react-icons/md'
import { GiGamepadCross } from 'react-icons/gi'

const NavLink = (props) => {
  const { href, icon, title, isVisible, isActive, onClick } = props
  const [iconBg, setIconBg] = useState()

  const handleMouseEnter = () => {
    setIconBg(
      ' bg-myBg text-myOrange p-2 transition-all duration-300 animate-pulse'
    )
  }

  const handleMouseLeave = () => {
    setIconBg(' bg-none')
  }

  return (
    <Link href={href}>
      <li
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className={` w-full focus:border-none ps-2 h-10 hover:bg-none 
           
          focus:border-l-none hover:border-none hover:text-myText 
          transition-all duration-150 text-myViolet flex items-center 
          justify-between  border-l-4 border-myViolet rounded-r-full ${
            isActive && !isVisible && '  bg-opacity-0'
          } ${isActive && 'bg-myOrange border-none  '} ${
            isVisible
              ? ' focus:text-myText focus:bg-myOrange hover:bg-myDarkViolet rounded-sm'
              : ' focus:text-myOrange border-none rounded-r-none '
          }`}
        >
          {isVisible && <span>{title}</span>}
          <div
            className={`flex items-center p-1 m-0.5 rounded-full ${iconBg} `}
          >
            <span className={` ${isVisible ? 'text-xl' : 'text-2xl '}`}>
              {icon}
            </span>
          </div>
        </button>
      </li>
    </Link>
  )
}

const Layout = ({ children }) => {
  const { data: session, status } = useSession()
  const [toggleSidebar, setToggleSidebar] = useState(true)
  const [toggleDarktheme, setToggleDarktheme] = useState(true)
  const [myDefaultFocus, setMyDefaultFocus] = useState(true)
  const [test, setTest] = useState('/')

  const router = useRouter()
  // console.log(router)
  const routerPath = router.pathname
  // console.log(routerPath)

  // const loading = status === 'loading'

  // console.log(session)
  // console.log(status)

  const handleClick = (event) => {
    setMyDefaultFocus(false)
    setTest(event)
  }

  console.log(test)

  const logoutHandler = () => {
    signOut()
  }

  const handleToggleSidebar = () => {
    setToggleSidebar(!toggleSidebar)
  }

  const handleDarktheme = () => {
    setToggleDarktheme(!toggleDarktheme)
  }

  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <div
        className={`text-myText z-20 flex flex-col h-screen bg-myBg pt-3 fixed shadow-customRight ${
          toggleSidebar
            ? ' w-60 transition-all duration-300'
            : ' items-center w-20 transition-all duration-300'
        }`}
      >
        <div className="space-y-3">
          {/* Logo  */}
          <Link href="/" className="flex  text-myOrange">
            {toggleSidebar ? (
              <span className="text-6xl -rotate-12  transition-all duration-300 ps-5 pt-2">
                <GiGamepadCross />
              </span>
            ) : (
              <span className="text-5xl -rotate-12  transition-all duration-300">
                <GiGamepadCross />
              </span>
            )}
          </Link>
          {/* Content  */}
          <div className="">
            {/* View Settings  */}
            <ul className="pt-2 pb-4 space-y-1 ">
              <li className="rounded-sm">
                <button
                  onClick={handleToggleSidebar}
                  className="flex items-center p-2 text-xl cursor-pointer"
                >
                  <span
                    className={`text-2xl transition-all duration-300 ${
                      toggleSidebar && ' rotate-180 text-xl'
                    }`}
                  >
                    <RiMenuUnfoldFill />
                  </span>
                </button>
              </li>
              <li className="rounded-sm">
                <button
                  onClick={handleDarktheme}
                  className="flex p-1.5 cursor-pointer"
                >
                  {toggleDarktheme ? (
                    <span
                      className={`flex items-center text-2xl transition-all duration-300 ${
                        toggleSidebar && ' transition-all duration-300 text-xl '
                      }`}
                    >
                      <FaMoon />
                      {toggleSidebar && (
                        <span className="ms-3 capitalize text-base">dark</span>
                      )}
                    </span>
                  ) : (
                    <span
                      className={`flex items-center text-2xl transition-all duration-300 ${
                        toggleSidebar && ' transition-all duration-300 text-xl '
                      }`}
                    >
                      <FaSun />
                      {toggleSidebar && (
                        <span className="ms-3 capitalize text-base">light</span>
                      )}
                    </span>
                  )}
                </button>
              </li>

              <li className="rounded-sm">
                <p className="flex items-center p-2 mb-10 space-x-3 rounded-md">
                  {session ? (
                    <>
                      {toggleSidebar ? (
                        <span className="text-xl text-green-400 transition-all duration-300">
                          <FaUserCheck />
                        </span>
                      ) : (
                        <span className="text-2xl text-green-400 transition-all duration-300">
                          <FaUserCheck />
                        </span>
                      )}

                      {toggleSidebar && (
                        <span className="ms-2 capitalize ">
                          {session.user.name[0]}
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="text-red-400">
                        <FaUserMinus />
                      </span>
                      {toggleSidebar && (
                        <span className="ms-2 capitalize">visitor </span>
                      )}
                    </>
                  )}
                </p>
              </li>
            </ul>
            {/* Navlinks  */}
            <ul className="pb-4 flex flex-col space-y-4">
              <NavLink
                href="/"
                icon={<FaHome />}
                title="Home"
                isVisible={toggleSidebar}
                isActive={myDefaultFocus}
                onClick={() => handleClick('/')}
              />
              <NavLink
                href="/games/all-games"
                icon={<FaStore />}
                title="Store"
                isVisible={toggleSidebar}
                onClick={() => handleClick('/games/all-games')}
              />
              <NavLink
                href="/user-librairy"
                icon={<BsFillCollectionFill />}
                title="Library"
                isVisible={toggleSidebar}
                onClick={() => handleClick('/user-librairy')}
              />

              <div className="pt-10 flex flex-col space-y-4">
                <NavLink
                  href="/user-profile"
                  icon={<FaCog />}
                  title="Settings"
                  isVisible={toggleSidebar}
                  onClick={() => handleClick('/user-profile')}
                />
                <NavLink
                  href="/"
                  icon={<MdContactMail />}
                  title="Contact"
                  isVisible={toggleSidebar}
                  onClick={() => handleClick('/')}
                />
              </div>
              <div className="pt-20">
                {session ? (
                  <li className="rounded-lg border border-myDarkViolet shadow-lg mx-2 bg-myBlackDarkViolet">
                    <button
                      onClick={logoutHandler}
                      className="flex items-center p-2 space-x-5 rounded-md"
                    >
                      {toggleSidebar && <span>Log out</span>}
                      {toggleSidebar ? (
                        <span className="text-red-400 text-xl transition-all duration-300">
                          <HiOutlineLogout />
                        </span>
                      ) : (
                        <span className="text-red-400 text-2xl transition-all duration-300">
                          <HiOutlineLogout />
                        </span>
                      )}
                    </button>
                  </li>
                ) : (
                  <li className="rounded-sm">
                    <Link
                      href="/signin"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      {toggleSidebar && <span>Signin</span>}
                      {toggleSidebar ? (
                        <span className="text-myOrange text-xl transition-all duration-300">
                          <HiOutlineLogin />
                        </span>
                      ) : (
                        <span className="text-myOrange text-2xl transition-all duration-300">
                          <HiOutlineLogin />
                        </span>
                      )}
                    </Link>
                  </li>
                )}
              </div>
            </ul>
          </div>
        </div>
      </div>

      {/* Upbar */}
      {toggleSidebar && (
        <div className="flex flex-col">
          <nav className="w-screen z-20 h-16 left-60 top-0 fixed bg-myBg text-myText shadow-customDown">
            <div className="ps-8 h-full flex items-center">
              <div className="flex-1 z-30 ">
                <p className=" flex text-3xl font-bold">
                  Good Day,{' '}
                  {session ? (
                    <span className="ms-2 capitalize font-black">
                      {session.user.name[0]}
                    </span>
                  ) : (
                    <span className="ms-2 capitalize">visitor </span>
                  )}
                </p>
              </div>
              <div className="flex-1 z-30 ">search bar</div>
              <div className="flex-1 z-30">plop</div>
            </div>
          </nav>
        </div>
      )}

      {/* Children */}
      <div
        className={`absolute inset-0  bg-myBg ${
          toggleSidebar
            ? 'left-60 top-16 transition-all duration-500'
            : 'left-20 top-0 transition-all duration-500'
        }`}
      >
        <div className="h-full overflow-auto ps-8 pe-8 pt-6">{children}</div>
      </div>
    </div>
  )
}

export default Layout
