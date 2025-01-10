import clsx from "clsx";
import { HTMLInputTypeAttribute } from "react";

interface CustomTextFieldProps {
  label: string;
  value?: string;
  placeholder?: string;
  inputType?: HTMLInputTypeAttribute;
  onChange?: (value: string) => void;
  className?: string;
  name?: string;
  inputClassName?: string;
  required?: boolean;
  removeRequiredSign?: boolean;
}

const CustomTextField = ({
  removeRequiredSign = false,
  ...props
}: CustomTextFieldProps) => {
  return (
    <div className={clsx(props.className, "w-full flex flex-col")}>
      <label
        htmlFor={props.name}
        className={clsx("font-semibold text-base relative lg:text-lg", {
          'after:content-["*"] after:text-red-400': !removeRequiredSign,
        })}
      >
        {props.label}
      </label>
      <input
        type={props.inputType || "text"}
        name={props.name}
        id={props.name}
        value={props.value}
        placeholder={props.placeholder || "Aaa"}
        required={props.required}
        onChange={(e) => {
          if (props.onChange) {
            props.onChange(e.target.value);
          } else {
            null;
          }
        }}
        className={clsx(
          props.inputClassName,
          "mt-2 w-full h-10 outline-none border border-gray-400 dark:border-gray-700 bg-transparent px-2 rounded-md font-medium placeholder:text-gray-400 placeholder:dark:text-gray-600"
        )}
      />
    </div>
  );
};

export default CustomTextField;
