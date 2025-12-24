// controllers/videoController.js
import { Video } from "../models/video.model.js";

// Get all videos
export const getAllVideos = async (req, res) => {
  try {
    
    console.log("Attempting to fetch videoss from database...");
    const videos = await Video.find().sort({ createdAt: -1 });

      console.log("Database connection successful");
        console.log("Number of videos found:", videos.length);
      
        if (videos.length === 0) {
          console.log("No events found in database");
      }
    res.status(200).json({
      success: true,
      count: videos.length,
      data: videos
    });
  } catch (error) {
    console.error("❌ Error fetching videos:", error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get single video
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'Video not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: video
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Create new video
export const createVideo = async (req, res) => {
  try {
    const video = await Video.create(req.body);
    
    res.status(201).json({
      success: true,
      data: video
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// Update video
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'Video not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: video
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Delete video
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    
    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'Video not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};