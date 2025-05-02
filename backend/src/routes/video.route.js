import { Router } from 'express';
import { createVideo, deleteVideo, getAllVideos, getVideoById, updateVideo } from '../controllers/video.controller.js';

const router=Router()



router
  .route('/videos')
  .get(getAllVideos)
  .post(createVideo);

router
  .route('/videos/:id')
  .get(getVideoById)
  .put(updateVideo)
  .delete(deleteVideo);

  export default router