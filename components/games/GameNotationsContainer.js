import React from 'react'

import GameNotationForm from '../forms/GameNotationForm'
// import GameNotations from './GameNotations'

const GameNotationsContainer = (props) => {
  const { gameTitle, currentUser, notations } = props

  if (!currentUser) {
    return (
      <div className="border p-1 mt-3 bg-slate-100 container w-6/12 mx-auto">
        <p className="text-center   mb-2 border-b">Login for add notation!</p>
      </div>
    )
  }
  return (
    <div className="border p-1 mt-3 bg-slate-100 container w-6/12 mx-auto">
      <p className="text-center   mb-2 border-b">Game Notations</p>
      <div>
        <GameNotationForm
          gameTitle={gameTitle}
          currentUser={currentUser}
          notations={notations}
        />
      </div>
    </div>
  )
}

export default GameNotationsContainer
