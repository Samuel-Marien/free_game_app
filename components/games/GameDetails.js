import React, { useState } from 'react'
import Link from 'next/link'
import { addGame, addGameByUser } from '../../helper/game'

const GameDetails = (props) => {
  const { game } = props
  const [userErrorMessage, setUserErrorMessage] = useState('')
  const [userSuccessMessage, setUserSuccessMessage] = useState('')

  // console.log(game)

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

  return (
    <div className="container w-6/12 mx-auto p-2 bg-slate-100">
      <h2 className="text-center text-red-500">{userErrorMessage}</h2>
      <h2 className="text-center text-green-500">{userSuccessMessage}</h2>
      <p className="text-2xl font-black">{game.title}</p>
      <p>description: {game.description}</p>
      <p>developer: {game.developer}</p>
      <p>genre: {game.genre}</p>
      <p>release date: {game.release_date}</p>
      <Link href={game.game_url}>game_url: {game.game_url}</Link>
      <button
        onClick={() => handleSave(game)}
        className="w-full mt-3 mb-1 rounded shadow bg-slate-300 hover:bg-slate-600 hover:text-slate-100"
      >
        Save
      </button>
    </div>
  )
}

export default GameDetails
