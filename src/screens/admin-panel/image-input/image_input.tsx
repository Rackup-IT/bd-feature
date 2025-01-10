"use client";

import clsx from "clsx";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import { PiImageSquareThin } from "react-icons/pi";

interface ImageInputProps {
  className?: string;
  onChange: (file: File) => void;
  setImage: Dispatch<SetStateAction<string | null>>;
  image: string;
}

const ImageInput: React.FC<ImageInputProps> = (props) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    props.onChange(file!);

    const reader = new FileReader();
    reader.onloadend = () => {
      props.setImage(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={clsx(props.className, "w-full flex flex-col")}>
      <label htmlFor="thumbnail" className="font-medium text-base">
        Upload Thumbnail Image
      </label>
      <div className="w-full h-44 mt-2">
        <label htmlFor="thumbnail" className="w-full h-full">
          <div
            className={clsx(
              "w-full h-full border border-dashed rounded-md flex flex-col items-center justify-center relative ohverflow-hidden",
              "border-slate-300",
              "dark:border-slate-600"
            )}
          >
            {props.image === null ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <PiImageSquareThin
                  size={45}
                  className="fill-slate-400 dark:fill-slate-600"
                />
                <p
                  className={clsx(
                    "mt-2 text-sm font-medium font-ralway",
                    "text-slate-400",
                    "dark:text-slate-600"
                  )}
                >
                  Click to upload
                </p>
              </div>
            ) : (
              <Image
                src={props.image}
                alt="Thumbnail"
                width={200}
                height={100}
                priority
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageInput;
