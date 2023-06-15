import React, { useState, useEffect } from 'react'

const MembersGameInfosContainer = (props) => {
  const { notations, comments } = props
  const [numOfComments, setNumOfComments] = useState(0)
  const [numOfRating, setNumOfRating] = useState(0)

  // console.log(notations.length)
  // console.log(comments)

  useEffect(() => {
    if (comments)
      try {
        setNumOfComments(comments.length)
      } catch (error) {
        console.log(error)
      }
    if (notations)
      try {
        setNumOfRating(notations.length)
      } catch (error) {
        console.log(error)
      }
  }, [numOfRating, numOfComments, notations, comments])

  // console.log(numOfComments)
  // console.log(numOfRating)

  return (
    <div className="border p-1 mt-3 bg-slate-100 container w-6/12 mx-auto">
      <div>Members Game Infos Container</div>
      <div>
        <p>Members Ratings: {numOfRating}</p>
        {/* <p>1 Members have this game in their library!</p> */}
        <p>{numOfComments} Reviews</p>
      </div>
    </div>
  )
}

export default MembersGameInfosContainer
