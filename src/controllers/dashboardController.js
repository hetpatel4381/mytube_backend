import { Video } from "../models/videoModel.js";
import { Subscription } from "../models/subscriptionModel.js";
import { Like } from "../models/likeModel.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
  try {
    // Get the channel stats like total video views, total subscribers, total videos, total likes etc.

    // Get user-ID from req.user._id and validate it.
    const userId = req.user._id;
    if (!userId) {
      throw new ApiError(400, "User-ID Required!");
    }

    // Total videos uploaded by the channel.
    const totalVideos = await Video.countDocuments({ owner: userId });

    // Total video views.
    const totalViews = await Video.aggregate([
      { $match: { owner: userId } },
      { $group: { _id: null, totalViews: { $sum: "$views" } } },
    ]);

    // Total subscribers.
    const totalSubscribers = await Subscription.countDocuments({
      channel: userId,
    });

    // Total likes on all videos.
    const totalLikes = await Like.countDocuments({
      video: { $in: await Video.find({ owner: userId }) },
    });

    // return response.
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          totalVideos,
          totalViews: totalViews[0] ? totalViews[0].totalViews : 0,
          totalSubscribers,
          totalLikes,
        },
        "Channel stats Fetched Successfully!"
      )
    );
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Error Encountered Fetching Channel Stats!");
  }
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
