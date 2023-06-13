import React from 'react'
import { useRouter } from 'next/router'

const gameGenres = [
  'mmorpg',
  'shooter',
  'strategy',
  'moba',
  'racing',
  'sports',
  'social',
  'sandbox',
  'open-world',
  'survival',
  'pvp',
  'pve',
  'pixel',
  'voxel',
  'zombie',
  'turn-based',
  ' first-person',
  'third-Person',
  'top-down',
  ' tank',
  'space',
  'sailing',
  'side-scroller',
  'superhero',
  'permadeath',
  'card',
  'battle-royale',
  'mmo',
  'mmofps',
  'mmotps',
  '3d',
  '2d',
  'anime',
  'fantasy',
  'sci-fi',
  'fighting',
  'action-rpg',
  'action',
  'military',
  'martial-arts',
  'flight',
  'low-spec',
  'tower-defense',
  'horror',
  'mmorts'
]

const SortGameContainer = () => {
  const router = useRouter()

  const handleClick = (choice, order) => {
    router.push(`/user-librairy?choice=${choice}&order=${order}`)
  }

  return (
    <>
      <div className="flex">
        <div className="p-1 m-1 border rounded-sm shadow-sm w-max">
          sorted by date added
          <span
            onClick={() => handleClick('sortByDateAdded', 'plus')}
            className="p-1 border shadow m-1 cursor-pointer"
          >
            +
          </span>
          <span
            onClick={() => handleClick('sortByDateAdded', 'minus')}
            className="p-1 border shadow m-1 cursor-pointer"
          >
            -
          </span>
        </div>
        {/*  */}
        <div className="p-1 m-1 border rounded-sm shadow-sm w-max">
          sorted by Title
          <span
            onClick={() => handleClick('sortByTitle', 'plus')}
            className="p-1 border shadow m-1 cursor-pointer"
          >
            +
          </span>
          <span
            onClick={() => handleClick('sortByTitle', 'minus')}
            className="p-1 border shadow m-1 cursor-pointer"
          >
            -
          </span>
        </div>
        {/*  */}
        <div className="p-1 m-1 border rounded-sm shadow-sm w-max">
          sorted by Realease Date
          <span
            onClick={() => handleClick('sortByRealeaseDate', 'plus')}
            className="p-1 border shadow m-1 cursor-pointer"
          >
            +
          </span>
          <span
            onClick={() => handleClick('sortByRealeaseDate', 'minus')}
            className="p-1 border shadow m-1 cursor-pointer"
          >
            -
          </span>
        </div>
        {/*  */}
        <div className="p-1 m-1 border rounded-sm shadow-sm w-max">
          sorted by Platform
          <span
            onClick={() => handleClick('sortByPlatform', 'plus')}
            className="p-1 border shadow m-1 cursor-pointer"
          >
            +
          </span>
          <span
            onClick={() => handleClick('sortByPlatform', 'minus')}
            className="p-1 border shadow m-1 cursor-pointer"
          >
            -
          </span>
        </div>
      </div>
      <div className="border p-2 m-2 bg-slate-100">
        <p>Genres:</p>
        <ul className="flex flex-wrap">
          {gameGenres.map((genre, index) => {
            return (
              <li
                className="p-1 border m-2 w-max shadow cursor-pointer hover:shadow-none"
                key={index}
              >
                {genre}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default SortGameContainer
