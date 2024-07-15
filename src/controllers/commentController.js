import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Video } from "../models/videoModel.js";
import { Comment } from "../models/commentModel.js";
import mongoose from "mongoose";

const getVideoComments = asyncHandler(async (req, res) => {
  try {
    // get all comments for a video.

    // getting video-ID from req.params.
    const { videoId } = req.params;

    // getting page and limit from req.query.
    const { page = 1, limit = 10 } = req.query;

    // validating video-ID.
    if (!videoId) {
      throw new ApiError(400, "Video-ID Required!");
    }

    // searching for video in DB.
    const videoExists = await Video.findById(videoId);

    // validating the video.
    if (!videoExists) {
      throw new ApiError(400, "Video not Found!");
    }

    // set pagination options.
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 },
    };

    // Get comments using aggregation and pagination.
    const comments = await Comment.aggregatePaginate(
      Comment.aggregate().match({
        video: new mongoose.Types.ObjectId(videoId),
      }),
      options
    );

    // return the response with comments.
    return res
      .status(200)
      .json(
        new ApiResponse(200, comments, "Video Comments Fetched Successfully!")
      );
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Error Encountered getting Comments of Video!");
  }
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
  try {
    // update a comment.

    // Get comment-ID from req.params.
    const { commentId } = req.params;

    // Get content from req.body.
    const { content } = req.body;

    // validate the comment-ID.
    if (!commentId) {
      throw new ApiError(400, "Comment-ID Required!");
    }

    // updating the comment content in DB.
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );

    // return updated comment response.
    return res
      .status(200)
      .json(
        new ApiResponse(200, updateComment, "Comment updated Successfully!")
      );
  } catch (error) {
    throw new ApiError(400, "Error Encountered Updating Video Comment");
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
});

export { getVideoComments, addComment, updateComment, deleteComment };
