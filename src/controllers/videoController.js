import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Video } from "../models/videoModel.js";

const getAllVideos = asyncHandler(async (req, res) => {
  try {
    // get all videos based on query, sort, pagination.

    // get the details from req.query.
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;

    // build the match query
    let matchQuery = {};
    if (query) {
      matchQuery = {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      };
    }

    // convert user-ID to object-ID.
    if (userId) {
      matchQuery.owner = mongoose.Types.ObjectId(userId);
    }

    // sort the options.
    let sortOptions = {};
    sortOptions[sortBy] = sortType === "asc" ? 1 : -1;

    // Pagination options.
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: sortOptions,
    };

    // Execute aggregation with pagination.
    const videos = await Video.aggregatePaginate(
      Video.aggregate().match(matchQuery).sort(sortOptions),
      options
    );

    // return the response.
    return res
      .status(200)
      .json(new ApiResponse(200, videos, "Videos Retrieved Successfully!"));
  } catch (error) {
    throw new ApiError(500, "Error Retrieving Videos!");
  }
});

const publishAVideo = asyncHandler(async (req, res) => {
  try {
    // get video, upload to cloudinary, create video.

    // Get title, description, video, thumbnail from req.body.
    const { title, description } = req.body;
    const videoFile = req.files?.videoFile[0]?.path;
    const thumbnail = req.files?.thumbnail[0]?.path;

    // validate the required fields.
    if (!title || !description || !videoFile || !thumbnail) {
      throw new ApiError(400, "All fields are required!");
    }

    // upload video to cloudinary.
    const video = await uploadOnCloudinary(videoFile);
    // upload thumbnail to cloudinary.
    const thumbnailUpload = await uploadOnCloudinary(thumbnail);

    // create new-video to store in DB.
    const newVideo = await Video.create({
      title,
      description,
      videoFile: video.url,
      thumbnail: thumbnailUpload.url,
      duration: video.duration,
      views: 0,
      isPublished: true,
      owner: req.user._id,
    });

    // return the response.
    return res
      .status(201)
      .json(new ApiResponse(201, newVideo, "Video Published Successfully!"));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Error publishing video");
  }
});

const getVideoById = asyncHandler(async (req, res) => {
  try {
    // get video by id.

    // get the video-ID from req.params.
    const { videoId } = req.params;

    // validate the video-ID.
    if (!videoId) {
      throw new ApiError(400, "Video-ID Required!");
    }

    const video = await Video.findById(videoId);

    // return the response with the particular video-ID.
    return res
      .status(200)
      .json(new ApiResponse(200, video, "Video Retrieved Successfully"));
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Error Encountered Retrieving the Video");
  }
});

const updateVideo = asyncHandler(async (req, res) => {
  try {
    // update video details like title, description, thumbnail.

    // get video-ID from req.params.
    const { videoId } = req.params;
    const { title, description } = req.body;
    const thumbnail = req.file.path;

    // validate the video-ID.
    if (!videoId || !title || !description || !thumbnail) {
      throw new ApiError(400, "All Fields are Required!");
    }

    // uploading thumbnail to cloudinary.
    const thumbnailUpload = await uploadOnCloudinary(thumbnail);

    // if url not generated then showing error.
    if (!thumbnailUpload.url) {
      throw new ApiError(400, "Error while uploading thumbnail");
    }

    // updating the video with the req.body content to the DB.
    const video = await Video.findByIdAndUpdate(
      videoId,
      {
        $set: {
          title: title,
          description: description,
          thumbnail: thumbnailUpload.url,
        },
      },
      { new: true }
    );

    // return the response.
    return res
      .status(200)
      .json(new ApiResponse(200, video, "Video Updated Successfully!"));
  } catch (error) {
    throw new ApiError(400, "Error Encountered Updating Video!");
  }
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
