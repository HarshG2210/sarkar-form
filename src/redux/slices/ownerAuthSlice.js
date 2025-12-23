import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const ownerAuthSlice = createSlice({
  name: "ownerAuth",
  initialState,
  reducers: {
    ownerLoginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    ownerLoginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;

      localStorage.setItem("ownerAuth", JSON.stringify(action.payload));
    },

    ownerLoginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    ownerLogout: () => {
      localStorage.removeItem("ownerAuth");
      return initialState;
    },

    hydrateOwnerAuth: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  ownerLoginRequest,
  ownerLoginSuccess,
  ownerLoginFailure,
  ownerLogout,
  hydrateOwnerAuth,
} = ownerAuthSlice.actions;

export default ownerAuthSlice.reducer;
