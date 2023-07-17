import React from 'react'

const HomeSectionTitle = (props) => {
  const { icon, title, isDark } = props
  return (
    <div className="flex items-center ">
      <span className="lg:text-4xl text-3xl me-2 text-myOrange -rotate-12">
        {icon}
      </span>
      <p
        className={`lg:text-3xl text-xl font-bold font-myTitle ${
          isDark ? 'text-myText' : 'dark:text-myDarkViolet'
        }`}
      >
        {title}
      </p>
    </div>
  )
}

export default HomeSectionTitle
