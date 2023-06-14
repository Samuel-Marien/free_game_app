import React from 'react'
import { useRouter } from 'next/router'

const SortGameContainer = (props) => {
  const { genres } = props
  const router = useRouter()

  const handleClick = (choice, option) => {
    router.push(`/user-librairy?choice=${choice}&option=${option}`)
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
          {genres.map((genre, index) => {
            return (
              <li
                onClick={() => handleClick('sortByGenres', genre)}
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
