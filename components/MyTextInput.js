import React from 'react'
import { useField } from 'formik'

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

export default MyTextInput
