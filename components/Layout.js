import React, { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import { BsFillCollectionFill } from 'react-icons/bs'
import { TbArrowAutofitWidth } from 'react-icons/tb'
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
import { GiGamepadCross, GiCowled } from 'react-icons/gi'

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
    <Link href={href}>
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

        {/* Mobile menu button  */}
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

            {!toggleSidebar && (
              <ul className="pt-10 mb-5 space-y-3">
                <li className=" h-10 w-10 mx-auto">
                  <p
                    className={` text-2xl p-1 border  shadow-xs flex justify-center items-center  rounded-full ${
                      session
                        ? 'text-green-600 border-green-600'
                        : 'text-red-400 border-red-400'
                    }`}
                  >
                    <span>
                      <GiCowled />
                    </span>
                  </p>
                </li>
                <ul
                  className={`flex  py-5 justify-between ${
                    toggleDarktheme
                      ? 'border-b border-t border-myDarkViolet'
                      : 'border-b border-t border-myOrange'
                  }`}
                >
                  <li className="">
                    <button
                      onClick={handleToggleSidebar}
                      className="flex items-center  mx-auto text-myViolet cursor-pointer"
                    >
                      <span
                        className={`text-xl -rotate-90 hover:-rotate-180 transition-all duration-150 `}
                      >
                        <TbArrowAutofitWidth />
                      </span>
                    </button>
                  </li>
                  <li className="">
                    <button
                      onClick={handleDarktheme}
                      className="flex items-center mx-auto cursor-pointer hover:-translate-y-1 transition-all duration-150"
                    >
                      <span
                        className={`flex items-center text-xl hover:animate-pulse ${
                          toggleDarktheme ? ' text-myViolet' : 'text-myOrange'
                        } `}
                      >
                        {toggleDarktheme ? <FaMoon /> : <FaSun />}
                      </span>
                    </button>
                  </li>
                </ul>
              </ul>
            )}

            {/* Navlinks  */}
            <ul className=" flex flex-col space-y-4 ">
              <NavLink
                href="/"
                icon={<FaHome />}
                title="Home"
                isVisible={toggleSidebar}
                isActive={'/' === routerPath}
                isDark={toggleDarktheme}
              />
              <NavLink
                href="/games/all-games"
                icon={<FaStore />}
                title="Store"
                isVisible={toggleSidebar}
                isActive={'/games/all-games' === routerPath}
                isDark={toggleDarktheme}
              />
              <NavLink
                href="/user-librairy"
                icon={<BsFillCollectionFill />}
                title="Library"
                isVisible={toggleSidebar}
                isActive={'/user-librairy' === routerPath}
                isDark={toggleDarktheme}
              />

              <div
                className={`py-5 flex flex-col space-y-4 ${
                  toggleDarktheme
                    ? 'border-b border-t border-myDarkViolet'
                    : 'border-b border-t border-myOrange'
                }`}
              >
                <NavLink
                  href="/user-profile"
                  icon={<FaCog />}
                  title="Settings"
                  isVisible={toggleSidebar}
                  isActive={'/user-profile' === routerPath}
                  isDark={toggleDarktheme}
                />
                <NavLink
                  href="/contact"
                  icon={<MdContactMail />}
                  title="Contact"
                  isVisible={toggleSidebar}
                  isActive={'/contact' === routerPath}
                  isDark={toggleDarktheme}
                />
              </div>
              <div className="pt-10 flex justify-center items-center">
                {session ? (
                  <li className="rounded-lg w-max  border border-myDarkViolet shadow  bg-myBlackDarkViolet">
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
        <div className="">
          <nav className="absolute inset-y-0 left-0 w-screen flex justify-start items-center pl-60 pe-12 h-16 bg-myBg text-myText shadow-customDown z-10 ">
            <div className=" ms-8 h-full flex justify-between  w-full items-center">
              <div className="flex space-x-3  ">
                <button
                  onClick={handleToggleSidebar}
                  className="flex items-center cursor-pointer"
                >
                  <span
                    className={`text-2xl text-myViolet hover:-rotate-90 transition-all duration-150 `}
                  >
                    <TbArrowAutofitWidth />
                  </span>
                </button>
                <p className="flex text-myText text-3xl font-bold">
                  Good Day,{' '}
                  {session ? (
                    <span className="ms-2 capitalize font-black ">
                      {session.user.name[0]}
                    </span>
                  ) : (
                    <span className="ms-2 capitalize">visitor </span>
                  )}
                </p>
              </div>
              <div>search bar</div>
              {/* settings */}
              <div>
                <ul className="flex  w-max items-center space-x-2 ">
                  <li className="h-8 w-8  flex items-center justify-center ">
                    <button
                      onClick={handleDarktheme}
                      className="flex cursor-pointer"
                    >
                      <span>
                        {toggleDarktheme ? (
                          <span className="text-myViolet">
                            <FaMoon />
                          </span>
                        ) : (
                          <span className="text-myOrange">
                            <FaSun />
                          </span>
                        )}
                      </span>
                    </button>
                  </li>

                  <li className="flex items-center">
                    <p
                      className={` text-2xl border-2 rounded-full p-0.5 ${
                        session
                          ? 'text-green-700 border-green-700'
                          : 'text-red-400 border-red-400'
                      }`}
                    >
                      <span>
                        <GiCowled />
                      </span>
                    </p>
                  </li>
                </ul>
              </div>
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
