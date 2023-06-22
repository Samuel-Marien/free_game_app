import React from 'react'

const CommunautyRecoCard = (props) => {
  const { title, genre, platform, id, comment } = props
  return (
    <div className="border p-1 rounded bg-slate-100 shadow-md">
      <h1>{title}</h1>
      <p>{genre}</p>
      <p>{platform}</p>

      <Link
        href={{ pathname: `/games/details-game`, query: { id: id } }}
        className="w-full mt-3 mb-1 rounded shadow bg-green-300 hover:bg-green-600 hover:text-green-100"
      >
        Detail
      </Link>
      <p>{comment && comment}</p>
    </div>
  )
}

const CommunautyRecoContainer = (props) => {
  const { communautyReco } = props

  console.log(communautyReco)
  return <div>Communauty Reco Container</div>
}

export default CommunautyRecoContainer
