import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { AiFillWindows } from 'react-icons/ai'
import { CgBrowser } from 'react-icons/cg'
import { BsFillCollectionFill } from 'react-icons/bs'
import { GiGamepadCross, GiCowled } from 'react-icons/gi'
import { AiFillCode } from 'react-icons/ai'

const GameCard = (props) => {
  const {
    title,
    genre,
    platform,
    id,
    imageSrc,
    shortDescription,
    gameUrl,
    owners,
    developer
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
    <div className="grid xl:grid-cols-2 grid-cols-1 gap-0 rounded-lg bg-myDarkViolet text-myText shadow-xl hover:shadow-none transition-all duration-300">
      <div
        onMouseEnter={handleMouseEnterImage}
        onMouseLeave={handleMouseLeaveImage}
        className=" "
      >
        <div className="lg:rounded-l-lg lg:rounded-r-none rounded-t-lg overflow-hidden ">
          {/* Pills  */}
          <div
            className={` absolute z-20 p-0.5 space-x-9 flex justify-between text-myText items-center ${infos}`}
          >
            <div className="flex space-x-2">
              <p className="  rounded-2xl p-1 px-2 bg-myBg w-max text-xs ">
                {genre}
              </p>

              <div className=" rounded-2xl p-1 bg-myBg w-max text-center">
                {platform === 'PC (Windows)' ? (
                  <AiFillWindows />
                ) : (
                  <CgBrowser />
                )}
              </div>
            </div>

            <p className=" flex items-center rounded-2xl p-1 px-2 bg-myBg w-max text-xs">
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
              width={500}
              height={500}
              alt={`Picture of ${title}`}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between p-2">
        <div>
          <h1 className="lg:text-2xl text-xl font-bold">{title}</h1>
          <p className="flex items-center text-myViolet lg:text-sm text-xs">
            <span className="me-1">
              <AiFillCode />
            </span>
            {developer}
          </p>
          <p className="text-myText font-thin mt-1 lg:text-base text-sm">
            {shortDescription.slice(0, 80)}
            {shortDescription.length > 80 && '...'}
          </p>
        </div>

        <div className="flex justify-between space-x-3 lg:mt-0 mt-4">
          <Link
            href={{ pathname: `/games/details-game`, query: { id: id } }}
            className=" uppercase shadow font-bold rounded px-2 py-1 border text-myViolet border-myViolet hover:text-myOrange hover:border-myOrange hover:shadow-none transition-all duration-150"
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

const GameOfTheDayContainer = (props) => {
  const { game } = props

  console.log(game)

  return (
    <div className="">
      <div className="flex items-center mb-5">
        <span className="lg:text-4xl text-2xl me-2 text-myViolet -rotate-12">
          <GiGamepadCross />
        </span>
        <p className="lg:text-4xl text-2xl font-bold text-myText">
          Games of the day
        </p>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {game.map((game) => {
          return (
            <GameCard
              key={game.id}
              imageSrc={game.thumbnail}
              title={game.title}
              genre={game.genre}
              platform={game.platform}
              id={game.id}
              shortDescription={game.short_description}
              gameUrl={game.game_url}
              owners={game.owners}
              developer={game.developer}
            />
          )
        })}
      </div>
    </div>
  )
}

export default GameOfTheDayContainer
