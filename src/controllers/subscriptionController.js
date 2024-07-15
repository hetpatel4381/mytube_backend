import { User } from "../models/userModel.js";
import { Subscription } from "../models/subscriptionModel.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  try {
    // toggle subscription.

    // Get the channel-ID as (user) and subscriber-ID as (another user).
    const { channelId } = req.params;
    const subscriberId = req.user._id;

    // Check if the subscription already exists
    const existingSubscription = await Subscription.findOne({
      channel: channelId,
      subscriber: subscriberId,
    });

    if (existingSubscription) {
      // If the subscription exists, remove it
      await existingSubscription.deleteOne();
      return res
        .status(200)
        .json(new ApiResponse(200, null, "Unsubscribed successfully!"));
    } else {
      // If the subscription doesn't exist, create it
      await Subscription.create({
        channel: channelId,
        subscriber: subscriberId,
      });
      return res
        .status(201)
        .json(new ApiResponse(201, null, "Subscribed successfully!"));
    }
  } catch (error) {
    throw new ApiError(400, "Error Encountered Subscribing to the channel!");
  }
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  try {
    // Get channel Subscribers.

    // Get channel-Id from req.params and validate it.
    const { channelId } = req.params;
    if (!channelId) {
      throw new ApiError(400, "Channel-ID Required!");
    }

    // Find all subscriptions for the channel
    const subscriptions = await Subscription.find({
      channel: channelId,
    }).populate("subscriber", "name email");

    if (!subscriptions) {
      throw new ApiError(400, "Subscriptions Not Found!");
    }

    // Extract the subscribers from the subscriptions
    const subscribers = subscriptions.map((sub) => sub.subscriber);

    return res
      .status(200)
      .json(
        new ApiResponse(200, subscribers, "Subscribers fetched successfully!")
      );
  } catch (error) {
    throw new ApiError(
      400,
      "Error Encountered Getting User Channel Subscribers!"
    );
  }
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
