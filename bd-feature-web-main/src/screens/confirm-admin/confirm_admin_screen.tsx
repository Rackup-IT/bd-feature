"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import LoadingSpinner from "@/components/loading-spinner/loading_spinner";
import useHttpRequest from "../../hooks/api/useApiRequest";

interface ConfirmAdminScreenProps {}

const ConfirmAdminScreen: React.FC<ConfirmAdminScreenProps> = (props) => {
  const { sendRequest, data, loading } = useHttpRequest<string>();
  const searchParams = useSearchParams();

  useEffect(() => {
    sendRequest("/api/admin/auth", {
      method: "PUT",
      body: JSON.stringify({ token: searchParams.get("token") }),
    });
  }, [sendRequest, searchParams]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <LoadingSpinner className="w-8 h-8 fill-primary-default" />
        <p className="mt-4 font-semibold animate-pulse">Checking Infoo...</p>
      </div>
    );
  }

  if (data) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h1 className="text-lg font-bold text-center">{data}</h1>
        <Link
          href={"/"}
          className="bg-primary-tints-400 dark:bg-primary-shades-700 px-6 py-2 rounded-full mt-4"
        >
          Go To Home
        </Link>
      </div>
    );
  }
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-lg font-bold">Please Wait...</h1>
    </div>
  );
};

export default ConfirmAdminScreen;
