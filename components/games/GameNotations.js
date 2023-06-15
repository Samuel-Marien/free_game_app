import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const GameNotations = (props) => {
  const { notations } = props
  const router = useRouter()

  const [myId, setMyId] = useState(0)
  const [low, setLow] = useState(0)
  const [middle, setMiddle] = useState(0)
  const [high, setHigh] = useState(0)

  console.log(notations)

  useEffect(() => {
    let myLow = []
    let myMiddle = []
    let myHigh = []

    notations.map((item) => {
      let note = parseInt(item.note)

      switch (note) {
        case 1:
          myLow.push(note)
          break
        case 2:
          myMiddle.push(note)
          break
        case 3:
          myHigh.push(note)
          break
        default:
          // Note invalide, vous pouvez choisir de gérer cela comme vous le souhaitez
          break
      }
    })

    setMyId(router.query.id)
    setLow(myLow.length)
    setMiddle(myMiddle.length)
    setHigh(myHigh.length)
    // console.log(low, middle, high)
  }, [low, middle, high, myId])

  console.log(low, middle, high, myId)

  return (
    <div className="border p-1 mt-3 bg-slate-100 container w-6/12 mx-auto">
      <p className="text-center text-2xl font-bold mb-2 border-b">Notes</p>
      <div className="border p-1 mt-3 bg-slate-100 container w-6/12 mx-auto">
        <ul className="flex justify-center space-x-2">
          <li className=" h-10 w-10 flex justify-center items-center border rounded">
            {low}
          </li>
          <li className=" h-10 w-10 flex justify-center items-center border rounded">
            {middle}
          </li>
          <li className=" h-10 w-10 flex justify-center items-center border rounded">
            {high}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default GameNotations
