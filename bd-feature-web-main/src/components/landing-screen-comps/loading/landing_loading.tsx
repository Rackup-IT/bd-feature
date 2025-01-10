interface LandingLoadingProps {
  className?: string;
}

const LandingLoading: React.FC<LandingLoadingProps> = (props) => {
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col px-2">
          <div className="w-full h-96 bg-gray-300 dark:bg-gray-800 animate-pulse relative overflow-hidden">
            <div className="w-full h-24 absolute bottom-0 left-0 px-4 pb-4">
              <div className="w-full h-6 bg-gray-400 dark:bg-gray-900 animate-pulse"></div>
              <div className="w-full h-6 bg-gray-400 dark:bg-gray-900 my-2 animate-pulse"></div>
              <div className="w-full h-6 bg-gray-400 dark:bg-gray-900 animate-pulse"></div>
            </div>
          </div>
          <div className="w-full h-24 flex flex-row">
            <div className="w-full h-24  mt-5 flex flex-col ">
              <div className="h-4 w-4/5 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
              <div className="h-4 w-4/5 my-2 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
              <div className="h-4 w-4/5 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
            </div>
            <div className="w-3/12 h-20 bg-gray-300 dark:bg-gray-800 animate-pulse mt-5"></div>
          </div>
          <div className="w-full h-24 flex flex-row">
            <div className="w-full h-24  mt-5 flex flex-col ">
              <div className="h-4 w-4/5 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
              <div className="h-4 w-4/5 my-2 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
              <div className="h-4 w-4/5 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
            </div>
            <div className="w-3/12 h-20 bg-gray-300 dark:bg-gray-800 animate-pulse mt-5"></div>
          </div>
          <div className="w-full h-24 flex flex-row">
            <div className="w-full h-24  mt-5 flex flex-col ">
              <div className="h-4 w-4/5 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
              <div className="h-4 w-4/5 my-2 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
              <div className="h-4 w-4/5 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
            </div>
            <div className="w-3/12 h-20 bg-gray-300 dark:bg-gray-800 animate-pulse mt-5"></div>
          </div>
          <div className="w-full h-24 flex flex-row">
            <div className="w-full h-24  mt-5 flex flex-col ">
              <div className="h-4 w-4/5 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
              <div className="h-4 w-4/5 my-2 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
              <div className="h-4 w-4/5 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
            </div>
            <div className="w-3/12 h-20 bg-gray-300 dark:bg-gray-800 animate-pulse mt-5"></div>
          </div>
        </div>
        <div className="w-full flex flex-col px-2 mt-16">
          <div className="w-full h-96 bg-gray-300 dark:bg-gray-800 animate-pulse relative overflow-hidden">
            <div className="w-full h-24 absolute bottom-0 left-0 px-4 pb-4">
              <div className="w-full h-6 bg-gray-400 dark:bg-gray-800 animate-pulse"></div>
              <div className="w-full h-6 bg-gray-400 dark:bg-gray-800 my-2 animate-pulse"></div>
              <div className="w-full h-6 bg-gray-400 dark:bg-gray-800 animate-pulse"></div>
            </div>
          </div>
          <div className="w-full h-24 flex flex-row">
            <div className="w-full h-24  mt-5 flex flex-col ">
              <div className="h-4 w-4/5 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
              <div className="h-4 w-4/5 my-2 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
              <div className="h-4 w-4/5 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
            </div>
            <div className="w-3/12 h-20 bg-gray-300 dark:bg-gray-800 animate-pulse mt-5"></div>
          </div>
          <div className="w-full h-24 flex flex-row">
            <div className="w-full h-24  mt-5 flex flex-col ">
              <div className="h-4 w-4/5 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
              <div className="h-4 w-4/5 my-2 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
              <div className="h-4 w-4/5 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
            </div>
            <div className="w-3/12 h-20 bg-gray-300 dark:bg-gray-800 animate-pulse mt-5"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingLoading;
