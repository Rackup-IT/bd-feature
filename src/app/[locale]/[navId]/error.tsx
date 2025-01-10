"use client"; // Error components must be Client Components

import { usePathname } from "next/navigation";
import { Link } from "../../../i18n/routing";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathName = usePathname();

  return (
    <div className="w-screen h-[80vh] flex flex-col justify-center items-center">
      <h2 className="text-lg font-semibold text-center">
        {pathName.split("/")[1] === "gl"
          ? `Data Not Found For ${pathName.split("/")[2]}`
          : `${pathName.split(" / ")[2]} এর জন্য কোন তথ্য পাওয়া যায়নি`}
      </h2>
      <div className="flex flex-col">
        <button
          className="mt-6 bg-green-200 px-6 py-2 rounded-md"
          onClick={() => reset()}
        >
          Try again
        </button>
        <Link
          href={"/"}
          className="mt-6 bg-primary-tints-300 px-6 py-2 rounded-md"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
