import mongoose from 'mongoose'

const GameSchema = new mongoose.Schema(
  {
    developer: { type: string },
    freetogame_profile_url: { type: string },
    game_url: { type: string },
    genre: { type: string },
    id: { type: number },
    platform: { type: string },
    publisher: { type: string },
    release_date: { type: string },
    short_description: { type: string },
    thumbnail: { type: string },
    title: { type: string },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user']
    }
  },
  { timestamps: true }
)

export default mongoose.mmodel('Game', GameSchema)
