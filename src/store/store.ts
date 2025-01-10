import { configureStore } from "@reduxjs/toolkit";

import adminSlice from "./slices/admin";
import AuthSlice from "./slices/auth";
import drawerSlice from "./slices/drawer";
import themeSlice from "./slices/theme";

export const makeStore = () =>
  configureStore({
    reducer: {
      theme: themeSlice,
      drawer: drawerSlice,
      admin: adminSlice,
      auth: AuthSlice,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
