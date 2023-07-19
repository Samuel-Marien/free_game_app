import React, { useContext } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Context from '../context/appContext'

import HomeSectionTitle from './HomeSectionTitle'

import { GiGamepadCross } from 'react-icons/gi'
import { BsCalendarPlus } from 'react-icons/bs'
import { AiFillWindows } from 'react-icons/ai'
import { CgBrowser } from 'react-icons/cg'

const RecentlyAddedCard = (props) => {
  const {
    title,
    genre,
    platform,
    id,
    imageUrl,
    releaseDate,
    description,
    gameUrl,
    isDark
  } = props

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 rounded-lg shadow-md hover:shadow-none transition-none duration-300">
      {/* Left Side  */}
      <Link
        className=" overflow-hidden xl:rounded-l-lg xl:rounded-tr-none rounded-t-lg"
        href={{ pathname: `/games/details-game`, query: { id: id } }}
      >
        <div>
          <Image
            className="hover:scale-100 scale-105 brightness-90  hover:brightness-100 transition-transform duration-300"
            src={imageUrl}
            priority
            width={600}
            height={600}
            alt={title}
          />
        </div>
      </Link>
      {/* Right side  */}
      <div
        className={`flex flex-col justify-between p-2  xl:rounded-r-lg rounded-br-lg rounded-bl-lg xl:rounded-bl-none ${
          isDark ? 'bg-myDarkViolet bg-opacity-80' : 'bg-myBrown bg-opacity-80'
        }`}
      >
        <div>
          {/* Title  */}
          <h1
            className={` font-myTitle font-semibold lg:text-2xl sm:text-xl text-base line-clamp-1 ${
              isDark ? 'text-myText' : 'text-myDarkViolet'
            }`}
          >
            {title}
          </h1>

          {/* Infos  */}
          <div className="space-y-1 ">
            {/* Release date & Pills  */}
            <div className="flex space-x-2 pt-1">
              {/* Release date  */}
              <p
                className={`flex items-center text-myText font-thin lg:text-sm text-xs px-2 shadow p-1 rounded-xl  ${
                  isDark ? ' bg-myBlackDarkViolet' : ' bg-myDarkViolet'
                }`}
              >
                <span className="me-1">
                  <BsCalendarPlus />
                </span>
                {releaseDate}
              </p>

              {/* Pills  */}
              <div className="flex space-x-2 ">
                <p
                  className={`text-xs flex items-center text-myText uppercase px-2 shadow p-1 rounded-xl w-max ${
                    isDark ? ' bg-myBlackDarkViolet' : ' bg-myDarkViolet'
                  }`}
                >
                  {genre}
                </p>
                <p
                  className={`text-base text-myText uppercase flex justify-center items-center shadow p-1 rounded-full  w-max  ${
                    isDark ? ' bg-myBlackDarkViolet' : ' bg-myDarkViolet'
                  }`}
                >
                  {platform === 'PC (Windows)' ? (
                    <AiFillWindows />
                  ) : (
                    <CgBrowser />
                  )}
                </p>
              </div>
            </div>

            {/* Descriptiion  */}
            <div
              className={` md:text-sm text-xs pt-1 ${
                isDark ? 'text-myText' : 'text-myDarkViolet'
              }`}
            >
              <p className=" 2xl:line-clamp-3 xl:xl:line-clamp-2 line-clamp-1">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Play button  */}
        <div className=" w-full flex justify-end">
          <Link
            className=" uppercase bg-myOrange font-myTitle font-semibold text-center w-full md:w-max rounded shadow-lg p-1 md:mt-2 mt-4 px-2 text-myText text-sm hover:bg-myViolet hover:text-myBlackDarkViolet hover:shadow-none transition-all duration-300"
            target="_blank"
            href={gameUrl}
          >
            Play Now!
          </Link>
        </div>
      </div>
    </div>
  )
}

const RecentlyAddedContainer = (props) => {
  const { recentlyAddedGames } = props
  const { toggleDarktheme } = useContext(Context)
  const router = useRouter()

  // console.log(recentlyAddedGames)

  const handleCHangePlatform = (platform) => {
    router.push(`/?platform=${platform}`)
  }

  return (
    <div>
      <HomeSectionTitle
        icon={<GiGamepadCross />}
        title="Recently added"
        isDark={toggleDarktheme}
      />
      {/* <div className="flex space-x-3 my-2">
        <button
          onClick={() => handleCHangePlatform('pc')}
          className="p-1 rounded border cursor-pointer shadow-md hover:shadow-none"
        >
          PC
        </button>
        <button
          onClick={() => handleCHangePlatform('browser')}
          className="p-1 rounded border cursor-pointer shadow-md hover:shadow-none"
        >
          BROWSER
        </button>
        <button
          onClick={() => handleCHangePlatform('all')}
          className="p-1 rounded border cursor-pointer shadow-md hover:shadow-none"
        >
          ALL
        </button>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {recentlyAddedGames.map((game) => {
          return (
            <RecentlyAddedCard
              key={game.id}
              title={game.title}
              genre={game.genre}
              platform={game.platform}
              id={game.id}
              imageUrl={game.thumbnail}
              releaseDate={game.release_date}
              description={game.short_description}
              gameUrl={game.game_url}
              isDark={toggleDarktheme}
            />
          )
        })}
      </div>
    </div>
  )
}

export default RecentlyAddedContainer
