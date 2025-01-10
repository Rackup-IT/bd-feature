"use client";

import { memo } from "react";

import clsx from "clsx";

interface TextFieldProps {
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeLabel?: boolean;
  className?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  classNameLabel?: string;
  readOnly?: boolean;
}

const TextField = ({ removeLabel = false, ...props }: TextFieldProps) => {
  return (
    <div className={clsx(props.className, "w-full flex flex-col")}>
      {!removeLabel && (
        <label
          htmlFor={props.label}
          className={clsx(props.classNameLabel, "text-base font-medium")}
        >
          {props.label}
        </label>
      )}
      <input
        type="text"
        name="title"
        id={props.label}
        placeholder={props.placeholder}
        onChange={props.onTextChange}
        value={props.value}
        readOnly={props.readOnly}
        className={clsx(
          "font-ralway font-medium",
          "bg-transparent outline-none border h-11 rounded-lg mt-2 px-2",
          "border-gray-300 dark:border-slate-600",
          "focus:border-primary-tints-300 transition-300",
          "focus:dark:border-primary-shades-500"
        )}
      />
    </div>
  );
};

export default memo(TextField);
