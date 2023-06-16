import React from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'

import { removeGame } from '../../helper/game'

const GameCard = (props) => {
  const { title, genre, platform, onClick, id } = props
  return (
    <div className="border p-1 rounded bg-slate-100 shadow-md">
      <h1>{title}</h1>
      <p>{genre}</p>
      <p>{platform}</p>

      <Link
        href={{ pathname: `/games/details-game`, query: { id: id } }}
        className="w-full mt-3 mb-1 rounded shadow bg-green-300 hover:bg-green-600 hover:text-green-100"
      >
        Detail
      </Link>
      <button
        onClick={onClick}
        className="p-1 rounded border w-full shadow-lg bg-red-300"
      >
        Delete
      </button>
    </div>
  )
}

const GamesContainer = (props) => {
  const { games } = props
  const router = useRouter()
  // console.log(games)

  const handleDelete = async (game) => {
    try {
      await removeGame(game)
      router.push(`/user-librairy`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {games.map((game) => {
        return (
          <GameCard
            key={game.id}
            title={game.title}
            genre={game.genre}
            platform={game.platform}
            id={game.id}
            onClick={() => handleDelete(game.id)}
          />
        )
      })}
    </div>
  )
}

export default GamesContainer
