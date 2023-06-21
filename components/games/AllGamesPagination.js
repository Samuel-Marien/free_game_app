import React from 'react'

const AllGamesPagination = (props) => {
  const {
    totalGames,
    itemsByPage,
    totalPages,
    onClickMinus,
    onClickMaxus,
    currentPage
  } = props

  return (
    <div className="container mx-auto mt-2">
      <p>
        Pagination: {itemsByPage} games by page. For {totalGames} games.
      </p>
      <div className="flex space-x-5 mt-2">
        <button
          onClick={onClickMinus}
          className="p-1 border rounded shadow-lg bg-slate-100 hover:shadow-none"
        >
          -
        </button>
        <p>
          page: {currentPage}/{totalPages}
        </p>

        <button
          onClick={onClickMaxus}
          className="p-1 border rounded shadow-lg bg-slate-100 hover:shadow-none"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default AllGamesPagination
