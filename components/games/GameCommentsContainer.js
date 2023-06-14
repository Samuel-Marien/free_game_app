import React from 'react'

import GameCommentForm from '../forms/GameCommentForm'

const GameCommentsContainer = (props) => {
  const { gameTitle } = props
  return (
    <div>
      <GameCommentForm gameTitle={gameTitle} />
    </div>
  )
}

export default GameCommentsContainer
