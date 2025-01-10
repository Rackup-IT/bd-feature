"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React, { SetStateAction, useCallback } from "react";

import { NavigationItemProps } from "@/interfaces/navigation_item";
import { CiDark, CiLight } from "react-icons/ci";
import { TbError404Off } from "react-icons/tb";
import BDFeatureIcon from "../../../assets/icons/bd-feature.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleDrawer } from "../../store/slices/drawer";
import { toggleTheme } from "../../store/slices/theme";
import RootOverlay from "../overlay/overlay";
import CloseBtn from "./close-btn/close_btn";
import DrawerLink from "./drawer-link/drawer_link";
import EditionList from "./edition-list/edition_list";

interface DrawerProps {
  loading: boolean;
  data: NavigationItemProps[];
  edition: string;
  setSearchInputData: React.Dispatch<SetStateAction<string>>;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Drawer: React.FC<DrawerProps> = (props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const t = useTranslations("drawer");
  const themeMode = useAppSelector((state) => state.theme.themeMode);
  const isDrawerOpen = useAppSelector((state) => state.drawer.isOpen);

  const urlParam: string[] = pathName.split("/");

  return (
    <RootOverlay
      className={clsx(
        "w-screen h-screen bg-background top-0 left-0 pt-2 flex flex-col overflow-y-scroll transform scale-x-0 opacity-0 origin-left transition-300 sm:hidden",
        {
          "scale-x-0 opacity-0": !isDrawerOpen,
          "scale-x-100 opacity-100": isDrawerOpen,
        }
      )}
      useBackdrop={false}
    >
      <div
        className={clsx(
          "w-full flex flex-row justify-between items-center px-5 mt-2 transition-300",
          "min-[400px]:px-12 min-[400px]:mt-6 min-[550px]:px-20"
        )}
      >
        <CloseBtn
          onClick={useCallback(() => dispatch(toggleDrawer(false)), [dispatch])}
        />
        <button
          onClick={() => dispatch(toggleTheme())}
          className="size-7 p-[2px]"
        >
          {themeMode === "light" ? (
            <CiDark className="size-full" />
          ) : (
            <CiLight className="size-full" />
          )}
        </button>
      </div>
      <div className="w-full relative flex flex-col justify-center items-center mt-5">
        <BDFeatureIcon className="h-9" />
        <p className="text-xs mt-2 text-gray-300 dark:text-gray-500 transition-300">
          {t("slogan")}
        </p>
      </div>
      <div
        className={clsx(
          "w-full h-11 px-2 mt-8 relative transition-300",
          "min-[400px]:px-10 min-[550px]:px-20"
        )}
      >
        <input
          type="text"
          name="search"
          id="search"
          placeholder={t("search")}
          onChange={(e) => props.setSearchInputData(e.target.value)}
          onKeyDown={props.handleKeyDown}
          className="w-full h-full outline-none bg-transparent border border-gray-400 dark:border-gray-600 rounded-md p-2 text-sm transition-300"
        />
      </div>
      <div
        className={clsx(
          "flex flex-col w-full pl-2 mt-10",
          "min-[400px]:px-10 min-[550px]:px-20"
        )}
      >
        {!props.loading && props.data ? (
          props.data.map((navigation) => {
            return (
              <DrawerLink
                key={navigation._id}
                href={navigation.value}
                text={navigation.name}
                pathName={`/${urlParam[2]}`}
              />
            );
          })
        ) : props.loading ? (
          <div className="flex flex-col">
            {Array.from({ length: 7 }, (_, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-8 my-2 bg-gray-200 dark:bg-gray-800 animate-pulse"
                />
              );
            })}
          </div>
        ) : (
          <div className="w-full h-32 flex flex-col justify-center items-center">
            <TbError404Off size={60} className="fill-red-500" />
            <p className="text-base font-medium mt-2 text-gray-400">
              {t("no-data")}
            </p>
          </div>
        )}
      </div>
      <EditionList
        edition={`/${urlParam[1]}`}
        onclick={() => router.push(`${urlParam[1] === "gl" ? "/bd" : "/gl"}`)}
        className="mt-10 min-[400px]:px-12 min-[550px]:px-20"
      />
    </RootOverlay>
  );
};

export default Drawer;
