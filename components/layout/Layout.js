import React, { useState, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import Context from '../context/appContext'

import NavLink from './NavLink'
import MobileNavLink from './MobileNavLink'

import { BsFillCollectionFill } from 'react-icons/bs'
import { TbArrowAutofitWidth } from 'react-icons/tb'
import { HiOutlineLogout, HiOutlineLogin } from 'react-icons/hi'
import { FaHome, FaStore, FaCog, FaSun, FaMoon } from 'react-icons/fa'
import { MdContactMail } from 'react-icons/md'
import { GiGamepadCross, GiCowled } from 'react-icons/gi'

const Layout = ({ children }) => {
  const { data: session, status } = useSession()
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [showUserMobileMenu, setShowUserMobileMenu] = useState(false)
  const [toggleMobilMenu, setToggleMobilMenu] = useState(true)
  const { toggleDarktheme, setToggleDarktheme, bgImage } = useContext(Context)
  const router = useRouter()
  const routerPath = router.pathname

  // console.log(bgImage)

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

  const handleShowUserMobileMenu = () => {
    setShowUserMobileMenu(!showUserMobileMenu)
  }

  return (
    <div className="flex w-full dark ">
      {/* Down Bar for mobile device */}
      <div
        className={`sm:hidden block fixed bottom-0 left-0 w-full h-max z-30 `}
      >
        {/* Mobile menu  */}
        <div
          className={` shadow-customUp border-t rounded-t-2xl py-1.5 items-center flex justify-between ${
            toggleDarktheme
              ? 'bg-myBg border-myDarkViolet'
              : 'bg-myText border-myBrown'
          } ${toggleMobilMenu ? ' slide-in ' : ' slide-out'}`}
        >
          <button
            onClick={handleShowUserMobileMenu}
            className={` ms-2 flex justify-center items-center rounded-full z-30 ${
              toggleDarktheme ? 'bg-myDarkViolet' : 'bg-myBrown'
            }`}
          >
            <div className=" h-8 w-8 ">
              {session ? (
                <span className="absolute left-7 h-2 w-2 rounded-full bg-green-300"></span>
              ) : (
                <span className="absolute left-7  h-2 w-2 rounded-full bg-red-400"></span>
              )}

              <p
                className={`h-8 w-8  flex justify-center items-center  border rounded-full  text-myViolet ${
                  session ? ' border-green-300' : ' border-red-400'
                }`}
              >
                <span>
                  <GiCowled />
                </span>
              </p>
            </div>
          </button>

          {/* Menu for settings signin etc... in mobile view  */}
          {showUserMobileMenu && (
            <div
              className={`absolute  shadow-customRight h-36 w-24 rounded-tr-full ${
                toggleDarktheme ? 'bg-myBg' : 'bg-myText'
              }`}
            >
              <button
                onClick={handleDarktheme}
                className="absolute top-2 left-2 text-xl"
              >
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

              <Link
                className={`absolute left-10 top-6 text-xl  rounded-full p-1 ${
                  toggleDarktheme ? 'bg-myDarkViolet' : 'bg-myBrown'
                }`}
                href={'/user-profile'}
              >
                <span className="text-myViolet  ">
                  <FaCog />
                </span>
              </Link>

              <div className="pt-1 absolute left-16 top-14 ">
                {session ? (
                  <button
                    onClick={logoutHandler}
                    className="  text-2xl text-red-400 "
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
          )}

          {/* Mobile NavLinks  */}
          <div
            className={`flex w-full justify-center space-x-4  ${
              showUserMobileMenu
                ? 'ms-14 transition-all duration-300'
                : 'ms-none transition-all duration-300'
            }`}
          >
            <MobileNavLink
              isActive={'/' === routerPath}
              href={'/'}
              icon={<FaHome />}
              isDark={toggleDarktheme}
            />
            <MobileNavLink
              isActive={'/games/all-games' === routerPath}
              href={'/games/all-games'}
              icon={<FaStore />}
              isDark={toggleDarktheme}
            />
            <MobileNavLink
              isActive={'/user-librairy' === routerPath}
              href={'/user-librairy'}
              icon={<BsFillCollectionFill />}
              isDark={toggleDarktheme}
            />
            <MobileNavLink
              isActive={'/contact' === routerPath}
              href={'/contact'}
              icon={<MdContactMail />}
              isDark={toggleDarktheme}
            />
            <button
              onClick={handleMobilMenu}
              className="flex items-center text-myViolet cursor-pointer"
            >
              <span
                className={`text-xl -rotate-90 hover:-rotate-180 transition-all duration-150`}
              >
                <TbArrowAutofitWidth />
              </span>
            </button>
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
            ? 'w-60 transition-all duration-300 '
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
                <li className=" h-10 w-10 mx-auto ">
                  {session ? (
                    <span className="absolute right-6 top-30 h-2 w-2 rounded-full bg-green-300"></span>
                  ) : (
                    <span className="absolute right-6 top-30 h-2 w-2 rounded-full bg-red-400"></span>
                  )}

                  <p
                    className={`flex justify-center items-center text-2xl border rounded-full p-1.5 text-myViolet ${
                      session ? ' border-green-300' : ' border-red-400'
                    }`}
                  >
                    <span>
                      <GiCowled />
                    </span>
                  </p>
                </li>
                {session ? (
                  <span className="text-xs pl-1.5 text-myViolet capitalize">
                    {session.user.name[0]}
                  </span>
                ) : (
                  <span className="text-xs pl-3 text-red-400 capitalize">
                    visitor
                  </span>
                )}

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
              {toggleSidebar && (
                <div className=" pt-10  flex justify-center items-center  ">
                  <Image
                    className="sidebar-image opacity-20"
                    src="/images/computer.png"
                    width={200}
                    height={200}
                    alt="Picture of computer"
                  />
                </div>
              )}

              <div className="pt-20  w-full flex justify-center items-center">
                {session ? (
                  <li className="rounded-lg w-full border border-myViolet shadow-xl mx-2 hover:shadow-none hover:border-red-400 transition-all duration-300">
                    <button
                      onClick={logoutHandler}
                      className="flex items-center justify-center w-full p-2 space-x-5 rounded-md"
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
                  <li className="rounded-sm w-full mx-2">
                    <Link
                      href="/signin"
                      className="flex border  items-center justify-center p-2 space-x-3 rounded-md border-myViolet shadow-lg hover:shadow-none hover:border-green-400 transition-all duration-300"
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
        <div className=" font-myTitle ">
          <nav
            className={`absolute inset-y-0 left-0 w-screen flex justify-start items-center pl-60 pe-12 h-16  shadow-customDown z-10 ${
              toggleDarktheme
                ? 'bg-myBg text-myText'
                : 'bg-myLightBg text-myLightText'
            }`}
          >
            <div className=" ms-8 h-full flex justify-between  w-full items-center">
              <div className="flex space-x-3  ">
                <button
                  onClick={handleToggleSidebar}
                  className="flex items-center cursor-pointer"
                >
                  <span
                    className={` text-base lg:text-2xl text-myViolet hover:-rotate-90 transition-all duration-150 `}
                  >
                    <TbArrowAutofitWidth />
                  </span>
                </button>
                <p className="flex text-xl lg:text-3xl font-semibold">
                  Good Day,{' '}
                  {session ? (
                    <span className="ms-2 capitalize font-black tracking-wide">
                      {session.user.name[0]}
                    </span>
                  ) : (
                    <span className="ms-2 capitalize">visitor </span>
                  )}
                </p>
              </div>
              <div className="hidden lg:block border rounded-xl w-64 h-8 p-1">
                search bar
              </div>
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
                    {session ? (
                      <span className="absolute right-11 top-5 h-2 w-2 rounded-full bg-green-300"></span>
                    ) : (
                      <span className="absolute right-11 top-5 h-2 w-2 rounded-full bg-red-500"></span>
                    )}

                    <p
                      className={` text-2xl border rounded-full p-0.5 text-myViolet ${
                        session ? ' border-green-300' : ' border-red-500'
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
        className={`absolute inset-0 ${
          toggleSidebar
            ? 'left-60 top-16 transition-all duration-500'
            : 'left-0 sm:left-20 top-0 transition-all duration-500'
        }`}
      >
        <div
          style={{
            backgroundImage: `${
              toggleDarktheme
                ? `linear-gradient(rgba(57,54,70, 0.9), #393646), url(${bgImage})`
                : `linear-gradient(rgba(244,238,224, 0.8), #e6e1d8), url(${bgImage})`
            }`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top center',
            backgroundSize: 'cover',
            position: 'relative'
          }}
          className={`h-full overflow-auto sm:ps-8 ps-3 sm:pe-8 pe-3 pt-4 pb-20 ${
            toggleDarktheme
              ? 'bg-myBg transition-all duration-150'
              : ' bg-myLightBg transition-all duration-150'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
