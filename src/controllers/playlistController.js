import { Playlist } from "../models/playlistModel.js";
import { Video } from "../models/videoModel.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async (req, res) => {
  try {
    // create playlist.

    // Get name and description from req.body.
    const { name, description, page = 1, limit = 10 } = req.body;

    // validate name and desciption.
    if (!name || !description) {
      throw new ApiError(400, "All Fields are Required!");
    }

    // Get videos of the User.
    const userVideos = await Video.find({ owner: req.user._id })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    //Get videos-ID from userVideos.
    const videosId = userVideos.map((video) => video._id);

    // creating playlist DB entry
    const createPlaylist = await Playlist.create({
      name,
      description,
      videos: videosId,
      owner: req.user._id,
    });

    // Return the response.
    return res
      .status(201)
      .json(
        new ApiResponse(201, createPlaylist, "Playlist created successfully!")
      );
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Error encountered while creating playlist!");
  }
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  //TODO: get user playlists
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  //TODO: get playlist by id
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  // TODO: remove video from playlist
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  // TODO: delete playlist
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  //TODO: update playlist
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
