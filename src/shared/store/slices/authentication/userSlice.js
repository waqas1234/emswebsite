import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    userid: null,
    user: null,
    name: null,
    token: null,
    type: null,
  },

  reducers: {
    login: (state, action) => {
      state.userid = action.payload.userid;
      state.user = action.payload;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.type = action.payload.type;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.userid = null;
      state.user = null;
      state.name = null;
      state.isAuthenticated = false;
      state.type = null;
      state.token = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
