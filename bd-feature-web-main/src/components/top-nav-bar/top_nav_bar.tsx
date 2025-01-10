"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Link as I18Link } from "../../i18n/routing";

import { NavigationItemProps } from "@/interfaces/navigation_item";
import clsx from "clsx";
import { AiFillHome } from "react-icons/ai";
import { CiDark, CiLight, CiLogin } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import BDFeature from "../../../public/icons/bd-feature.svg";
import useHttpRequest from "../../hooks/api/useApiRequest";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUser } from "../../store/slices/auth";
import { toggleDrawer } from "../../store/slices/drawer";
import { initialThemeLoader, toggleTheme } from "../../store/slices/theme";
import Drawer from "../drawer/drawer";

interface TopNavBarProps {
  edition: string;
}

const TopNavBar: React.FC<TopNavBarProps> = (props) => {
  const t = useTranslations("top-nav-bar");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { sendRequest, loading, error } = useHttpRequest();
  const {
    sendRequest: sendNavRequest,
    loading: navLoading,
    data: navData,
  } = useHttpRequest();
  const authData = useAppSelector((state) => state.auth);
  const themeMode = useAppSelector((state) => state.theme.themeMode);

  const [showError, setShowError] = useState<boolean>(false);
  const [showLogOutBtn, setShowLogOutBtn] = useState<boolean>(false);
  const [searchInputData, setSearchInputData] = useState<string>("");

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && searchInputData.length > 0) {
      router.push(`/${props.edition}/search/${searchInputData}`);
      dispatch(toggleDrawer(false));
    }
  };

  useEffect(() => {
    dispatch(initialThemeLoader());
  }, [dispatch]);

  useEffect(() => {
    const autoLogIn = async () => {
      try {
        const result = await sendRequest(
          `/api/auth/auto?token=${localStorage.getItem("user-token")}`,
          { method: "GET" }
        );
        dispatch(setUser({ isAuthenticated: true, user: result }));
      } catch (error) {
        setShowError(true);
        console.log(error);
      }
    };

    if (localStorage.getItem("user-token")) {
      autoLogIn();
    }
  }, [dispatch, sendRequest]);

  useEffect(() => {
    const getNavigations = async () => {
      try {
        sendNavRequest(`/api/admin/navigation?edition=${props.edition}`, {
          method: "GET",
        });
      } catch (error) {
        console.log(error);
      }
    };
    getNavigations();
  }, [sendNavRequest, props.edition]);

  return (
    <>
      <Drawer
        edition={props.edition}
        loading={navLoading}
        data={navData as NavigationItemProps[]}
        handleKeyDown={handleKeyDown}
        setSearchInputData={setSearchInputData}
      />
      {showError && (
        <div className="w-screen h-screen bg-gray-300 bg-opacity-85 fixed top-0 left-0 z-40 flex flex-col items-center justify-center px-2">
          <div className="w-full drop-shadow-lg bg-background rounded-lg py-2 px-2">
            <p className="text-center font-medium">
              {JSON.parse(error?.message!)[props.edition]}
            </p>
            <div className="w-full flex flex-row justify-around items-center mt-6">
              <button
                onClick={() => setShowError(false)}
                className="bg-primary-tints-500 dark:bg-primary-shades-700 px-6 py-2 rounded-full"
              >
                Close
              </button>
              <Link
                href={"/auth/user"}
                onClick={() => setShowError(false)}
                className="bg-green-300 dark:bg-green-700 px-6 py-2 rounded-full"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      )}
      <nav className="w-screen h-16 bg-background drop-shadow-sm fixed top-0 left-0 z-20 flex flex-row justify-between items-center px-2 transition-300 sm:hidden">
        <button
          className="h-full px-2 flex flex-col items-center justify-center"
          onClick={() => dispatch(toggleDrawer(true))}
        >
          <div className="w-6 h-[1px] bg-foreground transition-300"></div>
          <div className="w-6 h-[1px] bg-foreground mt-2 transition-300"></div>
        </button>
        <Link
          href={"/"}
          className="h-full flex flex-col justify-center items-center"
        >
          <BDFeature className="h-8 mb-2" />
        </Link>
        {!authData.isAuthenticated ? (
          <I18Link href={"/auth/user"} className="h-full px-2">
            <div className="h-full flex flex-col justify-center items-center">
              <CiLogin
                size={27}
                className={clsx("h-s", {
                  "animate-pulse": loading,
                })}
              />
            </div>
          </I18Link>
        ) : (
          <div
            onClick={() => setShowLogOutBtn((prev) => !prev)}
            className="h-8 w-8 rounded-full bg-primary-default flex flex-col items-center justify-center font-bold"
          >
            {authData.user?.name.split("")[0]}
            {showLogOutBtn && (
              <button
                onClick={() => {
                  localStorage.removeItem("user-token");
                  dispatch(setUser({ isAuthenticated: false, user: null }));
                }}
                className="absolute -bottom-8 right-0 font-medium bg-background drop-shadow-xl px-4 py-2 rounded-e-xl overflow-hidden text-red-600"
              >
                Log Out
              </button>
            )}
          </div>
        )}
      </nav>
      <nav className="w-screen flex flex-col items-center max-sm:hidden">
        {/* Top Notchs  */}
        <div className="dynamic-width-for-screens max-lg:px-2 h-12 border-b-[1px] border-gray-200 dark:border-gray-800 flex flex-row items-center justify-between">
          <section className="flex flex-row items-center">
            <Link href={"/"}>
              <AiFillHome className="w-5 h-5 fill-gray-600 dark:fill-gray-400" />
            </Link>
            <div className="flex flex-row items-center relative mx-7">
              <p className="text-sm font-normal">{t("edition")} : </p>
              <div className="text-sm text-primary-default font-medium relative ml-2 group hover:cursor-pointer flex flex-row items-center">
                {props.edition === "gl" ? "Global" : "বাংলাদেশ"}
                <div className="absolute top-0 -left-20 pt-8 z-10">
                  <ul className="transform origin-top h-0 scale-y-0 bg-gray-100 dark:bg-gray-800 flex flex-col text-gray-600 dark:text-gray-200 z-10 rounded-b-sm drop-shadow-2xl pr-5 group-hover:scale-y-100  group-hover:h-min transition-300">
                    <li className="px-4 py-2 my-2 hover:text-primary-default">
                      <Link href={"/gl"}>Global</Link>
                    </li>
                    <li className="px-4 py-2 my-2 hover:text-primary-default">
                      <Link href={"/bd"}>বাংলাদেশ</Link>
                    </li>
                  </ul>
                </div>
                <IoIosArrowDown className="w-4 h-4 ml-2 fill-gray-600 transform group-hover:rotate-180 transition-300" />
              </div>
            </div>
            <I18Link href={"/newsletter/subscribe"} className="text-sm">
              {t("get-newsletter")}
            </I18Link>
          </section>
          <section className="flex flex-row items-center mr-4 md:mr-0">
            <I18Link href={"/auth/user"} className="text-sm">
              {t("sign-up-as-reader")}
            </I18Link>
            <span className="w-5"></span>
            <I18Link href={"/auth/user"} className="text-sm">
              {t("sign-in")}
            </I18Link>
            <button
              onClick={() => dispatch(toggleTheme())}
              className="size-7 p-[2px] ml-2"
            >
              {themeMode === "light" ? (
                <CiDark className="size-full" />
              ) : (
                <CiLight className="size-full" />
              )}
            </button>
          </section>
        </div>
        {/* Logo & Search Bar  */}
        <div className="dynamic-width-for-screens flex flex-row items-center justify-between mt-4 max-lg:px-2">
          <div className="flex flex-col">
            <div className="h-16">
              <BDFeature className="h-full" />
            </div>
            <p className="text-xs mt-4">{t("company-slogan")}</p>
          </div>
          <input
            type="text"
            name="search"
            id="search"
            className="border-[1px] dark:border-gray-600 border-gray-300 bg-transparent px-2 py-1 w-60 outline-none focus:border-gray-600 focus:dark:border-gray-400 lg:w-80 2xl:w-96"
            placeholder={t("search")}
            onChange={(e) => setSearchInputData(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </nav>
    </>
  );
};

export default TopNavBar;
