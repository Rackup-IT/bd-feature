import clsx from "clsx";

import LoadingSpinner from "@/components/loading-spinner/loading_spinner";
import { NavigationItemProps } from "@/interfaces/navigation_item";
import { Dispatch, SetStateAction } from "react";

interface TopBarProps {
  navigationLoading: boolean;
  navigations: NavigationItemProps[] | null;
  selectedPage: string;
  setSelectedPage: Dispatch<SetStateAction<string>>;
}

const TopBar: React.FC<TopBarProps> = (props) => {
  return (
    <div className="w-screen flex flex-row items-center h-12 overflow-x-scroll bg-gray-100 dark:bg-gray-950 fixed top-0 left-0 z-10 drop-shadow-lg">
      <button
        onClick={() => props.setSelectedPage("landing-page")}
        className={clsx("h-full px-2 text-sm ml-2 text-nowrap transition-300", {
          "text-primary-default font-medium": !props.selectedPage,
        })}
      >
        Landing Page
      </button>
      {props.navigationLoading || !props.navigations ? (
        <LoadingSpinner className="w-5 h-5 fill-primary-default" />
      ) : (
        (props.navigations as NavigationItemProps[]).map((navigation) => {
          return (
            <button
              onClick={() => props.setSelectedPage(navigation.value)}
              key={navigation._id}
              className={clsx(
                "h-full px-2 text-sm ml-2 text-nowrap transition-300",
                {
                  "text-primary-default font-medium":
                    props.selectedPage === navigation.value,
                }
              )}
            >
              {navigation.name}
            </button>
          );
        })
      )}
    </div>
  );
};

export default TopBar;
