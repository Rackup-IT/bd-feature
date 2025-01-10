import clsx from "clsx";
import { MdError } from "react-icons/md";

interface ErrorSnackbarProps {
  message: string;
  onClose: () => void;
  className?: string;
}

const ErrorSnackBar: React.FC<ErrorSnackbarProps> = (props) => {
  return (
    <div className={clsx(props.className, "fixed top-0 left-0 w-screen z-40")}>
      <div
        className={clsx(
          "w-full flex flex-col bg-gray-200 dark:bg-gray-800",
          "min-[350px]:w-96 min-[350px]:mx-auto"
        )}
      >
        <div className="w-full flex flex-row py-3 px-2">
          <div className="w-1/4 ">
            <MdError className="fill-red-500 size-10" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-start">{props.message}</p>
          </div>
        </div>
        <div className="w-full mt-3 mb-2 flex flex-row justify-center">
          <button
            onClick={props.onClose}
            className="text-base font-medium text-primary-tints-600 dark:text-primary-shades-900 px-10 py-2 active:dark:text-primary-default transition-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorSnackBar;
