import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Video } from "../models/videoModel.js";
import { Comment } from "../models/commentModel.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
});

const addComment = asyncHandler(async (req, res) => {
  try {
    // add a comment to a video.

    // getting video-ID from req.params.
    const { videoId } = req.params;

    // getting content from req.body.
    const { content } = req.body;

    // validating the video-ID.
    if (!videoId || !content) {
      throw new ApiError(400, "Video-ID and Content Required!");
    }

    // searching for video in DB.
    const video = await Video.findById(videoId);

    // validating the video.
    if (!video) {
      throw new ApiError(400, "Video not Found!");
    }

    // creating a new comment.
    const comment = await Comment.create({
      content,
      video: videoId,
      owner: req.user._id,
    });

    // returning the response.
    return res
      .status(201)
      .json(new ApiResponse(201, comment, "Comment created Successfully!"));
  } catch (error) {
    throw new ApiError(400, "Error Encountered while Creating a Comment!");
  }
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
});

export { getVideoComments, addComment, updateComment, deleteComment };
