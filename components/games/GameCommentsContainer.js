import React from 'react'

import GameCommentForm from '../forms/GameCommentForm'
import GameComments from './GameComments'

const GameCommentsContainer = (props) => {
  const { gameTitle, comments, currentUser } = props

  // console.log(currentUser)

  return (
    <div>
      <GameComments comments={comments} />
      {currentUser ? (
        <GameCommentForm gameTitle={gameTitle} />
      ) : (
        <div className="border p-1 mt-3 bg-slate-100 container w-6/12 mx-auto">
          <p className="text-center   mb-2 border-b">Login for add comments!</p>
        </div>
      )}
    </div>
  )
}

export default GameCommentsContainer
