import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { AiFillWindows } from 'react-icons/ai'
import { CgBrowser } from 'react-icons/cg'
import { BsFillCollectionFill } from 'react-icons/bs'
import { GiGamepadCross } from 'react-icons/gi'
import { AiFillCode } from 'react-icons/ai'

const GameCardOfTheDay = (props) => {
  const {
    title,
    genre,
    platform,
    id,
    imageSrc,
    shortDescription,
    gameUrl,
    owners,
    developer,
    isDark
  } = props
  const [icon, setIcon] = useState('')
  const [infos, setInfos] = useState('opacity-0 transition-all duration-500')

  const handleMouseEnter = () => {
    setIcon(
      'translate-x-2 border-myViolet rotate-90 scale-110 text-myDarkViolet transition-all duration-500'
    )
  }

  const handleMouseLeave = () => {
    setIcon('')
  }

  const handleMouseEnterImage = () => {
    setInfos('opacity-100 transition-all duration-500')
  }
  const handleMouseLeaveImage = () => {
    setInfos('opacity-0 transition-all duration-500')
  }
  const handleMouseOutImage = () => {
    setInfos('hidden ')
  }

  return (
    <div
      className={`grid xl:grid-cols-3 grid-cols-1 gap-0 rounded-lg shadow-xl hover:shadow-none transition-all duration-300 ${
        isDark ? 'bg-myDarkViolet text-myText' : 'bg-myBrown text-myDarkViolet'
      }`}
    >
      {/* Left side  */}
      <div
        onMouseEnter={handleMouseEnterImage}
        onMouseLeave={handleMouseLeaveImage}
        onMouseOut={handleMouseOutImage}
        className="col-span-2 "
      >
        <div className="xl:rounded-l-lg xl:rounded-tr-none rounded-t-lg overflow-hidden ">
          <Link href={{ pathname: `/games/details-game`, query: { id: id } }}>
            {/* Image  */}
            <div className="hover:scale-105 transition-all duration-500 relative ">
              <Image
                src={imageSrc}
                priority
                width={600}
                height={600}
                alt={`Picture of ${title}`}
              />

              {/* Pills large device */}
              <div className="absolute top-0 left-0 h-full w-full p-0.5 ">
                <div className=" p-2">
                  <div
                    className={`hidden xl:flex z-20 p-0.5 space-x-9  justify-between  items-center ${infos} ${
                      isDark ? 'text-myText' : 'text-myDarkViolet'
                    }`}
                  >
                    <div className="flex space-x-2">
                      <p
                        className={`rounded-2xl p-1 px-2 w-max text-xs ${
                          isDark ? 'bg-myBg ' : 'bg-myText'
                        }`}
                      >
                        {genre}
                      </p>

                      <div
                        className={`rounded-2xl p-1 w-max text-center ${
                          isDark ? 'bg-myBg ' : 'bg-myText'
                        }`}
                      >
                        {platform === 'PC (Windows)' ? (
                          <AiFillWindows />
                        ) : (
                          <CgBrowser />
                        )}
                      </div>
                    </div>

                    <p
                      className={`flex items-center rounded-2xl p-1 px-2 w-max text-xs ${
                        isDark ? 'bg-myBg ' : 'bg-myText'
                      }`}
                    >
                      <span className="me-1">
                        <BsFillCollectionFill />
                      </span>
                      + {owners} add in library
                    </p>
                  </div>
                </div>
              </div>
              {/* Pills small device */}
              <div className="absolute top-0 left-0 h-full w-full pt-2 px-1 ">
                <div
                  className={`xl:hidden flex z-20 p-0.5 space-x-9  justify-between  items-center ${
                    isDark ? 'text-myText' : 'text-myDarkViolet'
                  }`}
                >
                  <div className="flex space-x-2">
                    <p
                      className={`rounded-2xl p-1 px-2 w-max text-xs ${
                        isDark ? 'bg-myBg ' : 'bg-myText'
                      }`}
                    >
                      {genre}
                    </p>

                    <div
                      className={`rounded-2xl p-1 w-max text-center ${
                        isDark ? 'bg-myBg ' : 'bg-myText'
                      }`}
                    >
                      {platform === 'PC (Windows)' ? (
                        <AiFillWindows />
                      ) : (
                        <CgBrowser />
                      )}
                    </div>
                  </div>

                  <p
                    className={`flex items-center rounded-2xl p-1 px-2 w-max text-xs ${
                      isDark ? 'bg-myBg ' : 'bg-myText'
                    }`}
                  >
                    <span className="me-1">
                      <BsFillCollectionFill />
                    </span>
                    + {owners} add in library
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Right side  */}
      <div className="flex flex-col justify-between p-2">
        <div>
          <h1 className="lg:text-xl font-myTitle text-base font-bold line-clamp-1">
            {title}
          </h1>
          <p
            className={`flex items-center mt-1 lg:text-sm text-xs  ${
              isDark ? 'text-myViolet' : 'text-myDarkOrange'
            }`}
          >
            <span className="me-1">
              <AiFillCode />
            </span>
            <span className="line-clamp-1">{developer}</span>
          </p>
          <p
            className={` mt-1 xl:text-base text-sm line-clamp-3 ${
              isDark ? 'text-myText' : 'text-myDarkViolet'
            }`}
          >
            {shortDescription}
          </p>
        </div>

        <div className="flex text-base justify-between space-x-3 xl:mt-0 mt-4">
          <Link
            target="_blank"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            href={gameUrl}
            className="flex items-center justify-center  shadow font-bold uppercase rounded px-2 py-1 bg-myOrange w-full 
            hover:shadow-none transition-all duration-150 hover:bg-myViolet hover:text-myDarkViolet"
          >
            Play Now!
            <span
              className={`transition-all duration-500 ms-2 text-xl border border-myText rounded-full p-0.5 text-myDarkViolet -rotate-12 ${
                icon && icon
              }`}
            >
              <GiGamepadCross />
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GameCardOfTheDay
