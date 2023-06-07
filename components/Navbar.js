import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { BsPersonSquare } from 'react-icons/bs'
import { IoMdMenu } from 'react-icons/io'

const Navbar = () => {
  const { data: session, status } = useSession()
  // const loading = status === 'loading'

  // console.log(session)
  console.log(status)

  const logoutHandler = () => {
    signOut()
  }

  return (
    <div className="flex flex-wrap place-items-top">
      <section className="relative mx-auto">
        <nav className="flex justify-between bg-gray-900 text-white w-screen">
          <div className="px-5 xl:px-12 py-6 flex w-full items-center">
            <Link className="text-3xl font-bold font-heading" href="/">
              Logo Here.
            </Link>
            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
              <li>
                <Link className="hover:text-gray-200" href="/">
                  Category
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-200" href="/">
                  Collections
                </Link>
              </li>
            </ul>
            <div className="hidden xl:flex items-center space-x-5">
              <ul className="flex gap-x-2 items-center hover:text-gray-200">
                {!session && (
                  <li>
                    <Link href="/signPage">
                      <BsPersonSquare />
                    </Link>
                  </li>
                )}

                {session && (
                  <li>
                    <Link className="underline" href="/profilePage">
                      Profile
                    </Link>
                  </li>
                )}
                {session && (
                  <li>
                    <button
                      onClick={logoutHandler}
                      className="border p-1 rounded"
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* <!-- Responsive navbar --> */}
          <a className="self-center mr-12 xl:hidden" href="#">
            <IoMdMenu />
          </a>
        </nav>
      </section>
    </div>
  )
}

export default Navbar
