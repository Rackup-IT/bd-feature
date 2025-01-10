"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { uploadImage } from "@/app/actions";
import CustomTextField from "@/components/custom-text-field/custom_text_field";
import LoadingSpinner from "@/components/loading-spinner/loading_spinner";
import { LuImagePlus } from "react-icons/lu";
import BdFeatureLogo from "../../../../../assets/icons/bd-feature.svg";
import useHttpRequest, { LoadingMode } from "../../../../hooks/api/useApiReq";

const FormWithLogo: React.FC = (props) => {
  const router = useRouter();
  const { sendRequest, loading, error, setLoadingMode, setErrorMessage } =
    useHttpRequest<{ adminToken: string }>();
  const [isLogIn, setIsLogIn] = useState<boolean>(true);
  const [profilePicPreviewUrl, setProfileImagePreviewUrl] =
    useState<string>("");
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [isSendedMail, setIsSendedMail] = useState<boolean>(false);

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    setErrorMessage(null);
    if (isLogIn) {
      const logInResponse = await sendRequest(
        `/api/admin/auth?email=${formData.get("email")}&password=${formData.get(
          "password"
        )}`,
        {
          method: "GET",
        }
      );
      if (logInResponse) {
        router.push("/admin/dashboard", { scroll: false });
        localStorage.setItem("adminToken", logInResponse.adminToken);
      }
    } else {
      try {
        setLoadingMode(LoadingMode.OnGoing);
        const profilePicUrl = await uploadImage(profilePicPreviewUrl);
        formData.append("profile-pic", profilePicUrl);
      } catch (error) {
        setErrorMessage(
          Error(
            JSON.stringify({
              gl: "Failed to upload image! Double check are you added image or not!",
              bd: "",
            })
          )
        );
        setLoadingMode(LoadingMode.Done);
        return;
      }
      const signUpResponse = await sendRequest("/api/admin/auth", {
        method: "POST",
        body: formData,
      });
      if (signUpResponse != null) {
        setIsSendedMail(true);
      } else {
        setIsSendedMail(false);
      }
    }
  };

  useEffect(() => {
    if (profileImageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImagePreviewUrl(reader.result as string);
      };

      reader.readAsDataURL(profileImageFile);
    }
  }, [profileImageFile]);

  if (isSendedMail) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <p className="text-center font-semibold">
          Sended mail to the root admin! Please wait until admin approved!. Once
          admin approved your request you will be notified by email!
        </p>
        <Link
          href={"/gl"}
          className="mt-4 bg-primary-tints-500 rounded-md px-6 py-2 font-semibold"
        >
          GO TO Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col px-2 transition-300 overflow-y-scroll mt-10">
      <BdFeatureLogo className="h-10 min-h-14 min-[450px]:h-12 md:h-16 mx-auto" />
      <h1 className="text-center text-base font-semibold mt-6">
        {isLogIn ? "Log In with Your Admin Credentials" : "Register as Admin"}
      </h1>
      {error && (
        <div className="w-full flex flex-col justify-center items-center my-4">
          <section className="bg-red-600 px-4 py-2 rounded-md font-medium">
            {JSON.parse(error.message).gl}
          </section>
        </div>
      )}
      <form
        onSubmit={onFormSubmit}
        action="submit"
        className="flex flex-col min-[450px]:w-96 min-[450px]:mx-auto"
      >
        {!isLogIn && (
          <label htmlFor="profile-pic" className="cursor-pointer mx-auto mt-4">
            <div className="size-32 border border-dashed rounded-full border-gray-400 flex flex-col items-center justify-center relative overflow-hidden">
              {profilePicPreviewUrl ? (
                <Image
                  src={profilePicPreviewUrl}
                  alt="Profile Photo Preview"
                  height={300}
                  width={300}
                  className="w-full h-full object-cover"
                />
              ) : (
                <LuImagePlus className="size-10 opacity-40" />
              )}
            </div>
            <input
              type="file"
              name="profile-pic"
              id="profile-pic"
              hidden
              accept="image/*"
              onChange={(e) => setProfileImageFile(e.target.files![0])}
            />
          </label>
        )}
        <CustomTextField
          label="Email"
          placeholder="Enter email"
          className="mt-10"
          name="email"
          inputClassName="bg-transparent"
        />
        {!isLogIn && (
          <CustomTextField
            label="Name"
            placeholder="Enter full name"
            className="mt-6"
            name="name"
            inputClassName="bg-transparent"
          />
        )}

        {!isLogIn && (
          <CustomTextField
            label="Work Profession"
            placeholder="Enter work profession"
            className="mt-6"
            name="work"
            inputClassName="bg-transparent"
          />
        )}
        {!isLogIn && (
          <div className="mt-6">
            <label
              htmlFor="bio"
              className="font-semibold text-base relative lg:text-lg"
            >
              Write About you
            </label>
            <textarea
              name="bio"
              id="bio"
              rows={5}
              className="mt-2 w-full outline-none border border-gray-400 dark:border-gray-700 bg-transparent px-2 rounded-md font-medium placeholder:text-gray-400 pt-2"
              placeholder="Write here..."
            />
          </div>
        )}
        <CustomTextField
          label="Password"
          placeholder="password"
          className="mt-6"
          name="password"
          inputType="password"
          inputClassName="bg-transparent"
        />
        {!isLogIn && (
          <CustomTextField
            label="Confirm password"
            placeholder="Repeat password"
            className="mt-6"
            name="confirm-password"
            inputType="password"
            inputClassName="bg-transparent"
          />
        )}
        <div className="w-full flex flex-row justify-center mt-10">
          {loading === LoadingMode.OnGoing ? (
            <LoadingSpinner className="size-10 fill-primary-tints-600" />
          ) : (
            <input
              type="submit"
              value={isLogIn ? "Log In" : "Register"}
              className="bg-primary-tints-600 dark:bg-primary-shades-700 font-medium text-base px-8 py-2 rounded-lg"
            />
          )}
        </div>
      </form>
      <div className="w-full text-center mt-4 mb-4">
        <p className="text-sm font-medium">
          {isLogIn ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogIn((prev) => !prev)}
            className="text-primary-default"
          >
            {isLogIn ? "Register Now!" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default FormWithLogo;
