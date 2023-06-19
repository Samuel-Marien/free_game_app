import React from 'react'
import Link from 'next/link'

const SuggestedCard = (props) => {
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

const SuggestedContainer = (props) => {
  const { user, suggestedGames } = props

  // console.log(suggestedGames)

  return (
    <div>
      <div>
        {user ? (
          <p>Based on your preferences and games you've recently played!</p>
        ) : (
          <p>
            Log In to view your personalized recommendations! Discover games
            you'll love.
          </p>
        )}
      </div>
      <div className="flex space-x-3">
        {suggestedGames.map((game) => {
          return (
            <SuggestedCard
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

export default SuggestedContainer
