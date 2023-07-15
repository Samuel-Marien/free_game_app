import React, { createContext, useState } from 'react'

export const Provider = (props) => {
  const [toggleDarktheme, setToggleDarktheme] = useState(true)
  const [bgImage, setBgImage] = useState('')

  return (
    <Context.Provider
      {...props}
      value={{
        toggleDarktheme,
        setToggleDarktheme,
        bgImage,
        setBgImage
      }}
    />
  )
}

const Context = createContext()
export default Context
