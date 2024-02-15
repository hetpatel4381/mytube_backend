import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dxwsmgl5n",
  api_key: "232196553583557",
  api_secret: "JAuTeLwuD4i1hzA7PBey9BODcmk",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // upload file to cloudinary.
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // console.log("File is uploaded on cloudinary: ", response.url);

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed.
    console.log(error);
    return null;
  }
};

export { uploadOnCloudinary };
