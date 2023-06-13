import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import {
  BsPersonSquare,
  BsFillGearFill,
  BsBoxArrowInRight
} from 'react-icons/bs'
import { IoMdMenu } from 'react-icons/io'

const Navbar = () => {
  const { data: session, status } = useSession()
  // const loading = status === 'loading'

  // console.log(session)
  // console.log(status)

  const logoutHandler = () => {
    signOut()
  }

  return (
    <div className="flex">
      <section>
        <nav className="flex bg-gray-900 text-white w-screen  ">
          <div className="px-5 xl:px-12 py-3 flex justify-between w-full   items-end">
            <div className="w-max flex justify-between items-end  ml-10  ">
              <Link className="text-3xl font-bold font-heading" href="/">
                Logo Here.
              </Link>
              <ul className="hidden md:flex font-semibold font-heading space-x-8 ml-24">
                <li>
                  <Link className="hover:text-gray-200" href="/games/all-games">
                    Store
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-gray-200" href="/user-librairy">
                    Librairy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="hidden xl:flex space-x-5">
              <ul className="flex gap-x-2 items-center hover:text-gray-200">
                {!session && (
                  <li>
                    <Link href="/signin">
                      <BsPersonSquare />
                    </Link>
                  </li>
                )}

                {session && (
                  <li className=" p-1 rounded text-slate-300 text-xl">
                    <p className="text-xs">
                      🟢 Connected as <span>{session.user.name[0]}</span>
                    </p>
                  </li>
                )}
                {session && (
                  <li className=" p-1 rounded text-slate-300 ">
                    <Link className="underline" href="/user-profile">
                      <BsFillGearFill />
                    </Link>
                  </li>
                )}
                {session && (
                  <li>
                    <button
                      onClick={logoutHandler}
                      className=" p-1 rounded text-red-400 text-xl"
                    >
                      <BsBoxArrowInRight />
                    </button>
                  </li>
                )}
              </ul>
            </div>
            {/* <!-- Responsive navbar --> */}
            <button className="self-center  xl:hidden" href="#">
              <IoMdMenu />
            </button>
          </div>
        </nav>
      </section>
    </div>
  )
}

export default Navbar
