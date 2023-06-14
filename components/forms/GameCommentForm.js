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
  const router = useRouter()

  // console.log(router.query.id)
  // console.log(gameTitle)

  useEffect(() => {
    setMyId(router.query.id)
    setMyTitle(gameTitle)
  }, [myId])

  // console.log(myId)

  return (
    <Formik
      initialValues={{
        title: '',
        content: ''
      }}
      validationSchema={commentSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log(values)
        try {
          const result = await createComment({
            title: values.title,
            content: values.content,
            gameId: myId,
            gameTitle: myTitle
          })
          // console.log(result)
          resetForm()
          setSubmitting(false)
        } catch (error) {
          console.log(error.message)
          resetForm()
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="border p-1 mt-3 bg-slate-100 container w-6/12 mx-auto">
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
