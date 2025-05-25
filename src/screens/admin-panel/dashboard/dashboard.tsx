"use client";

import AdminSidePanel from "@/components/admin-panel/side-panel/side_panel";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../../store/hooks";

import LoadingSpinner from "@/components/loading-spinner/loading_spinner";
import { useEffect, useState } from "react";
import useHttpReq, { LoadingMode } from "../../../hooks/api/useApiReq";
import AdminModel from "../../../interfaces/admin";
import { SidePanelButtons } from "../../../store/slices/admin";
import CreatePost from "../create-post/create_post";
import EditProfile from "../edit-profile/edit_profile";
import Home from "../home/home";
import ManageNavigations from "../manage-navigations/manage_navigations";
import ManagePosts from "../manage-posts/manage_posts";

interface DashboardScreenProps {}

const DashboardScreen: React.FC<DashboardScreenProps> = (props) => {
  const {
    sendRequest: getAuthorData,
    response: author,
    loading,
  } = useHttpReq<AdminModel>();
  const selectedTab = useAppSelector((state) => state.admin.selectedTab);
  const router = useRouter();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      router.replace("/admin/auth");
      return;
    }
    setMount(true);
  }, [router]);

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      return;
    }

    const getAuthor = async () => {
      await getAuthorData(`/api/admin/author?token=${adminToken}`, {
        method: "GET",
      });
    };

    getAuthor();
  }, [getAuthorData]);

  if (!mount || loading === LoadingMode.OnGoing) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <LoadingSpinner className="w-9 h-9 fill-primary-default" />
        <h1 className="text-center text-base font-medium animate-pulse mt-2">
          Checking Authentication...
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col min-[500px]:flex-row-reverse">
        <div className="mb-16 mx-1 w-full transition-300">
          {selectedTab === SidePanelButtons.HOME && <Home />}
          {selectedTab === SidePanelButtons.ADD && (
            <CreatePost author={author!} />
          )}
          {selectedTab === SidePanelButtons.POSTS && <ManagePosts />}
          {selectedTab === SidePanelButtons.NAVIGATIONS && (
            <ManageNavigations />
          )}
          {selectedTab === SidePanelButtons.ACCOUNT && (
            <EditProfile author={author!} />
          )}
        </div>

        <div className="fixed z-10 bottom-0 left-0 w-screen min-[500px]:relative min-[500px]:w-fit">
          <AdminSidePanel />
        </div>
      </div>
    </>
  );
};

export default DashboardScreen;
