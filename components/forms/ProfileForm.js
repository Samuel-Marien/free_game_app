import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { object } from 'yup'

import { changePasswordHandler } from '../../helper/user'

import MyTextInput from './MyTextInput'
import MySpinner from '../MySpinner'

const profileSchema = object().shape({
  newPassword: Yup.string()
    .required('Required')
    .min(6, 'Your password is too short.'),
  newPasswordConfirmation: Yup.string().test(
    'passwords-match',
    'Passwords must match',
    function (value) {
      return this.parent.newPassword === value
    }
  ),
  oldPassword: Yup.string()
    .required('Required')
    .min(6, 'Your password is too short.')
})

const ProfileForm = () => {
  const [userErrorMessage, setUserErrorMessage] = useState('')
  const [userSuccessMessage, setUserSuccessMessage] = useState('')
  const router = useRouter()

  if (userErrorMessage || userSuccessMessage) {
    setTimeout(() => {
      setUserErrorMessage('')
      setUserSuccessMessage('')
    }, 2000)
  }

  return (
    <Formik
      initialValues={{
        newPassword: '',
        newPasswordConfirmation: '',
        oldPassword: ''
      }}
      validationSchema={profileSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const result = await changePasswordHandler({
            newPassword: values.newPassword,
            oldPassword: values.oldPassword
          })
          setUserSuccessMessage(result.message)
          resetForm()
          setSubmitting(false)
          setTimeout(() => {
            router.replace('/')
          }, 1500)
        } catch (error) {
          setUserErrorMessage(error.message)
          resetForm()
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="flex justify-center mt-10 ">
          <div className="border p-2 rounded bg-slate-50 shadow-sm">
            <h1 className="text-center mb-4 text-4xl text-slate-600 font-bold">
              Change password
            </h1>
            <h2 className="text-center text-red-500">{userErrorMessage}</h2>
            <h2 className="text-center text-green-500">{userSuccessMessage}</h2>
            {(!userErrorMessage || !userSuccessMessage) && isSubmitting && (
              <MySpinner />
            )}
            <MyTextInput
              label="New Password"
              name="newPassword"
              type="password"
            />
            <MyTextInput
              label="New Password Confirmation"
              name="newPasswordConfirmation"
              type="password"
            />
            <MyTextInput
              label="Old Password"
              name="oldPassword"
              type="password"
            />
            {isSubmitting || !isValid || !dirty ? (
              <div className="text-center p-2 mt-4 w-80 hover:text-slate-600">
                {!userErrorMessage || !userSuccessMessage
                  ? null
                  : 'Please provide all values.'}
              </div>
            ) : (
              <div>
                <button
                  disabled={isSubmitting || !isValid || !dirty}
                  className="border rounded p-2 mt-8 w-80 bg-slate-600 hover:bg-slate-400 text-slate-100 hover:text-slate-600 transition-all duration-200"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default ProfileForm
