import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { object } from 'yup'

import { addNotation } from '../../helper/user'

const notationSchema = object().shape({
  note: Yup.number()
})

const GameNotationForm = (props) => {
  const { gameTitle, currentUser, notations } = props
  const [myTitle, setMyTitle] = useState('')
  const [myId, setMyId] = useState(0)
  const [userChoice, setUserChoice] = useState(0)
  const [asVoted, setAsVoted] = useState(false)
  const [prevNote, setPrevNote] = useState(0)
  const [low, setLow] = useState(0)
  const [middle, setMiddle] = useState(0)
  const [high, setHigh] = useState(0)

  const router = useRouter()

  useEffect(() => {
    setMyId(router.query.id)

    setMyTitle(gameTitle)
    let existingNotation = []
    try {
      if (notations !== null)
        existingNotation = notations.filter(
          (item) => item.createdBy === currentUser
        )
    } catch (error) {
      console.log(error)
    }

    // console.log(existingNotation)

    if (existingNotation.length < 1) {
      setAsVoted(false)
    } else {
      setAsVoted(true)
      setPrevNote(existingNotation[0] && existingNotation[0].note)
      // console.log(existingNotation[0].note)
    }

    let myLow = []
    let myMiddle = []
    let myHigh = []

    if (notations !== null) {
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
            break
        }
      })

      setLow(myLow.length)
      setMiddle(myMiddle.length)
      setHigh(myHigh.length)
    }
  }, [myId, asVoted, prevNote, notations])

  // console.log(asVoted)
  // console.log(prevNote)

  return (
    <>
      <div className=" p-1  bg-slate-100 container w-6/12 mx-auto">
        <p className="text-center text-2xl font-bold mb-2 border-b">Notes</p>
        <div className=" p-1  bg-slate-100 container w-6/12 mx-auto">
          <ul className="flex justify-center space-x-2">
            <li className=" h-10 w-10 flex justify-center items-center  rounded">
              {low}
            </li>
            <li className=" h-10 w-10 flex justify-center items-center  rounded">
              {middle}
            </li>
            <li className=" h-10 w-10 flex justify-center items-center  rounded">
              {high}
            </li>
          </ul>
        </div>
      </div>

      <Formik
        initialValues={{
          note: ''
        }}
        validationSchema={notationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          // console.log(userChoice)
          try {
            const result = await addNotation({
              gameId: myId,
              gameTitle: myTitle,
              note: userChoice
            })
            router.push(`/games/details-game?id=${myId}`)

            setSubmitting(false)
          } catch (error) {
            console.log(error.message)
          }
        }}
      >
        <Form className=" p-1 bg-slate-100 container w-6/12 mx-auto">
          <ul className="flex justify-center space-x-2">
            {prevNote === '1' ? (
              <div className="bg-red-200 h-10 w-10 flex justify-center items-center border rounded">
                😡
              </div>
            ) : (
              <button
                type="submit"
                onClick={() => setUserChoice('1')}
                className="cursor-pointer hover:shadow-none h-10 w-10 flex justify-center items-center border shadow-lg rounded"
              >
                😡
              </button>
            )}
            {prevNote === '2' ? (
              <div className="bg-red-200 h-10 w-10 flex justify-center items-center border rounded">
                😑
              </div>
            ) : (
              <button
                type="submit"
                onClick={() => setUserChoice('2')}
                className="cursor-pointer hover:shadow-none h-10 w-10 flex justify-center items-center border shadow-lg rounded"
              >
                😑
              </button>
            )}
            {prevNote === '3' ? (
              <div className="bg-red-200 h-10 w-10 flex justify-center items-center border rounded">
                😁
              </div>
            ) : (
              <button
                type="submit"
                onClick={() => setUserChoice('3')}
                className="cursor-pointer hover:shadow-none h-10 w-10 flex justify-center items-center border shadow-lg rounded"
              >
                😁
              </button>
            )}
          </ul>
        </Form>
      </Formik>
    </>
  )
}

export default GameNotationForm
