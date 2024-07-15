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
    throw new ApiError(500, "Error encountered while creating playlist!");
  }
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  //TODO: get user playlists
});

const getPlaylistById = asyncHandler(async (req, res) => {
  try {
    // get playlist by id.

    // Get playlist-ID from req.params.
    const { playlistId } = req.params;

    // validate playlist-ID.
    if (!playlistId) {
      throw new ApiError(400, "Playlist-ID Required!");
    }

    // search in DB.
    const playlist = await Playlist.findById(playlistId);

    // validate playlist is there or not.
    if (!playlist) {
      throw new ApiError(400, "Playlist not Found!");
    }

    // return playlist as response.
    return res
      .status(200)
      .json(new ApiResponse(200, playlist, "Playlist Fetched Successfully!"));
  } catch (error) {
    throw new ApiError(400, "Error Encountered while fetching Playlist!");
  }
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
  try {
    // update playlist.

    // Get playlist-ID from req.params and (name, desctription from req.body).
    const { playlistId } = req.params;
    const { name, description } = req.body;

    // validate playlist-ID, name and desctiption.
    if (!playlistId || !name || !description) {
      throw new ApiError(400, "All Fields are Required!");
    }

    // fetch and update playlist in DB.
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      playlistId,
      { name, description },
      { new: true }
    );

    // return response.
    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedPlaylist, "Playlist Updated Successfully!")
      );
  } catch (error) {
    throw new ApiError(400, "Error Encounterd while updating the Playlist!");
  }
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
