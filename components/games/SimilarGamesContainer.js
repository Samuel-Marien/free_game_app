import React from 'react'
import Link from 'next/link'

const SimilarGamesCard = (props) => {
  const { title, genre, platform, id } = props
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
    </div>
  )
}

const SimilarGamesContainer = (props) => {
  const { similarGames } = props
  // console.log(similarGames)
  return (
    <div>
      <p>Similar Games Container</p>
      <div>
        {similarGames.map((game) => {
          return (
            <SimilarGamesCard
              key={game.id}
              title={game.title}
              genre={game.genre}
              platform={game.platform}
              id={game.id}
            />
          )
        })}
      </div>
    </div>
  )
}

export default SimilarGamesContainer
