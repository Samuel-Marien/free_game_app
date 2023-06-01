import React from 'react'
import Link from 'next/link'
import { BsPersonSquare } from 'react-icons/bs'
import { IoMdMenu } from 'react-icons/io'

const Navbar = () => {
  return (
    <div className="flex flex-wrap place-items-top h-screen">
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
              <Link className="hover:text-gray-200" href="/signPage">
                <BsPersonSquare />
              </Link>
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
