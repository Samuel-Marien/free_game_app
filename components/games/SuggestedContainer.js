import React, { useContext, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Context from '../context/appContext'

import HomeSectionTitle from './HomeSectionTitle'

import {
  GiVintageRobot,
  GiGamepad,
  GiPlayButton,
  GiPauseButton
} from 'react-icons/gi'
import { AiFillWindows } from 'react-icons/ai'
import { CgBrowser } from 'react-icons/cg'
import { FaLink } from 'react-icons/fa'

const MyIframe = (props) => {
  const { videoSrc, controls, start, height } = props
  return (
    <iframe
      className=""
      height={height}
      src={`https://www.youtube.com/embed/${videoSrc}?autoplay=1&mute=1&fs=0&iv_load_policy=3&controls=${controls}&showinfo=0&modestbranding=1&start=${start}&rel=0`}
    ></iframe>
  )
}

const SuggestedCard = (props) => {
  const { title, platform, id, imageSrc, videoSrc, isDark, gameUrl } = props
  const [showVideo, setShowVideo] = useState(false)
  const [showButton, setShowButton] = useState(false)

  const handleMouseEnterImage = () => {
    setShowVideo(true)
  }
  const handleMouseLeaveImage = () => {
    setShowVideo(false)
  }

  const handleMouseEnterText = () => {
    setShowButton(true)
  }
  const handleMouseLeaveText = () => {
    setShowButton(false)
  }

  return (
    <div>
      {/* Upside (image and video)  */}
      <div
        onMouseEnter={handleMouseEnterImage}
        onMouseLeave={handleMouseLeaveImage}
        className="  bg-black shadow-md hover:shadow-2xl rounded-t-md "
      >
        {showVideo ? (
          <div className=" flex justify-center items-center rounded-t-lg  overflow-hidden">
            {/* large device view  */}
            <div className="hidden sm:block">
              <MyIframe
                height={185}
                videoSrc={videoSrc}
                controls={0}
                start={15}
              />
            </div>
            {/* mobile device view  */}
            <div className="sm:hidden block">
              <MyIframe
                height={185}
                videoSrc={videoSrc}
                controls={2}
                start={0}
              />
            </div>
          </div>
        ) : (
          <div>
            <Image
              style={{ height: '185px' }}
              className="rounded-t-md"
              src={imageSrc}
              priority
              width={600}
              height={600}
              alt={`Picture of ${title}`}
            />
          </div>
        )}
      </div>
      <div className="relative flex justify-center">
        <button
          onClick={() => setShowVideo(!showVideo)}
          className={`flex justify-center items-center  absolute -top-4 ms-4 rounded-full text-xl p-1.5 ${
            isDark ? 'text-white bg-myDarkViolet' : ' text-myViolet bg-myBrown'
          }`}
        >
          {showVideo ? <GiPauseButton /> : <GiPlayButton />}
        </button>
      </div>
      {/* Down side  */}
      <div
        onMouseEnter={handleMouseEnterText}
        onMouseLeave={handleMouseLeaveText}
        className={`flex h-12 justify-between items-center rounded-b-md  p-1.5 text-sm font-semibold ${
          isDark
            ? 'bg-myDarkViolet text-myText'
            : 'bg-myBrown text-myDarkViolet'
        }`}
      >
        <Link
          href={{ pathname: `/games/details-game`, query: { id: id } }}
          className={`flex  items-center rounded-b-md p-1.5 text-sm font-semibold h-full`}
        >
          <span className="text-myViolet text-xs me-2">
            <FaLink />
          </span>
          {title}
        </Link>
        <div>
          {showButton ? (
            <div
              className={`text-sm space-x-3 ${
                showButton ? ' suggestedSlide-in ' : ' suggestedSlide-out'
              }`}
            >
              <Link
                href={gameUrl}
                className="bg-myOrange text-myText hover:bg-myViolet hover:text-myText rounded-md hover:rounded p-0.5  px-1 hover:shadow-lg shadow-none transition-all duration-300"
              >
                Play!
              </Link>
            </div>
          ) : (
            <div className="flex">
              <div
                className={`rounded-full shadow-sm text-base p-1 hidden xl:block ${
                  isDark ? 'bg-myBg ' : 'bg-myText border'
                } ${
                  !showButton ? '  suggestedSlide-in' : '  suggestedSlide-out'
                }`}
              >
                {platform === 'PC (Windows)' ? (
                  <AiFillWindows />
                ) : (
                  <CgBrowser />
                )}
              </div>
              <div className="xl:hidden block">
                <Link
                  href={gameUrl}
                  className="bg-myOrange text-myText hover:bg-myViolet hover:text-myText rounded-md hover:rounded p-0.5  px-1 hover:shadow-lg shadow-none transition-all duration-300"
                >
                  Play!
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const SuggestedContainer = (props) => {
  const { user, suggestedGames } = props
  const { toggleDarktheme } = useContext(Context)

  console.log(suggestedGames)
  // console.log(user.user.name[0])

  const userNameSanitize =
    user &&
    user.user.name[0].toUpperCase().slice(0, 1) + user.user.name[0].slice(1)

  return (
    <div>
      <HomeSectionTitle
        icon={<GiVintageRobot />}
        title="Recommendations"
        isDark={toggleDarktheme}
      />
      <div className="mb-5 ">
        {user ? (
          <p className="flex items-center py-1 text-xs sm:text-base text-myOrange">
            <span className="text-2xl me-2 ">
              <GiGamepad />
            </span>
            {suggestedGames.length < 1
              ? `Ooops!... ${userNameSanitize}, save games in your library, so that we can find your future treasures.`
              : 'Based on your preferences and games you have recently added in your library.'}
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
      {suggestedGames.length < 1 ? (
        <div className="flex justify-center items-center  ">
          <Image
            // style={{ height: '185px' }}
            priority
            className={`border border-myViolet rounded-full  overflow-visible ${
              toggleDarktheme
                ? 'bg-white bg-opacity-10'
                : 'bg-myViolet bg-opacity-20'
            }`}
            src="/images/sad.png"
            width={200}
            height={200}
            alt="no games found!"
          />
        </div>
      ) : (
        <div className="grid lg:grid-cols-4  sm:grid-cols-2 grid-cols-1 gap-4 ">
          {suggestedGames.map((game) => {
            return (
              <SuggestedCard
                key={game.id}
                title={game.title}
                genre={game.genre}
                platform={game.platform}
                id={game.id}
                imageSrc={game.thumbnail}
                videoSrc={game.video}
                isDark={toggleDarktheme}
                gameUrl={game.game_url}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SuggestedContainer
