import React, { useState } from 'react'
import Link from 'next/link'
import { addGame, addGameByUser } from '../../helper/game'

const GameCard = (props) => {
  const { title, genre, platform, onClick, id } = props
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
      <Link
        href={{ pathname: `/games/details-game`, query: { id: id } }}
        className="w-full mt-3 mb-1 rounded shadow bg-green-300 hover:bg-green-600 hover:text-green-100"
      >
        Detail
      </Link>
    </div>
  )
}

const AllGamesContainer = ({ games }) => {
  const [userErrorMessage, setUserErrorMessage] = useState('')
  const [userSuccessMessage, setUserSuccessMessage] = useState('')

  const handleSave = async (game) => {
    try {
      const result = await addGame(game)
      await addGameByUser(game)
      setUserSuccessMessage(result.message)
      // console.log(result.message)
    } catch (error) {
      setUserErrorMessage(error.message)
      // console.log(error.message)
    }
  }

  if (userErrorMessage || userSuccessMessage) {
    setTimeout(() => {
      setUserErrorMessage('')
      setUserSuccessMessage('')
    }, 2000)
  }

  // console.log(gameSaved)

  // console.log(games.status)
  if (games.status === 0) {
    return (
      <div className="container mx-auto mt-5 text-center text-3xl">
        {games.status_message}
      </div>
    )
  }

  return (
    <div className="container mx-auto mt-5">
      <div>
        <h2 className="text-center text-red-500">{userErrorMessage}</h2>
        <h2 className="text-center text-green-500">{userSuccessMessage}</h2>
      </div>
      <div>
        <p>pagination:</p>
        <div className="flex">
          <button className="p-1 border rounded shadow-lg bg-slate-100 hover:shadow-none">
            -
          </button>
          <p>page: X</p>
          <button className="p-1 border rounded shadow-lg bg-slate-100 hover:shadow-none">
            +
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {games.map((game, index) => {
          return (
            <GameCard
              key={game.id}
              id={game.id}
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
