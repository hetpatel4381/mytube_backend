import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/userModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // Get user details from the frontend
  // validation if details are not empty .
  // check if user already exist: username, email.
  // check for images, check for avatar.
  // upload them to cloudinary, avatar.
  // create user object - create entry in DB.
  // remove password and refresh token field from response.
  // check for user creation.
  // return response.

  const { username, fullname, email, password } = req.body;

  if (
    [username, fullname, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are Required!");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User Name or Email Already Exists !");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  console.log(avatarLocalPath);
  console.log(coverImageLocalPath);

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is Required !");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar is Required !");
  }

  const newUser = await User.create({
    username: username.toLowerCase(),
    fullname,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const userCreated = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  if (!userCreated) {
    throw new ApiError(
      500,
      "Something went wrong while registering the User !"
    );
  }

  res
    .status(201)
    .json(new ApiResponse(200, userCreated, "User Created Successfully !"));
});

export { registerUser };
