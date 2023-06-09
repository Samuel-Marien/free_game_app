import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form } from 'formik'
import { signIn } from 'next-auth/react'
import * as Yup from 'yup'
import { object } from 'yup'

import MyTextInput from './MyTextInput'
import MySpinner from '../MySpinner'

import { createUser } from '../../helper/user'

const signInSchema = object().shape({
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .required('Required')
    .min(6, 'Your password is too short.'),
  passwordConfirmation: Yup.string().test(
    'passwords-match',
    'Passwords must match',
    function (value) {
      return this.parent.password === value
    }
  )
})

const loginSchema = object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .required('Required')
    .min(6, 'Your password is too short.')
})

const SignForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [userErrorMessage, setUserErrorMessage] = useState('')
  const [userSuccessMessage, setUserSuccessMessage] = useState('')
  const router = useRouter()

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState)
  }

  if (userErrorMessage || userSuccessMessage) {
    setTimeout(() => {
      setUserErrorMessage('')
      setUserSuccessMessage('')
    }, 2000)
  }

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      }}
      validationSchema={!isLogin ? loginSchema : signInSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        if (!isLogin) {
          const result = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password
          })

          if (result.error) {
            setUserErrorMessage(result.error)
            resetForm()
          }

          if (!result.error) {
            setUserSuccessMessage('Successfully connected!')
            setTimeout(() => {
              router.replace('/')
            }, 1500)
          }
        } else {
          try {
            const result = await createUser({
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              password: values.password
            })
            setUserSuccessMessage(result.message)
            resetForm()
            setSubmitting(false)
            setIsLogin(false)
          } catch (error) {
            setUserErrorMessage(error.message)
            resetForm()
          }
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="flex justify-center mt-10 ">
          <div className="border p-2 rounded bg-slate-50 shadow-sm">
            <h1 className="text-center mb-4 text-4xl text-slate-600 font-bold">
              {isLogin ? 'Sign up' : 'Log in'}
            </h1>
            <h2 className="text-center text-red-500">{userErrorMessage}</h2>
            <h2 className="text-center text-green-500">{userSuccessMessage}</h2>
            {(!userErrorMessage || !userSuccessMessage) && isSubmitting && (
              <MySpinner />
            )}
            {isLogin && (
              <>
                <MyTextInput
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeholder="Jane"
                />
                <MyTextInput
                  label="Last Name"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                />
              </>
            )}
            <MyTextInput
              label="Email"
              name="email"
              type="email"
              placeholder="janedoe@gmail.com"
            />
            <MyTextInput label="Password" name="password" type="password" />
            {isLogin && (
              <MyTextInput
                label="Confirm"
                name="passwordConfirmation"
                type="password"
              />
            )}

            {isSubmitting || !isValid || !dirty ? (
              <div className="text-center p-2 mt-4 w-80 hover:text-slate-600">
                <p> Please provide all values.</p>
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
            <button
              type="button"
              className="mt-5 text-xs text-slate-300 underline"
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Login with existing account' : 'Create new account'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default SignForm
