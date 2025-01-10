"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleTheme } from "@/store/slices/theme";
import { CiDark, CiLight } from "react-icons/ci";

const ToggleThemeBtn = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.themeMode);

  return (
    <button
      className="fixed top-4 right-4"
      onClick={() => dispatch(toggleTheme())}
    >
      {themeMode === "light" ? (
        <CiLight className="size-7" />
      ) : (
        <CiDark className="size-7" />
      )}
    </button>
  );
};

export default ToggleThemeBtn;
