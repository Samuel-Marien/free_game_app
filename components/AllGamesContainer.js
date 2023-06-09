import React, { useState } from 'react'

const GameCard = (props) => {
  const { title, genre, platform, onClick } = props
  return (
    <div className="border p-1 rounded bg-slate-100 shadow-md">
      <h1>{title}</h1>
      <p>{genre}</p>
      <p>{platform}</p>
      <button
        onClick={onClick}
        className="w-full mt-3 mb-1 rounded shadow bg-slate-300 hover:bg-slate-600 hover:text-slate-100"
      >
        Save
      </button>
    </div>
  )
}

const AllGamesContainer = ({ games }) => {
  const [gameSaved, setGameSaved] = useState([])

  // console.log(games)

  const handleSave = (game) => {
    setGameSaved(game)
  }

  console.log(gameSaved)

  return (
    <div className="container mx-auto mt-10">
      <div className="grid grid-cols-4 gap-4">
        {games.map((game) => {
          return (
            <GameCard
              key={game.id}
              title={game.title}
              genre={game.genre}
              platform={game.platform}
              onClick={() => handleSave(game)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default AllGamesContainer
