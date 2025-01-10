import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ErrorSnackBar from "@/components/error-snackbar/error_snackbar";
import LoadingSpinner from "@/components/loading-spinner/loading_spinner";
import { NavigationItemProps } from "@/interfaces/navigation_item";
import useHttpRequest from "../../../hooks/api/useApiRequest";
import AddPostDialog from "./comp/add_post_dialog";
import Section from "./comp/section";
import { PageType } from "./interfaces/interfaces";
import { onAddSectionClick } from "./logics/logics";

const Home = () => {
  const router = useRouter();
  const { sendRequest, loading, error } = useHttpRequest();
  const {
    sendRequest: sendNavRequest,
    data: navData,
    loading: navLoading,
    error: navError,
  } = useHttpRequest();

  const [selectedEdition, setSelectedEdition] = useState<string>("gl");
  const [selectedNav, setSelectedNav] = useState<string>("landing-page");
  const [sectionData, setSectionData] = useState<PageType>({
    edition: "gl",
    sections: [],
  });
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number>(0);
  const [closeErrorSnakbar, setCloseErrorSnakbar] = useState<boolean>(false);

  const onPostAddHandler = async () => {
    try {
      await sendRequest(`/api/admin/pages/${selectedNav}`, {
        method: "POST",
        body: JSON.stringify(sectionData),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
    } catch (error) {
      console.error(error);
      setCloseErrorSnakbar(false);
    }
  };

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const result = await sendRequest(
          `/api/admin/pages/${selectedNav}?edition=${selectedEdition}`,
          {
            method: "GET",
          }
        );
        if (!result) {
          setSectionData({ edition: selectedEdition, sections: [] });
          return;
        }
        setSectionData(result);
      } catch (error) {
        setCloseErrorSnakbar(false);
        console.log(error);
      }
    };

    handleFetch();
  }, [selectedEdition, selectedNav, sendRequest]);

  useEffect(() => {
    const handleNavFetch = async () => {
      try {
        await sendNavRequest(
          `/api/admin/navigation?edition=${selectedEdition}`,
          {
            method: "GET",
          }
        );
      } catch (error) {
        console.log(error);
        setCloseErrorSnakbar(false);
      }
    };

    handleNavFetch();
  }, [selectedEdition, sendNavRequest]);

  return (
    <>
      <AddPostDialog
        edition={selectedEdition}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        setSectionData={setSectionData}
        sectionIndex={selectedSectionIndex}
        sectionData={sectionData}
      />
      {(navError || error) && !closeErrorSnakbar && (
        <ErrorSnackBar
          message="Something went wrong! Please try again later"
          onClose={() => setCloseErrorSnakbar(true)}
          className="top-5"
        />
      )}

      <div className="w-full flex flex-col  min-[580px]:w-[30rem] lg:w-full min-[580px]:mx-auto">
        <div className="w-full h-11 bg-background border-b-[1px] border-gray-200 dark:border-gray-700 flex flex-row items-center">
          <button
            onClick={() => setSelectedNav("landing-page")}
            className={clsx("h-full text-sm px-2 transition-300", {
              "text-primary-default font-medium":
                selectedNav === "landing-page",
              "text-gray-400": selectedNav !== "landing-page",
            })}
          >
            Landing Page
          </button>
          {!navLoading && navData ? (
            (navData as NavigationItemProps[]).map((nav) => {
              return (
                <button
                  key={nav._id}
                  onClick={() => setSelectedNav(nav.value)}
                  className={clsx("h-full text-sm px-2 transition-300", {
                    "text-primary-default font-medium":
                      selectedNav === nav.value,
                    "text-gray-400": selectedNav !== nav.value,
                  })}
                >
                  {nav.name}
                </button>
              );
            })
          ) : !navLoading && !navData ? (
            <div>NO</div>
          ) : (
            <LoadingSpinner className="w-5 h-5 fill-primary-default" />
          )}
        </div>
        <div className="w-full h-8 mt-5 flex flex-row justify-center items-center">
          <button
            onClick={() => {
              if (selectedEdition === "gl") {
                setSelectedEdition("bd");
              } else {
                setSelectedEdition("gl");
              }
            }}
            className="w-44 h-full border border-gray-200 dark:border-gray-700 rounded-full relative overflow-hidden"
          >
            <div
              className={clsx(
                "h-full w-1/2 bg-primary-default relative overflow-hidden flex flex-col justify-center items-center text-sm transform transition-300",
                {
                  "translate-x-full": selectedEdition === "bd",
                  "translate-x-0": selectedEdition === "gl",
                }
              )}
            >
              {selectedEdition === "gl" ? "Global" : "BanglaDesh"}
            </div>
          </button>
        </div>
        <div className="w-full flex flex-col lg:flex-row lg:flex-wrap lg:justify-center">
          {loading ? (
            <div className="w-full flex flex-col items-center justify-center mt-10">
              <LoadingSpinner className="w-5 h-5 fill-primary-default" />
              <p className="animate-pulse text-sm text-gray-600">
                Loading For Exsting Sections...
              </p>
            </div>
          ) : (
            sectionData.sections.map((_, index) => {
              return (
                <Section
                  key={index}
                  sectionData={sectionData}
                  index={index}
                  setSectionData={setSectionData}
                  onAddPostClick={() => {
                    setSelectedSectionIndex(index);
                    setOpenDialog(true);
                  }}
                />
              );
            })
          )}
        </div>
        <div className="w-full lg:w-[30rem] lg:mx-auto flex flex-col">
          <div className="w-full px-4 mt-3">
            <button
              onClick={() => onAddSectionClick(setSectionData, sectionData)}
              className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700 py-2 rounded-lg text-gray-500 font-medium"
            >
              Add Section
            </button>
          </div>
          <div className="w-full px-4 mt-3">
            <button
              onClick={() => onPostAddHandler()}
              className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700 py-2 rounded-lg text-gray-500 font-medium"
            >
              Upload Changes
            </button>
          </div>
          <div className="w-full px-4 mt-3">
            <button
              onClick={() => {
                localStorage.removeItem("adminToken");
                router.replace("/admin/auth");
              }}
              className="w-full border-2 border-dashed border-red-300 dark:border-gray-700 py-2 rounded-lg text-red-400 font-medium"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
