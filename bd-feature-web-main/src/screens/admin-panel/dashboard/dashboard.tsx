"use client";

import AdminSidePanel from "@/components/admin-panel/side-panel/side_panel";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../../store/hooks";

import LoadingSpinner from "@/components/loading-spinner/loading_spinner";
import { useEffect, useState } from "react";
import { SidePanelButtons } from "../../../store/slices/admin";
import CreatePost from "../create-post/create_post";
import Home from "../home/home";
import ManageNavigations from "../manage-navigations/manage_navigations";
import ManagePosts from "../manage-posts/manage_posts";

interface DashboardScreenProps {}

const DashboardScreen: React.FC<DashboardScreenProps> = (props) => {
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

  if (!mount) {
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
          {selectedTab === SidePanelButtons.ADD && <CreatePost />}
          {selectedTab === SidePanelButtons.POSTS && <ManagePosts />}
          {selectedTab === SidePanelButtons.NAVIGATIONS && (
            <ManageNavigations />
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
