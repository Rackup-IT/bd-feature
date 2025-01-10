import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  themeMode: string;
}

const initState: ThemeState = {
  themeMode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initState,
  reducers: {
    initialThemeLoader: (state) => {
      const getTheme = localStorage.getItem("theme-mode") || "light";
      state.themeMode = getTheme;
      document.documentElement.className = getTheme;
    },
    toggleTheme: (state) => {
      const currentTheme = localStorage.getItem("theme-mode") || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";
      state.themeMode = newTheme;
      document.documentElement.className = newTheme;
      localStorage.setItem("theme-mode", newTheme);
    },
  },
});

export default themeSlice.reducer;
export const { initialThemeLoader, toggleTheme } = themeSlice.actions;
