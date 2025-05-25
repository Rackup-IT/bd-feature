"use client";
import clsx from "clsx";

import { BiSolidAddToQueue } from "react-icons/bi";
import { FaList } from "react-icons/fa6";
import { MdManageAccounts } from "react-icons/md";
import { PiNewspaperFill } from "react-icons/pi";
import { RiHome5Fill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setSelectedTab, SidePanelButtons } from "../../../store/slices/admin";

interface AdminSidePanelProps {}

const AdminSidePanel: React.FC<AdminSidePanelProps> = (props) => {
  const dispatch = useAppDispatch();
  const selectedTab = useAppSelector((state) => state.admin.selectedTab);

  const onButtonClick = (tab: SidePanelButtons) => {
    dispatch(setSelectedTab(tab));
  };

  return (
    <div
      className={clsx(
        "w-full h-14 flex flex-row items-center justify-around px-2 bg-background",
        "min-[500px]:flex-col min-[500px]:w-14 min-[500px]:h-screen min-[500px]:justify-start min-[500px]:mt-11"
      )}
    >
      <button
        onClick={() => onButtonClick(SidePanelButtons.HOME)}
        className="w-14 h-full min-[500px]:h-fit flex flex-row justify-center items-center min-[500px]:py-4"
      >
        <div className="size-7">
          <RiHome5Fill
            className={clsx("size-full transition-300", {
              "fill-primary-default dark:fill-primary-default":
                selectedTab === SidePanelButtons.HOME,
              "fill-slate-400 dark:fill-slate-700":
                selectedTab !== SidePanelButtons.HOME,
            })}
          />
        </div>
      </button>
      <button
        onClick={() => onButtonClick(SidePanelButtons.ADD)}
        className="w-14 h-full min-[500px]:h-fit flex flex-row justify-center items-center min-[500px]:py-4"
      >
        <div className="size-7 ">
          <BiSolidAddToQueue
            className={clsx("size-full transition-300", {
              "fill-primary-default dark:fill-primary-default":
                selectedTab === SidePanelButtons.ADD,
              "fill-slate-400 dark:fill-slate-700":
                selectedTab !== SidePanelButtons.ADD,
            })}
          />
        </div>
      </button>
      <button
        onClick={() => onButtonClick(SidePanelButtons.POSTS)}
        className="w-14 h-full min-[500px]:h-fit flex flex-row justify-center items-center min-[500px]:py-4"
      >
        <div className="size-6 ">
          <PiNewspaperFill
            className={clsx("size-full transition-300", {
              "fill-primary-default dark:fill-primary-default":
                selectedTab === SidePanelButtons.POSTS,
              "fill-slate-400 dark:fill-slate-700":
                selectedTab !== SidePanelButtons.POSTS,
            })}
          />
        </div>
      </button>
      <button
        onClick={() => onButtonClick(SidePanelButtons.NAVIGATIONS)}
        className="w-14 h-full min-[500px]:h-fit flex flex-row justify-center items-center min-[500px]:py-4"
      >
        <div className="size-6 ">
          <FaList
            className={clsx("size-full transition-300", {
              "fill-primary-default dark:fill-primary-default":
                selectedTab === SidePanelButtons.NAVIGATIONS,
              "fill-slate-400 dark:fill-slate-700":
                selectedTab !== SidePanelButtons.NAVIGATIONS,
            })}
          />
        </div>
      </button>
      <button
        onClick={() => onButtonClick(SidePanelButtons.ACCOUNT)}
        className="w-14 h-full min-[500px]:h-fit flex flex-row justify-center items-center min-[500px]:py-4"
      >
        <div className="size-6 ">
          <MdManageAccounts
            className={clsx("size-full transition-300", {
              "fill-primary-default dark:fill-primary-default":
                selectedTab === SidePanelButtons.ACCOUNT,
              "fill-slate-400 dark:fill-slate-700":
                selectedTab !== SidePanelButtons.ACCOUNT,
            })}
          />
        </div>
      </button>
    </div>
  );
};

export default AdminSidePanel;
