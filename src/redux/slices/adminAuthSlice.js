import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    adminLoginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    adminLoginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;

      localStorage.setItem("adminAuth", JSON.stringify(action.payload));
    },

    adminLoginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    adminLogout: () => {
      localStorage.removeItem("adminAuth");
      return initialState;
    },

    hydrateAdminAuth: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  adminLoginRequest,
  adminLoginSuccess,
  adminLoginFailure,
  adminLogout,
  hydrateAdminAuth,
} = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
