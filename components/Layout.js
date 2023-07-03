import React, { useState } from 'react'
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
  const { href, icon, title, isVisible, isActive } = props
  const [iconBg, setIconBg] = useState('')

  const handleMouseEnter = () => {
    setIconBg(' animate-pulse')
  }

  const handleMouseLeave = () => {
    setIconBg('')
  }

  return (
    <Link href={href}>
      <li
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        <button
          className={`w-full h-10  flex items-center
          justify-between  text-myViolet
           rounded-r-full transition-all duration-300
           ${
             isVisible &&
             !isActive &&
             ' hover:bg-myDarkViolet border-l-4 border-myViolet'
           }
            ${
              isActive &&
              isVisible &&
              'focus:text-myText focus:bg-myOrange border-l-4 border-myLightOrange  rounded-sm bg-myOrange'
            } 
            
            ${isActive && !isVisible && 'border-none '} 
            ${!isActive && !isVisible && 'border-none  '} 
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
            className={`flex items-center m-0.5 rounded-full bg-myBg text-myViolet p-2 hover:bg-myDarkViolet`}
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

const Layout = ({ children }) => {
  const { data: session, status } = useSession()
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [toggleMobilMenu, setToggleMobilMenu] = useState(false)
  const [toggleDarktheme, setToggleDarktheme] = useState(true)
  const router = useRouter()
  const routerPath = router.pathname

  const logoutHandler = () => {
    signOut()
  }

  const handleToggleSidebar = () => {
    setToggleSidebar(!toggleSidebar)
  }

  const handleDarktheme = () => {
    setToggleDarktheme(!toggleDarktheme)
  }

  const handleMobilMenu = () => {
    setToggleMobilMenu(!toggleMobilMenu)
  }

  return (
    <div className="flex w-full dark">
      {/* Down Bar for mobile device */}
      <div
        className={`sm:hidden block fixed bottom-0 left-0 w-full h-max z-30`}
      >
        {/* Mobile menu  */}
        <div
          onClick={handleMobilMenu}
          className={` shadow-customUp bg-myBg  border-t border-myDarkViolet rounded-t-2xl  items-center flex justify-between ${
            toggleMobilMenu ? ' slide-in ' : ' slide-out'
          }`}
        >
          <div className="bg-myDarkViolet flex justify-center items-center p-2 m-2 rounded-full">
            {session ? (
              <Link href={'/user-profile'}>
                <span className="text-xl text-green-400 transition-all duration-300">
                  <FaUserCheck />
                  <span className="text-myOrange absolute top-1 left-8 text-xs">
                    <FaCog />
                  </span>
                </span>
              </Link>
            ) : (
              <span className="text-red-400">
                <FaUserMinus />
              </span>
            )}
          </div>

          <div className=" flex w-full justify-center space-x-4">
            <MobileNavLink
              isActive={'/' === routerPath}
              href={'/'}
              icon={<FaHome />}
            />
            <MobileNavLink
              isActive={'/games/all-games' === routerPath}
              href={'/games/all-games'}
              icon={<FaStore />}
            />
            <MobileNavLink
              isActive={'/user-librairy' === routerPath}
              href={'/user-librairy'}
              icon={<BsFillCollectionFill />}
            />
            <MobileNavLink
              isActive={'/contact' === routerPath}
              href={'/contact'}
              icon={<MdContactMail />}
            />
            <button onClick={handleDarktheme} className="">
              {toggleDarktheme ? (
                <span className=" text-myDarkViolet">
                  <FaMoon />
                </span>
              ) : (
                <span className="text-myOrange">
                  <FaSun />
                </span>
              )}
            </button>
          </div>

          <div className="m-1">
            {session ? (
              <button
                onClick={logoutHandler}
                className=" pt-1 text-2xl text-pink-600"
              >
                <HiOutlineLogout />
              </button>
            ) : (
              <Link href={'/signin'} className="">
                <span className=" text-2xl text-myLightOrange">
                  <HiOutlineLogin />
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* button  */}
        {!toggleMobilMenu && (
          <div className=" flex justify-center">
            <button
              className=" border border-myLightOrange text-myOrange rounded-lg mb-2 p-1 px-2 text-2xl shadow bg-myBg bg-opacity-80"
              onClick={handleMobilMenu}
            >
              <GiGamepadCross />
            </button>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`  z-20 flex-col h-screen pt-3 fixed shadow-customRight ${
          toggleSidebar
            ? ' w-60 transition-all duration-300 '
            : 'hidden items-center w-20 sm:flex transition-all duration-300'
        } ${
          toggleDarktheme
            ? 'dark:bg-myBg text-myText'
            : 'bg-myLightBg text-myLightText'
        }`}
      >
        <div className="space-y-3">
          {/* Logo  */}
          <Link href="/" className="flex text-myOrange">
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
            <ul className="pt-2 pb-4 space-y-2 ">
              <li className="rounded-sm">
                <button
                  onClick={handleToggleSidebar}
                  className="flex items-center p-2 ps-4 text-xl cursor-pointer"
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
                  className="flex p-1.5 ps-4 cursor-pointer"
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
                      className={`flex items-center text-2xl text-myOrange transition-all duration-300 ${
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
                <p className="flex items-center p-2 ps-4 mb-10 space-x-3 rounded-md">
                  {session ? (
                    <>
                      <span
                        className={` text-green-700 transition-all duration-300 ${
                          toggleSidebar ? ' text-xl' : ' ps-1 text-2xl'
                        }`}
                      >
                        <FaUserCheck />
                      </span>
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
                isActive={'/' === routerPath}
              />
              <NavLink
                href="/games/all-games"
                icon={<FaStore />}
                title="Store"
                isVisible={toggleSidebar}
                isActive={'/games/all-games' === routerPath}
              />
              <NavLink
                href="/user-librairy"
                icon={<BsFillCollectionFill />}
                title="Library"
                isVisible={toggleSidebar}
                isActive={'/user-librairy' === routerPath}
              />

              <div className="pt-10 flex flex-col space-y-4">
                <NavLink
                  href="/user-profile"
                  icon={<FaCog />}
                  title="Settings"
                  isVisible={toggleSidebar}
                  isActive={'/user-profile' === routerPath}
                />
                <NavLink
                  href="/contact"
                  icon={<MdContactMail />}
                  title="Contact"
                  isVisible={toggleSidebar}
                  isActive={'/contact' === routerPath}
                />
              </div>
              <div className="pt-20">
                {session ? (
                  <li className="rounded-lg border border-myDarkViolet shadow mx-2 bg-myBlackDarkViolet">
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
            : 'left-0 sm:left-20 top-0 transition-all duration-500'
        }`}
      >
        <div className="h-full overflow-auto sm:ps-8 ps-3 sm:pe-8 pe-3 pt-4 pb-20">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
