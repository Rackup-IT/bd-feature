"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDNARY_APISCERATE,
});

export const uploadImage = async (fileBuffer: string): Promise<string> => {
  const generateProfilePicUrl = await cloudinary.uploader.upload(fileBuffer, {
    folder: "admins-profiles",
    unique_filename: true,
  });

  return generateProfilePicUrl.secure_url;
};
