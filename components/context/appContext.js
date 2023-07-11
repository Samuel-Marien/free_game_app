import React, { createContext, useState } from 'react'

export const Provider = (props) => {
  const [toggleDarktheme, setToggleDarktheme] = useState(true)

  return (
    <Context.Provider
      {...props}
      value={{
        toggleDarktheme,
        setToggleDarktheme
      }}
    />
  )
}

const Context = createContext()
export default Context
