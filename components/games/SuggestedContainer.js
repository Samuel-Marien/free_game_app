import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Context from '../context/appContext'

import HomeSectionTitle from './HomeSectionTitle'

import { GiVintageRobot, GiGamepad } from 'react-icons/gi'
import { AiFillWindows } from 'react-icons/ai'
import { CgBrowser } from 'react-icons/cg'

const SuggestedCard = (props) => {
  const { title, platform, id, imageSrc, videoSrc } = props
  return (
    <Link href={{ pathname: `/games/details-game`, query: { id: id } }}>
      <div className=" rounded-b-md bg-myDarkViolet shadow-md hover:shadow-2xl rounded-t-lg overflow-hidden transition-all duration-500">
        <div className="hover:scale-105 transition-all duration-500 relative ">
          <Image
            className="rounded-t-lg"
            src={imageSrc}
            priority
            width={300}
            height={200}
            alt={`Picture of ${title}`}
          />
        </div>

        <h1 className="flex pt-2 justify-between rounded-b-md text-myText p-1.5 text-sm font-semibold">
          {title}
          <span className="rounded-full  p-0.5 border bg-myBg">
            {platform === 'PC (Windows)' ? <AiFillWindows /> : <CgBrowser />}
          </span>
        </h1>
      </div>
    </Link>
  )
}

const SuggestedContainer = (props) => {
  const { user, suggestedGames } = props
  const { toggleDarktheme } = useContext(Context)

  // console.log(suggestedGames)

  return (
    <div>
      <HomeSectionTitle
        icon={<GiVintageRobot />}
        title="Personalized Recommendations"
        isDark={toggleDarktheme}
      />
      <div className="mb-5 ">
        {user ? (
          <p className="flex items-center py-1 text-myOrange">
            <span className="text-2xl me-2 ">
              <GiGamepad />
            </span>
            Based on your preferences and games you&apos;ve recently played!
          </p>
        ) : (
          <p className="flex items-center py-1 text-red-400">
            <span className="text-2xl me-2 text-red-400">
              <GiGamepad />
            </span>
            Log In to view your personalized recommendations! Discover games
            you&apos;ll love.
          </p>
        )}
      </div>
      <div className="grid grid-cols-5 gap-4 ">
        {suggestedGames.map((game) => {
          return (
            <SuggestedCard
              key={game.id}
              title={game.title}
              genre={game.genre}
              platform={game.platform}
              id={game.id}
              imageSrc={game.thumbnail}
            />
          )
        })}
      </div>
    </div>
  )
}

export default SuggestedContainer
