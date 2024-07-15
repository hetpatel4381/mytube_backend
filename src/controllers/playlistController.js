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
  try {
    // Add Video to Playlist.

    // Get Playlist-ID and Video-ID and validate it.
    const { playlistId, videoId } = req.params;
    if (!playlistId || !videoId) {
      throw new ApiError(400, "Playlist-ID and Video-ID Required!");
    }

    // Get the playlist by playlist-ID from DB and validate it.
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      throw new ApiError(400, "Playlist Not Found!");
    }

    // check if video already exist in the playlist or not.
    if (playlist.videos.includes(videoId)) {
      throw new ApiError(400, "Video already exist in the Playlist!");
    }

    // Add the video to the playlist.
    playlist.videos.push(videoId);

    // save the updated playlist.
    await playlist.save();

    // return the updated playlist.
    return res
      .status(200)
      .json(
        new ApiResponse(200, playlist, "Video Added to Playlist Successfully!")
      );
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Error Encountered Adding Video to the Playlist!");
  }
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  try {
    // remove video from playlist.

    // Get playlist-ID and video-ID from req.params and validate the playlist-ID and video-ID.
    const { playlistId, videoId } = req.params;
    if (!playlistId || !videoId) {
      throw new ApiError(400, "Playlist-ID and Video-ID Required!");
    }

    // Find the playlist by playlist-ID from DB and validate if playlist exist or not.
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      throw new ApiError(400, "Playlist Not Found!");
    }

    // check if video exist in the playlist or not.
    const videoIndex = playlist.videos.indexOf(videoId);
    if (videoIndex === -1) {
      throw new ApiError(400, "Video Not Found!");
    }

    // remove video from the playlist.
    playlist.videos.splice(videoIndex, 1);

    // save the updated playlist.
    await playlist.save();

    // return the updated playlist.
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          playlist,
          "Video Removed from the Playlist Successfully!"
        )
      );
  } catch (error) {
    console.log(error);
    throw new ApiError(
      400,
      "Error Encountered Removing the Video from the Playlist!"
    );
  }
});

const deletePlaylist = asyncHandler(async (req, res) => {
  try {
    // delete playlist.

    // Get playlist-ID from req.params.
    const { playlistId } = req.params;

    // validate playlist-ID.
    if (!playlistId) {
      throw new ApiError(400, "Playlist not Found!");
    }

    // find the playlist and delete.
    const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);

    // return response.
    return res
      .status(200)
      .json(
        new ApiResponse(200, deletedPlaylist, "Playlist deleted Successfully!")
      );
  } catch (error) {}
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
