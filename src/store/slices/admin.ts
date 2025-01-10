import { createSlice } from "@reduxjs/toolkit";

export enum SidePanelButtons {
  HOME = "home",
  ADD = "add",
  POSTS = "posts",
  NAVIGATIONS = "navigations",
}

interface AdminState {
  selectedTab: string;
}

const initState: AdminState = {
  selectedTab: SidePanelButtons.HOME,
};

const adminSlice = createSlice({
  name: "admin",
  initialState: initState,
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
  },
});

export default adminSlice.reducer;
export const { setSelectedTab } = adminSlice.actions;
