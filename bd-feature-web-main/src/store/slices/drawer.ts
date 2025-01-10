import { createSlice } from "@reduxjs/toolkit";

interface DrawerState {
  isOpen: boolean;
}

const initState: DrawerState = {
  isOpen: false,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState: initState,
  reducers: {
    toggleDrawer: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export default drawerSlice.reducer;
export const { toggleDrawer } = drawerSlice.actions;
