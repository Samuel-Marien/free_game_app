import React, { useState } from 'react'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import { object } from 'yup'

const myValidationSchema = object().shape({
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

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div>
      <label className="text-slate-600" htmlFor={props.id || props.name}>
        {label}
      </label>
      <div>
        <input className="border p-1 rounded w-80" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="text-red-500">{meta.error}</div>
        ) : null}
      </div>
    </div>
  )
}

async function createUser({ firstName, lastName, email, password }) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, email, password }),
    headers: { 'Content-Type': 'application/json' }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong :(')
  }

  return data
}

const SignForm = () => {
  const [isLogin, setIsLogin] = useState(true)

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState)
    setIsLogin((prevState) => !prevState)
  }

  if (isLogin) {
    // log user in
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
      validationSchema={myValidationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        createUser({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password
        })

        resetForm()
        setSubmitting(false)
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="flex justify-center mt-10">
          <div className="border p-2 rounded">
            <h1 className="text-center mb-4 text-4xl text-slate-600 font-bold">
              Sign in
            </h1>
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
            <MyTextInput
              label="Email"
              name="email"
              type="email"
              placeholder="janedoe@gmail.com"
            />
            <MyTextInput label="Password" name="password" type="password" />
            <MyTextInput
              label="Confirm"
              name="passwordConfirmation"
              type="password"
            />
            {isSubmitting || !isValid || !dirty ? (
              <div className="text-center p-2 mt-4 w-80 hover:text-slate-600">
                Please provide all values :)
              </div>
            ) : (
              <button
                disabled={isSubmitting || !isValid || !dirty}
                className="border rounded p-2 mt-8 w-80 bg-slate-600 hover:bg-slate-400 text-slate-100 hover:text-slate-600 transition-all duration-200"
                type="submit"
              >
                Submit
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default SignForm
