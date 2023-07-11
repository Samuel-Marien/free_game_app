import React, { useContext } from 'react'

import Context from '../context/appContext'

import GameCardOfTheDay from './GameCardOfTheDay'
import HomeSectionTitle from './HomeSectionTitle'

import { GiGamepadCross } from 'react-icons/gi'

const GameOfTheDayContainer = (props) => {
  const { game } = props

  const { toggleDarktheme } = useContext(Context)

  // console.log(toggleDarktheme)
  console.log(game)

  return (
    <div className="">
      <HomeSectionTitle
        icon={<GiGamepadCross />}
        title="Discover random games"
        isDark={toggleDarktheme}
      />

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {game.map((game) => {
          return (
            <GameCardOfTheDay
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
              isDark={toggleDarktheme}
            />
          )
        })}
      </div>
    </div>
  )
}

export default GameOfTheDayContainer
