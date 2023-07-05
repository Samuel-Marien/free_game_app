import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { AiFillWindows } from 'react-icons/ai'
import { CgBrowser } from 'react-icons/cg'

const GameCard = (props) => {
  const { title, genre, platform, id, imageSrc, shortDescription, gameUrl } =
    props
  return (
    <div className="grid grid-cols-2 gap-0 rounded-lg bg-myDarkViolet text-myText shadow-lg hover:shadow-none">
      <div className=" ">
        <div className=" absolute pt-0.5 flex text-myText items-center ">
          <p className=" scale-75 rounded-2xl p-1 bg-myDarkViolet w-max text-xs ">
            {genre}
          </p>
          <div className="scale-75 rounded-2xl p-0.5 bg-myDarkViolet w-max ">
            {platform === 'PC (Windows)' ? <AiFillWindows /> : <CgBrowser />}
          </div>
        </div>
        <div className="rounded-l-lg overflow-hidden ">
          <Image
            src={imageSrc}
            priority
            width={500}
            height={500}
            alt={`Picture of ${title}`}
          />
        </div>
      </div>

      <div className=" py-1 px-2">
        <h1 className="text-2xl font-bold text-center">{title}</h1>
        <p className="text-myText font-thin">
          {shortDescription.slice(0, 60)}
          {shortDescription.length > 60 && '...'}
        </p>

        <Link
          href={{ pathname: `/games/details-game`, query: { id: id } }}
          className="w-full mt-3 mb-1 rounded shadow bg-green-300 hover:bg-green-600 hover:text-green-100"
        >
          Detail
        </Link>
        <Link
          href={gameUrl}
          className="w-full mt-3 mb-1 rounded shadow bg-green-300 hover:bg-green-600 hover:text-green-100"
        >
          Play!
        </Link>
      </div>
    </div>
  )
}

const GameOfTheDayContainer = (props) => {
  const { game } = props

  console.log(game)

  return (
    <div className="">
      <p>Both Games of the day</p>
      <div className="grid grid-cols-2 gap-4">
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
            />
          )
        })}
      </div>
    </div>
  )
}

export default GameOfTheDayContainer
