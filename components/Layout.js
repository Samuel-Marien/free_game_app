import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

import { BsBoxArrowInRight, BsFillCollectionFill } from 'react-icons/bs'
import {
  FaHome,
  FaStore,
  FaCog,
  FaToggleOff,
  FaToggleOn,
  FaUserMinus,
  FaUserCheck
} from 'react-icons/fa'
import { MdContactMail } from 'react-icons/md'
import { GiGamepadCross } from 'react-icons/gi'
import { ImMenu3 } from 'react-icons/im'

const Layout = ({ children }) => {
  const { data: session, status } = useSession()
  // const { children } = props
  // const loading = status === 'loading'

  // console.log(session)
  // console.log(status)

  const logoutHandler = () => {
    signOut()
  }

  return (
    <div className="flex w-full  ">
      <div className="text-myText z-20 flex flex-col h-screen p-3 bg-myBg w-72 fixed shadow-customRight">
        <div className="space-y-3">
          <div className="flex items-center text-myOrange">
            <span className="text-7xl -rotate-12 mr-2 ">
              <GiGamepadCross />
            </span>
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 ">
              <li className="rounded-sm">
                <p className="flex items-center p-2 text-xl cursor-pointer">
                  <ImMenu3 />
                </p>
              </li>
              <li className="rounded-sm">
                <p className="flex items-center p-2 mb-10 space-x-3 rounded-md">
                  {session ? (
                    <>
                      <span className="text-green-400">
                        <FaUserCheck />
                      </span>
                      <span className="ms-2 capitalize ">
                        {session.user.name[0]}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-red-400">
                        <FaUserMinus />
                      </span>
                      <span className="ms-2 capitalize">visitor </span>
                    </>
                  )}
                </p>
              </li>
              <li className="rounded-sm">
                <Link
                  href="/"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <FaHome />

                  <span>Home</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  href="/"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <BsFillCollectionFill />

                  <span>Library</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  href="/"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <FaStore />

                  <span>Store</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  href="/"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <FaCog />

                  <span>Settings</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  href="/"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <MdContactMail />

                  <span>Contact</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <button
                  onClick={logoutHandler}
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <BsBoxArrowInRight />

                  <span>Log out</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <nav className="w-screen z-20 h-16 left-72 top-0 fixed bg-myBg text-myText shadow-customDown">
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
      <div className="absolute inset-0 left-72 top-16 bg-myBg">
        <div className="h-full overflow-auto ps-8 pe-8 pt-6">{children}</div>
      </div>
    </div>
  )
}

export default Layout
