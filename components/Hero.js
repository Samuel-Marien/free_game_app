import React, { useContext } from 'react'
import Link from 'next/link'

import Context from './context/appContext'

const Hero = (props) => {
  const { onClick } = props
  const { toggleDarktheme } = useContext(Context)

  return (
    <div
      className={`h-64   w-full absolute top-0 left-0  ${
        toggleDarktheme ? 'text-myText' : 'text-myDarkViolet'
      }`}
    >
      <div className="flex flex-col h-full space-y-4 justify-center items-center">
        <h1 className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl text-center font-myTitle font-black">
          Search & Play the best{' '}
          <span className="block sm:inline">
            <span className="text-myOrange ">free-to-play</span> games!
          </span>
        </h1>
        <p className="xl:text-xl md:text-base text-sm text-center">
          Track what you&apos;ve played and{' '}
          <span className="block sm:inline">search for what to play next!</span>
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-4 space-x-0 space-y-2 sm:space-y-0">
          <Link
            className="p-1 w-44 h-12 flex justify-center items-center rounded shadow-xl hover:shadow-none bg-myOrange hover:bg-myLightOrange  text-myBlackDarkViolet font-semibold transition-all duration-300"
            href="/signin"
          >
            Get started<span className="text-xs">! it&apos;s free ;)</span>
          </Link>
          <button
            onClick={onClick}
            className={`p-1  rounded border   w-44 h-12 transition-all duration-300 shadow-xl hover:shadow-none ${
              toggleDarktheme
                ? 'text-slate-400 hover:text-myText hover:border-myText border-slate-400'
                : 'text-myViolet hover:text-myOrange hover:border-myOrange border-myViolet'
            }`}
          >
            Browse games
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
