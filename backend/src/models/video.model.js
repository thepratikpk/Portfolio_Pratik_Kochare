import mongoose from "mongoose";

const videoSchema=new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
      },
      description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description cannot be more than 500 characters']
      },
      videoUrl: {
        type: String,
        required: [true, 'Please add a video URL']
      },
      category: {
        type: String,
        enum: ['Cinematic', 'editing', 'animation', 'other'],
        default: 'Cinematic'
      },
},{timestamps:true})

export const Video=mongoose.model("Video",videoSchema)