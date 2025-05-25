"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

import { uploadImage } from "@/app/actions";
import useHttpReq from "../../../hooks/api/useApiReq";
import AdminModel from "../../../interfaces/admin";

interface EditProfileProps {
  author: AdminModel;
}

const EditProfile: React.FC<EditProfileProps> = (props) => {
  const { sendRequest, setLoadingMode, loading } = useHttpReq();
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreviewUrl, setProfilePreviewUrl] = useState<string>("");
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    id: props.author._id,
    name: props.author.name,
    bio: props.author.bio,
    work: props.author.work,
    profilePic: props.author.profilePic,
  });

  useEffect(() => {
    if (profileFile) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        setProfilePreviewUrl(reader.result as string);
        setIsUploadingImage(true);
        const uploadedImageUrl = await uploadImage(reader.result as string);
        setFormData((prev) => ({ ...prev, profilePic: uploadedImageUrl }));
        setIsUploadingImage(false);
      };

      reader.readAsDataURL(profileFile);
    }
  }, [profileFile]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingMode("OnGoing");
    try {
      await sendRequest("/api/admin/author", {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      alert("Profile updated successfully");
    } catch (error) {
      alert("Error on updating profile, try again later");
    } finally {
      setLoadingMode("Done");
    }
  };

  return (
    <div className="px-2 pt-2 flex flex-col">
      <h1 className="text-lg font-bold font-ralway">Edit Your Profile</h1>
      <div className="mx-auto flex flex-col items-center mt-10">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <label htmlFor="profile-pic" className="cursor-pointer">
            <div
              className={clsx(
                "size-32 min-[650px]:size-48 transition-300 border border-dashed rounded-full border-gray-400 relative flex flex-col justify-center items-center overflow-hidden",
                {
                  "animate-pulse": isUploadingImage,
                }
              )}
            >
              <Image
                src={profileFile ? profilePreviewUrl! : props.author.profilePic}
                alt="admins profile photo"
                height={300}
                width={300}
                className="size-full object-cover"
              />
            </div>
            <input
              type="file"
              name="profile-pic"
              id="profile-pic"
              hidden
              accept="image/*"
              onChange={(e) => {
                setProfileFile(e.target.files![0]);
              }}
            />
          </label>
          <div className="flex flex-col items-start mt-5">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name:
                    e.target.value.trim().length === 0
                      ? props.author.name
                      : e.target.value,
                }))
              }
              className="mt-2 w-64 min-[650px]:w-96 outline-none border-b border-gray-400 font-medium"
              placeholder={props.author.name || "Enter new name"}
            />
          </div>
          <div className="flex flex-col items-start mt-10">
            <label htmlFor="work">Profession</label>
            <input
              type="text"
              name="work"
              id="work"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  work:
                    e.target.value.trim().length === 0
                      ? props.author.work
                      : e.target.value,
                }))
              }
              className="mt-2 w-64 min-[650px]:w-96 outline-none border-b border-gray-400 font-medium"
              placeholder={props.author.work || "Enter new profession"}
            />
          </div>
          <div className="flex flex-col items-start mt-10">
            <label htmlFor="bio">Bio</label>
            <textarea
              name="bio"
              id="bio"
              rows={4}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  bio:
                    e.target.value.trim().length === 0
                      ? props.author.bio
                      : e.target.value,
                }))
              }
              placeholder={props.author.bio || "Write about you"}
              className="mt-2 w-64 min-[650px]:w-96 outline-none border-b border-gray-400 font-medium"
            />
          </div>
          <input
            type="submit"
            className={clsx(
              "mt-10 bg-primary-tints-500 px-6 py-2 rounded-lg cursor-pointer",
              {
                "animate-pulse": loading === "OnGoing",
              }
            )}
          />
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
