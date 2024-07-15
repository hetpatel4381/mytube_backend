import { Video } from "../models/videoModel.js";
import { Subscription } from "../models/subscriptionModel.js";
import { Like } from "../models/likeModel.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
});

const getChannelVideos = asyncHandler(async (req, res) => {
  try {
    // Get all the videos uploaded by the channel

    // Get user-ID from req.user._id.
    const userId = req.user._id;

    // Get all videos by the channel.
    const videos = await Video.find({ owner: userId });

    // return response.
    return res
      .status(200)
      .json(
        new ApiResponse(200, videos, "Channel Videos Fetched Successfully!")
      );
  } catch (error) {
    throw new ApiError(
      400,
      "Error Encoutered Fetching All Videos of the Channel!"
    );
  }
});

export { getChannelStats, getChannelVideos };
