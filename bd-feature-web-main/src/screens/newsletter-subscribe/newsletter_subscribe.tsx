"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import CustomTextField from "@/components/custom-text-field/custom_text_field";
import LoadingSpinner from "@/components/loading-spinner/loading_spinner";
import { MdError } from "react-icons/md";
import useHttpRequest from "../../hooks/api/useApiRequest";
import checkMail from "../../utils/check_mail/check_mail";

interface NewsletterSubscribeScreenProps {
  locale: string;
}

const NewsletterSubscribeScreen: React.FC<NewsletterSubscribeScreenProps> = (
  props
) => {
  const t = useTranslations("newsletter-screen");
  const router = useRouter();
  const { sendRequest, loading, error } = useHttpRequest();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const handleNewsletterPostReq = async () => {
    try {
      await sendRequest("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({
          email: inputText,
          subjects: selectedOptions,
        }),
      });
      router.push(`/${props.locale}/newsletter/subscribe/confirmed`);
    } catch (error) {
      setShowError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      selectedOptions.length === 0 ||
      inputText.length === 0 ||
      !checkMail(inputText)
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [selectedOptions, inputText]);

  return (
    <>
      {showError && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-gray-200 bg-opacity-90 z-10 flex flex-col px-2 items-center justify-center">
          <div className="w-full bg-white drop-shadow-xl rounded-lg flex flex-col justify-center items-center relative overflow-hidden px-4 py-4">
            <MdError className="size-9 fill-red-500" />
            <p className="mt-5 text-center font-medium">
              {JSON.parse(error?.message!)[props.locale]}
            </p>
            <div className="w-full flex flex-col items-center justify-center mt-3">
              <button
                onClick={() => setShowError(false)}
                className="text-lg font-medium text-primary-default px-10 py-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={clsx(
          "w-screen px-2 flex flex-col mt-20 mb-10",
          "sm:w-[30rem] md:w-[40rem] sm:mx-auto"
        )}
      >
        <h1 className="text-xl font-ralway font-extrabold sm:text-2xl">
          {t("header")}
        </h1>
        <CustomTextField
          label={t("email")}
          placeholder={t("email-placeholder")}
          className="mt-4"
          onChange={(e) => setInputText(e)}
        />
        <p className="text-sm text-gray-400 mt-1">{t("input-bottom-text")}</p>
        <ul className="mt-6 flex flex-col w-full">
          {props.locale === "gl"
            ? GlobalCardData.map((item, index) => {
                return (
                  <Card
                    key={index}
                    label={item.title}
                    description={item.description}
                    onCheck={(e) => {
                      if (selectedOptions.includes(e.target.value)) {
                        setSelectedOptions((prev) => {
                          let updatedData = [...prev];
                          const newList = updatedData.filter(
                            (p) => p !== e.target.value
                          );
                          updatedData = newList;
                          return updatedData;
                        });
                      } else {
                        setSelectedOptions((prev) => [...prev, e.target.value]);
                      }
                    }}
                  />
                );
              })
            : BDCardData.map((item, index) => {
                return (
                  <Card
                    key={index}
                    label={item.title}
                    description={item.description}
                    onCheck={(e) => {
                      if (selectedOptions.includes(e.target.value)) {
                        setSelectedOptions((prev) => {
                          let updatedData = [...prev];
                          const newList = updatedData.filter(
                            (p) => p !== e.target.value
                          );
                          updatedData = newList;
                          return updatedData;
                        });
                      } else {
                        setSelectedOptions((prev) => [...prev, e.target.value]);
                      }
                    }}
                  />
                );
              })}
        </ul>
        <div className="w-full flex flex-row items-start">
          {loading ? (
            <LoadingSpinner className="w-8 h-8 fill-primary-default" />
          ) : (
            <button
              className={clsx("px-6 py-2 rounded-md", {
                "bg-gray-200 text-gray-300 dark:bg-gray-800 dark:text-gray-500 opacity-80":
                  !isValid,
                "bg-primary-tints-600 dark:bg-primary-shades-700 text-white":
                  isValid,
              })}
              disabled={!isValid}
              onClick={handleNewsletterPostReq}
            >
              {t("subscribe")}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsletterSubscribeScreen;

const Card = ({
  label,
  description,
  onCheck,
}: {
  label: string;
  description: string;
  onCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <li className="w-full flex flex-col mb-6 sm:mb-12">
      <div className="flex flex-row items-center">
        <input
          type="checkbox"
          id={label}
          value={label}
          className="size-5"
          onChange={onCheck}
        />
        <label htmlFor={label} className="text-lg font-bold ml-2">
          {label}
        </label>
      </div>
      <p className="text-base font-medium mt-2">{description}</p>
    </li>
  );
};

const GlobalCardData = [
  {
    title: "Global",
    description:
      "Highlights twice each week from across The Conversation's global network.",
  },
  {
    title: "Global Economy & Business",
    description:
      "A weekly curated summary of the week's briefings from academic experts straight to your inbox, each Wednesday, helping you keep up with news from around the world.",
  },
  {
    title: "Imagine",
    description:
      "Get a better understanding of climate action with one explainer a week, sourced from researchers who write for The Conversation.",
  },
  {
    title: "Weekly Highlights",
    description:
      "Want just the best of The BD-Feature U.S.? Get a weekly email with our readers’ and editors’ favorites each Sunday.",
  },
];
const BDCardData = [
  {
    title: "গ্লোবাল",
    description:
      "কথোপকথনের বিশ্বব্যাপী নেটওয়ার্ক থেকে প্রতি সপ্তাহে দুবার হাইলাইট করে।",
  },
  {
    title: "বৈশ্বিক অর্থনীতি এবং ব্যবসা",
    description:
      "একাডেমিক বিশেষজ্ঞদের কাছ থেকে সপ্তাহের ব্রিফিংয়ের একটি সাপ্তাহিক সংক্ষিপ্ত সারাংশ সরাসরি আপনার ইনবক্সে, প্রতি বুধবার, যা আপনাকে সারা বিশ্ব থেকে খবর পেতে সাহায্য করে।",
  },
  {
    title: "কল্পনা করুন",
    description:
      "প্রতি সপ্তাহে একজন ব্যাখ্যাকারীর সাথে জলবায়ু কর্ম সম্পর্কে আরও ভাল ধারণা পান, যা কথোপকথনের জন্য লেখেন এমন গবেষকদের কাছ থেকে নেওয়া।",
  },
  {
    title: "সাপ্তাহিক হাইলাইট",
    description:
      "বিডি-ফিচার ইউ.এস.-এর সেরাটা চান? প্রতি রবিবার আমাদের পাঠক এবং সম্পাদকদের পছন্দের সাথে একটি সাপ্তাহিক ইমেল পান।",
  },
];
