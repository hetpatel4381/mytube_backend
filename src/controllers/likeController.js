import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Like } from "../models/likeModel.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  try {
    // toggle like on video.

    // Get the video-ID from req.params and validate it.
    const { videoId } = req.params;
    const userId = req.user._id;
    if (!videoId) {
      throw new ApiError(400, "Video-ID Required!");
    }

    // check if the user already liked the video or not and validate it.
    const existingLike = await Like.findOne({
      video: videoId,
      likedBy: userId,
    });

    if (existingLike) {
      // If the like exists, remove it.
      await existingLike.deleteOne();
      return res
        .status(200)
        .json(new ApiResponse(200), null, "Video Like Removed Successfully!");
    } else {
      // If the like doesn't exists, create it.
      await Like.create({ video: videoId, likedBy: userId });
      return res
        .status(201)
        .json(new ApiResponse(201, null, "Video Liked Successfully!"));
    }
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Error Encountered Toggling Video Like!");
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
