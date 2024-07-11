import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const healthcheck = asyncHandler(async (req, res) => {
  // build a healthcheck response that simply returns the OK status as json with a message
  res.status(200).json(new ApiResponse(200, "Api Working Perfectly! 😄"));
});

export { healthcheck };
