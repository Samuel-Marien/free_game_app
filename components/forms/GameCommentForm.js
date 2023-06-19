import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { object } from 'yup'

import { createComment } from '../../helper/user'

import MyTextInput from './MyTextInput'

const commentSchema = object().shape({
  title: Yup.string()
    .min(3, 'Must be 3 characters or more')
    .required('Required'),
  content: Yup.string()
    .min(3, 'Must be 3 characters or more')
    .required('Required')
})

const GameCommentForm = (props) => {
  const { gameTitle } = props
  const [myId, setMyId] = useState(0)
  const [myTitle, setMyTitle] = useState('')
  const [userErrorMessage, setUserErrorMessage] = useState('')
  const [userSuccessMessage, setUserSuccessMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    setMyId(router.query.id)
    setMyTitle(gameTitle)
  }, [myId, gameTitle, router.query.id])

  if (userErrorMessage || userSuccessMessage) {
    setTimeout(() => {
      setUserErrorMessage('')
      setUserSuccessMessage('')
    }, 1500)
  }

  return (
    <Formik
      initialValues={{
        title: '',
        content: ''
      }}
      validationSchema={commentSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const result = await createComment({
            title: values.title,
            content: values.content,
            gameId: myId,
            gameTitle: myTitle
          })
          setUserSuccessMessage(result.message)
          resetForm()
          setSubmitting(false)
          setTimeout(() => {
            router.push(`/games/details-game?id=${myId}`)
          }, 1500)
        } catch (error) {
          setUserErrorMessage(error.message)
          console.log(error.message)
          resetForm()
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="border p-1 mt-3 bg-slate-100 container w-6/12 mx-auto">
          <h2 className="text-center text-red-500">{userErrorMessage}</h2>
          <h2 className="text-center text-green-500">{userSuccessMessage}</h2>
          <p className="text-center text-2xl font-bold mb-2 border-b">
            Game Comment Form
          </p>
          <div className="">
            <MyTextInput
              label="Title"
              name="title"
              type="text"
              placeholder="Nice game..."
            />

            <MyTextInput
              label="Comment"
              name="content"
              type="text"
              textarea="true"
            />
          </div>
          {isValid && (
            <button
              type="submit"
              className="shadow mt-5 bg-slate-600 text-slate-200 h-10 border rounded w-full"
            >
              send
            </button>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default GameCommentForm
