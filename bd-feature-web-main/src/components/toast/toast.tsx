import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect } from "react";

import { FaCircleCheck } from "react-icons/fa6";

interface ToastProps {
  showToast: boolean;
  setShowToast?: Dispatch<SetStateAction<boolean>>;
  message: string;
  className?: string;
  icon?: React.ReactNode;
}

const Toast: React.FC<ToastProps> = (props) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (props.setShowToast) {
      timer = setTimeout(() => {
        props.setShowToast!(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [props.showToast, props, props.setShowToast]);

  return (
    <div
      className={clsx(
        props.className,
        "w-screen fixed left-0 z-40 px-2 transform -translate-y-full flex flex-col items-center justify-center transition-300",

        {
          "top-4 translate-y-0": props.showToast,
          "top-0 -translate-y-full": !props.showToast,
        }
      )}
    >
      <div
        className={clsx(
          "w-full flex flex-row bg-gray-200 dark:bg-gray-800 px-2 py-2 rounded-full items-center",
          "min-[450px]:w-[18rem] sm:w-[22rem]"
        )}
      >
        <div className="mr-2">
          {props.icon ? (
            props.icon
          ) : (
            <FaCircleCheck size={23} className="fill-green-500" />
          )}
        </div>
        <div className="ml-2 text-xs text-start font-medium min-[450px]:text-sm">
          {props.message}
        </div>
      </div>
    </div>
  );
};

export default Toast;
