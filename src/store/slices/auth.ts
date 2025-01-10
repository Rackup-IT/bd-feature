import { createSlice } from "@reduxjs/toolkit";

import UserModel from "../../interfaces/user";

interface AuthState {
  isAuthenticated: boolean;
  user: UserModel | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth slice",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
  },
});

export default authSlice.reducer;
export const { setUser } = authSlice.actions;
