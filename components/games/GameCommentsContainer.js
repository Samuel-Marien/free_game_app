import React from 'react'

import GameCommentForm from '../forms/GameCommentForm'
import GameComments from './GameComments'

const GameCommentsContainer = (props) => {
  const { gameTitle, comments } = props
  return (
    <div>
      <GameComments comments={comments} />
      <GameCommentForm gameTitle={gameTitle} />
    </div>
  )
}

export default GameCommentsContainer
