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
      'translate-x-10 rotate-180 scale-110 text-myDarkViolet transition-all duration-500'
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

  return (
    <div
      className={`grid xl:grid-cols-2 grid-cols-1 gap-0 rounded-lg shadow-xl hover:shadow-none transition-all duration-300 ${
        isDark ? 'bg-myDarkViolet text-myText' : 'bg-myBrown text-myDarkViolet'
      }`}
    >
      <div
        onMouseEnter={handleMouseEnterImage}
        onMouseLeave={handleMouseLeaveImage}
        className=" "
      >
        <div className="xl:rounded-l-lg xl:rounded-tr-none rounded-t-lg overflow-hidden ">
          {/* Pills  */}
          <div
            className={`hidden xl:flex absolute z-20 p-0.5 space-x-9  justify-between  items-center ${infos} ${
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

          <div className="hover:scale-105 transition-all duration-500">
            <Image
              src={imageSrc}
              priority
              width={600}
              height={600}
              alt={`Picture of ${title}`}
            />
          </div>
        </div>
      </div>
      {/* tablet & mobil device  */}
      <div
        className={`xl:hidden flex absolute z-20 p-0.5 space-x-9  justify-between  items-center  ${
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
            {platform === 'PC (Windows)' ? <AiFillWindows /> : <CgBrowser />}
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
      {/* tablet & mobil device end */}

      <div className="flex flex-col justify-between p-2">
        <div>
          <h1 className="lg:text-2xl text-xl font-bold">{title}</h1>
          <p
            className={`flex items-center mt-1 lg:text-sm text-xs ${
              isDark ? 'text-myViolet' : 'text-myDarkOrange'
            }`}
          >
            <span className="me-1">
              <AiFillCode />
            </span>
            {developer}
          </p>
          <p
            className={`  mt-1 lg:text-base text-sm ${
              isDark ? 'text-myText' : 'text-myDarkViolet'
            }`}
          >
            {shortDescription.slice(0, 80)}
            {shortDescription.length > 80 && '...'}
          </p>
        </div>

        <div className="flex justify-between space-x-3 xl:mt-0 mt-4">
          <Link
            href={{ pathname: `/games/details-game`, query: { id: id } }}
            className={`uppercase shadow-none font-bold rounded px-2 py-1 border  hover:shadow transition-all duration-150 ${
              isDark
                ? 'text-myViolet border-myViolet hover:text-myOrange hover:border-myOrange'
                : 'text-myDarkOrange border-myDarkOrange hover:text-myViolet hover:border-myViolet hover:bg-myDarkViolet'
            }`}
          >
            about
          </Link>
          <Link
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
