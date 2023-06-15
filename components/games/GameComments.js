import React from 'react'

const GameComments = (props) => {
  const { comments } = props
  // console.log(comments)

  const dateTransformer = (a) => {
    const b = JSON.stringify(a)
    const day = b.slice(1, 11).replaceAll('-', '/')
    const time = b.slice(12, 20)

    return { day, time }
  }

  if (!comments) {
    return (
      <div className="border p-1 mt-3 bg-slate-100 container w-6/12 mx-auto">
        <p className="text-center   mb-2 border-b">there is no comment :(</p>
      </div>
    )
  }

  return (
    <div className="border p-1 mt-3 bg-slate-100 container w-6/12 mx-auto">
      <p className="text-center text-2xl font-bold mb-2 border-b">
        GameComments:
      </p>
      <ul>
        {comments.map((comment, index) => {
          return (
            <li className="bg-slate-300 p-2 rounded shadow my-2" key={index}>
              <div>{comment.title}</div>
              <div>{comment.content}</div>
              <div>{comment.createdBy}</div>
              <div>{dateTransformer(comment.createdAt).day}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default GameComments
