import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import AllGamesPagination from './AllGamesPagination'

const genres = [
  'all',
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
  'first-person',
  'third-Person',
  'top-down',
  'tank',
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

const AllGamesSortContainer = (props) => {
  const { totalGames, itemsByPage, totalPages } = props
  const [platform, setPlatform] = useState('all')
  const [category, setCategory] = useState('all')
  const [sorted, setSorted] = useState('release-date')
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()

  const handleChangePage = (option) => {
    if (currentPage === 1 && option === '-') {
      setCurrentPage(totalPages)
    }
    if (option === '+' && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
    if (option === '-' && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
    if (currentPage === totalPages && option === '+') {
      setCurrentPage(1)
    }
  }

  useEffect(() => {
    const redirect = () => {
      router.push(
        `/games/all-games?platform=${platform}&category=${category}&sorted=${sorted}&page=${currentPage}`
      )
    }

    redirect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platform, category, sorted, currentPage])

  return (
    <div className="container mx-auto mt-2">
      <p>All Games Sort Container</p>
      <div className="flex space-x-3">
        <div className="flex space-x-3 border p-1 w-max items-center">
          <p>plateform:</p>
          <button
            onClick={() => setPlatform('pc')}
            className="p-1 shadow-md border rounded bg-slate-100"
          >
            pc
          </button>
          <button
            onClick={() => setPlatform('browser')}
            className="p-1 shadow-md border rounded bg-slate-100"
          >
            browser
          </button>
          <button
            onClick={() => setPlatform('all')}
            className="p-1 shadow-md border rounded bg-slate-100"
          >
            All
          </button>
        </div>
        <div className="flex space-x-3 border p-1 w-max items-center">
          <p>category:</p>
          <select onChange={(e) => setCategory(e.target.value)}>
            {genres.map((genre, index) => {
              return (
                <option key={index} value={genre}>
                  {genre}
                </option>
              )
            })}
          </select>
        </div>
        <div className="flex space-x-3 border p-1 w-max items-center">
          <p>sorted:</p>
          <button
            onClick={() => setSorted('release-date')}
            className="p-1 shadow-md border rounded bg-slate-100"
          >
            release-date
          </button>
          <button
            onClick={() => setSorted('popularity')}
            className="p-1 shadow-md border rounded bg-slate-100"
          >
            popularity
          </button>
          <button
            onClick={() => setSorted('alphabetical ')}
            className="p-1 shadow-md border rounded bg-slate-100"
          >
            alphabetical
          </button>
          <button
            onClick={() => setSorted('relevance ')}
            className="p-1 shadow-md border rounded bg-slate-100"
          >
            relevance
          </button>
        </div>
      </div>
      <AllGamesPagination
        totalGames={totalGames}
        itemsByPage={itemsByPage}
        totalPages={totalPages}
        currentPage={currentPage}
        onClickMinus={() => handleChangePage('-')}
        onClickMaxus={() => handleChangePage('+')}
      />
    </div>
  )
}

export default AllGamesSortContainer
