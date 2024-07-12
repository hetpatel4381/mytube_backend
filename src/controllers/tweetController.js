import { Tweet } from "../models/tweetModel.js";
import { User } from "../models/userModel.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  try {
    // create tweet.

    // Get content from the req.body.
    const { content } = req.body;
    const userId = req.user._id;

    // validate if the content is empty or not.
    if (!content) {
      throw new ApiError(400, "Content is required!");
    }

    // create tweet object - create entry in DB.
    const newTweet = await Tweet.create({
      content,
      owner: userId,
    });

    // show content with user fields as well.
    // return response.
    res
      .status(201)
      .json(new ApiResponse(201, newTweet, "Tweet created Successfully!"));
  } catch (error) {
    throw new ApiError(400, "Error Encountered creating a new tweet");
  }
});

const getUserTweets = asyncHandler(async (req, res) => {
  try {
    // get user tweets.

    // first find the tweet with the user-id.
    const tweets = await Tweet.find({ owner: req.user._id });

    // return the response with the tweet we get.
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          tweets,
          "The tweets of the user is fetched Successfully!"
        )
      );
  } catch (error) {
    throw new ApiError(400, "Error Encountered Fetching User Tweets!");
  }
});

const updateTweet = asyncHandler(async (req, res) => {
  try {
    // update tweet.

    // get the content from req.body.
    const { content } = req.body;

    // get the twwetId from req.params.
    const { tweetId } = req.params;

    // validate the content.
    if (!content) {
      throw new ApiError(400, "Content field is required!");
    }

    // find the user with the content which we have to update.
    const user = await Tweet.findByIdAndUpdate(
      tweetId,
      {
        $set: {
          content,
        },
      },
      { new: true }
    );

    // return response.
    return res
      .status(200)
      .json(new ApiResponse(200, user, "Tweet Updated Successfully!"));
  } catch (error) {
    throw new ApiError(400, "Error Encountered Updating Tweet!");
  }
});

const deleteTweet = asyncHandler(async (req, res) => {
  try {
    // delete tweet.
    // get tweet from req.params.
    const { tweetId } = req.params;

    // find the tweet-id and delete from the DB.
    const deleteUser = await Tweet.findByIdAndDelete(tweetId);

    // return response.
    return res
      .status(200)
      .json(new ApiResponse(200, deleteUser, "User Deleted Successfully!"));
  } catch (error) {
    throw new ApiError(400, "Error Encountered Deleting the Tweet of the User");
  }
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
