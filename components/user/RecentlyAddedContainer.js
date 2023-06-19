import React from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'

const RecentlyAddedCard = (props) => {
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

const RecentlyAddedContainer = (props) => {
  const { recentlyAddedGames } = props
  const router = useRouter()

  // console.log(recentlyAddedGames)

  const handleCHangePlatform = (platform) => {
    console.log('hello: ' + platform)
    router.push(`/?platform=${platform}`)
  }

  return (
    <div>
      <p>Recently Added Container</p>
      <div className="flex space-x-3 my-2">
        <button
          onClick={() => handleCHangePlatform('pc')}
          className="p-1 rounded border cursor-pointer shadow-md hover:shadow-none"
        >
          PC
        </button>
        <button
          onClick={() => handleCHangePlatform('browser')}
          className="p-1 rounded border cursor-pointer shadow-md hover:shadow-none"
        >
          BROWSER
        </button>
        <button
          onClick={() => handleCHangePlatform('all')}
          className="p-1 rounded border cursor-pointer shadow-md hover:shadow-none"
        >
          ALL
        </button>
      </div>
      <div>
        {recentlyAddedGames.map((game) => {
          return (
            <RecentlyAddedCard
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

export default RecentlyAddedContainer
