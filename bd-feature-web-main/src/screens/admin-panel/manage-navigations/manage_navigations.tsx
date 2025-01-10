import LoadingSpinner from "@/components/loading-spinner/loading_spinner";
import { NavigationItemProps } from "@/interfaces/navigation_item";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { MdOutlineAutoDelete } from "react-icons/md";
import useHttpRequest from "../../../hooks/api/useApiRequest";

interface ManageNavigationsProps {}

const ManageNavigations: React.FC<ManageNavigationsProps> = (props) => {
  const { sendRequest, loading } = useHttpRequest();

  const [selectedEdition, setSelectedEdition] = useState<string>("gl");
  const [navigationList, setNavigationList] = useState<NavigationItemProps[]>(
    []
  );

  const removeNavigationHandler = (
    navItem: NavigationItemProps,
    index: number
  ) => {
    let deletedNavItem = navItem;
    try {
      setNavigationList((prev) => prev.filter((n) => n._id !== navItem._id));
      sendRequest("/api/admin/navigation?id=" + navItem._id, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
      setNavigationList((prev) => {
        const updatedNav = [...prev];
        updatedNav[index] = deletedNavItem;
        return updatedNav;
      });
    }
  };

  useEffect(() => {
    const fetchSortedNavigations = async () => {
      try {
        const result = await sendRequest(
          `/api/admin/navigation?edition=${selectedEdition}`,
          {
            method: "GET",
          }
        );
        setNavigationList(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSortedNavigations();
  }, [selectedEdition, sendRequest]);

  return (
    <div className="px-2 pt-2 flex flex-col">
      <h1 className="text-lg font-bold font-ralway">
        Manage Navigations Links
      </h1>
      <ul className="mt-4 flex flex-row">
        <li className="mr-2">
          <button
            onClick={() => setSelectedEdition("gl")}
            className={clsx(
              "px-3 py-1 rounded-full font-medium transition-300",
              {
                "bg-primary-tints-500 dark:bg-primary-shades-700":
                  selectedEdition === "gl",
              }
            )}
          >
            Global
          </button>
        </li>
        <li>
          <button
            onClick={() => setSelectedEdition("bd")}
            className={clsx(
              "px-3 py-1  rounded-full font-medium transition-300",
              {
                "bg-primary-tints-500 dark:bg-primary-shades-700":
                  selectedEdition === "bd",
              }
            )}
          >
            Bangladesh
          </button>
        </li>
      </ul>
      <div className="mt-10 flex flex-col">
        <h3 className="text-base font-medium relative pl-3 before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-primary-tints-500 before:dark:bg-primary-shades-700  before:mr-3">
          Navigation Links For{" "}
          {selectedEdition === "gl" ? "Global" : "Bangladesh"}
        </h3>
      </div>
      <ul className="mt-6 flex flex-col px-2">
        {loading ? (
          <LoadingSpinner className="w-8 h-8 fill-primary-default" />
        ) : !navigationList || navigationList.length === 0 ? (
          <p>No Data Found</p>
        ) : (
          navigationList.map((nav, index) => {
            return (
              <li
                key={nav._id}
                className="flex flex-row items-center w-full min-[540px]:w-[25rem] justify-between bg-gray-200 px-2 py-3 rounded-lg my-2"
              >
                <p className="font-semibold">{nav.name}</p>
                <button
                  onClick={() => removeNavigationHandler(nav, index)}
                  className="size-6"
                >
                  <MdOutlineAutoDelete className="size-full fill-red-500" />
                </button>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default ManageNavigations;
