import React, { useContext } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Context from '../context/appContext'

import HomeSectionTitle from './HomeSectionTitle'

import { GiGamepadCross } from 'react-icons/gi'
import { BsCalendarPlus, BsChatSquareText } from 'react-icons/bs'
import { AiFillWindows, AiFillCode, AiOutlineFileDone } from 'react-icons/ai'
import { CgBrowser } from 'react-icons/cg'

const RecentlyAddedCard = (props) => {
  const {
    title,
    genre,
    platform,
    id,
    imageUrl,
    releaseDate,
    developer,
    publisher,
    description,
    gameUrl
  } = props
  return (
    <div className="grid grid-cols-2 shadow-md hover:shadow-none transition-none duration-300">
      {/* Left Side  */}
      <Link
        className=" overflow-hidden rounded-l-lg"
        href={{ pathname: `/games/details-game`, query: { id: id } }}
      >
        <div>
          <Image
            className="hover:scale-100 scale-105 brightness-90  hover:brightness-100 transition-transform duration-300"
            src={imageUrl}
            priority
            width={600}
            height={500}
            alt={title}
          />
        </div>
      </Link>
      {/* Right side  */}
      <div className=" flex flex-col justify-between p-2 bg-myDarkViolet bg-opacity-80 rounded-r-lg">
        <div>
          {/* Title  */}
          <h1 className="text-myText font-myTitle font-semibold text-2xl line-clamp-1">
            {title}
          </h1>

          {/* Infos  */}
          <div className="space-y-1">
            {/* dev & publisher  */}
            {/* <div className="flex items-center text-sm space-x-2 text-myViolet">
              <p className="flex items-center">
                <span className="me-1">
                  <AiFillCode />
                </span>
                {developer} ({publisher})
              </p>
            </div> */}

            {/* Release date & Pills  */}
            <div className="flex space-x-2 pt-1">
              {/* Release date  */}
              <p className=" flex items-center text-myText font-thin text-sm px-2 shadow p-1 rounded-xl bg-myBlackDarkViolet">
                <span className="me-1">
                  <BsCalendarPlus />
                </span>
                {releaseDate}
              </p>

              {/* Pills  */}
              <div className="flex space-x-2 ">
                <p className="text-xs flex items-center text-myText uppercase px-2 shadow p-1 rounded-xl bg-myBlackDarkViolet w-max">
                  {genre}
                </p>
                <p className="text-base text-myText uppercase flex justify-center items-center shadow p-1 rounded-full bg-myBlackDarkViolet w-max">
                  {platform === 'PC (Windows)' ? (
                    <AiFillWindows />
                  ) : (
                    <CgBrowser />
                  )}
                </p>
              </div>
            </div>

            {/* Descriptiion  */}
            <div className="text-myText text-sm pt-1 ">
              <p className=" line-clamp-2   ">{description}</p>
            </div>
          </div>
        </div>

        {/* Play button  */}
        <div className=" w-full flex justify-end">
          <Link
            className="bg-myOrange rounded shadow-lg p-1 mt-1 px-2 text-myText"
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
      <div className="flex space-x-3 my-2">
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
      </div>
      <div className="grid grid-cols-2 gap-4">
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
              developer={game.developer}
              publisher={game.publisher}
              description={game.short_description}
              gameUrl={game.game_url}
            />
          )
        })}
      </div>
    </div>
  )
}

export default RecentlyAddedContainer
