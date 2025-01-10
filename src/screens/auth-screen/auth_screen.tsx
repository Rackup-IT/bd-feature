"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Link } from "../../i18n/routing";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import CustomTextField from "@/components/custom-text-field/custom_text_field";
import LoadingSpinner from "@/components/loading-spinner/loading_spinner";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import useHttpRequest from "../../hooks/api/useApiRequest";
import { setUser } from "../../store/slices/auth";

interface AuthScreenProps {
  locale: string;
}

const AuthScreen: React.FC<AuthScreenProps> = (props) => {
  const t = useTranslations("auth-screen");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { sendRequest, error, loading } = useHttpRequest();
  const [isLogIn, setIsLogIn] = useState<boolean>(true);
  const edition: string = props.locale;
  const isLogedIn = useAppSelector((state) => state.auth.isAuthenticated);

  const scrollToForm = () => {
    document.getElementById("targetForm")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("edition", edition);
    try {
      if (!isLogIn) {
        await sendRequest("/api/auth", { method: "POST", body: formData });
        router.push(`/${edition}/auth/done`);
      } else {
        const result = await sendRequest(
          `/api/auth?email=${formData.get("email")}&password=${formData.get(
            "password"
          )}`,
          {
            method: "GET",
          }
        );
        localStorage.setItem("user-token", result.token);
        const authResult = await sendRequest(
          `/api/auth/auto?token=${result.token}`,
          { method: "GET" }
        );
        dispatch(setUser({ isAuthenticated: true, user: authResult }));
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLogedIn) {
    router.replace("/");
  }

  return (
    <div
      className={clsx(
        "w-screen mt-20 px-2 flex flex-col relative overflow-hidden mb-5",
        "min-[400px]:w-[23rem] min-[500px]:w-[26rem] sm:w-[30rem] min-[400px]:mx-auto",
        "md:w-[40rem] lg:w-[50rem]"
      )}
    >
      {error && (
        <div className="w-full bg-red-400 fixed top-0 left-0 z-10 mt-16 overflow-hidden flex flex-col justify-center items-center sm:hidden">
          <p className="line-clamp-2 px-2 py-1 font-medium">
            {JSON.parse(error.message)[edition]}
          </p>
        </div>
      )}

      <h1
        className={clsx(
          "w-full text-center font-semibold text-xl transition-300",
          "sm:text-2xl sm:font-bold lg:text-3xl"
        )}
      >
        {isLogIn ? t("header-sign-up") : t("header-log-in")}
      </h1>
      <button
        onClick={() => {
          setIsLogIn((prev) => !prev);
          scrollToForm();
        }}
        className={clsx(
          "w-full text-center text-sm underline mt-3",
          "lg:text-base lg:font-medium"
        )}
      >
        {isLogIn ? t("already-have-account") : t("dont-have-account")}
      </button>
      {error && (
        <div className="w-full bg-red-400 dark:bg-red-700 py-2 rounded-sm mt-2 px-2 flex flex-col items-center justify-center font-semibold max-sm:hidden animate-bounce">
          {JSON.parse(error.message)[edition]}
        </div>
      )}

      <div
        className={clsx(
          "w-full flex flex-col",
          "md:flex-row-reverse  md:items-start md:mt-20"
        )}
      >
        <ul
          className={clsx(
            "w-ful px-2 flex flex-col mt-10",
            "md:mt-0 md:w-[18rem] lg:w-1/2"
          )}
        >
          <li className="w-full mt-4 md:mt-0">
            <button className="w-full flex flex-row items-center border border-gray-500 px-2 py-2 rounded-md">
              <FaXTwitter className="min-h-9 min-w-9 lg:min-h-11 lg:min-w-11 bg-black fill-white p-2 rounded-full" />
              <span className="text-base text-start font-bold ml-4 lg:text-xl">
                {t("sign-in-with-x")}
              </span>
            </button>
          </li>
          <li className="w-full mt-4">
            <button className="w-full flex flex-row items-center border border-gray-500 px-2 py-2 rounded-md">
              <FaFacebookF className="min-h-9 min-w-9 bg-blue-600 fill-white p-2 rounded-full  lg:min-h-11 lg:min-w-11" />
              <span className="text-base text-start font-bold ml-4 lg:text-xl">
                {t("sign-in-with-fb")}
              </span>
            </button>
          </li>
          <li className="w-full mt-4">
            <button className="w-full flex flex-row items-center border border-gray-500 px-2 py-2 rounded-md">
              <FaLinkedinIn className="min-h-9 min-w-9 bg-blue-500 fill-white p-2 rounded-full  lg:min-h-11 lg:min-w-11" />
              <span className="text-base text-start font-bold ml-4 lg:text-xl">
                {t("sign-in-with-in")}
              </span>
            </button>
          </li>
          <li className="w-full mt-4">
            <button className="w-full flex flex-row items-center border border-gray-500 px-2 py-2 rounded-md">
              <FcGoogle className="min-h-9 min-w-9 bg-transparent fill-white p-2 rounded-full  lg:min-h-11 lg:min-w-11" />
              <span className="text-base text-start font-bold ml-4 lg:text-xl">
                {t("sign-in-with-gg")}
              </span>
            </button>
          </li>
        </ul>

        <div className="w-full flex flex-row md:flex-col md:w-0 md:mx-12 mt-10 mb-5 items-center transform">
          <span className="w-1/2 h-[1px] md:w-[1px] md:h-32 bg-gray-300"></span>
          <span className="text-center mx-4 md:mx-0 md:my-4 text-sm font-medium text-gray-500">
            {t("or")}
          </span>
          <span className="w-1/2 h-[1px] md:w-[1px] md:h-32 bg-gray-300"></span>
        </div>

        <form
          id="targetForm"
          action="submit"
          onSubmit={handleSubmit}
          className="md:w-[17rem] lg:w-1/2"
        >
          <CustomTextField
            label={t("email")}
            name="email"
            placeholder={t("email-placeholder")}
            required={true}
          />
          <CustomTextField
            className="mt-5"
            label={t("password")}
            name="password"
            placeholder={t("password-placeholder")}
            inputType="password"
            required={true}
          />
          {!isLogIn && (
            <CustomTextField
              className="mt-5"
              label={t("full-name")}
              name="name"
              placeholder={t("full-name-placeholder")}
              required={true}
            />
          )}
          {!isLogIn && (
            <CustomTextField
              className="mt-5"
              label={t("job-title")}
              name="job-title"
              placeholder={t("job-title-placeholder")}
              removeRequiredSign={true}
            />
          )}

          {!isLogIn && (
            <label htmlFor="terms-condition" className="text-sm lg:text-base">
              <input
                type="checkbox"
                name="terms-condition"
                id="terms-condition"
                className="mr-2 mt-5"
                required={true}
              />
              {t("checkbox-text")}{" "}
              <Link
                href={""}
                className="text-gray-600 dark:text-gray-400 lg:text-base"
              >
                {t("terms-and-conditions")}
              </Link>
            </label>
          )}

          <div className="w-full flex flex-row">
            {loading ? (
              <LoadingSpinner className="w-6 h-6 fill-primary-default ml-2 mt-6" />
            ) : (
              <input
                type="submit"
                value={isLogIn ? t("sign-in") : t("sign-up")}
                className={clsx(
                  "mt-8 bg-foreground text-background py-2 rounded-full text-sm font-bold px-6",
                  {
                    "mx-auto": !isLogIn,
                  },
                  "lg:text-base lg:px-10"
                )}
              />
            )}
          </div>
        </form>
      </div>

      <div className="mt-10 flex flex-col">
        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium lg:text-base">
          {t("bottom-text")}{" "}
          <Link href={""} className="text-primary-tints-600">
            {t("read-community-standards")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
