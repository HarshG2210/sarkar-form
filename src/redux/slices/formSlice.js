import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    forms: [],
    loading: false,
    lastInsertedId: null,
    error: null,
  },
  reducers: {
    fetchFormsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchFormsSuccess: (state, action) => {
      state.forms = action.payload;
      state.loading = false;
    },

    fetchFormsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    submitFormRequest: (state) => {
      state.loading = true;
      state.lastInsertedId = null;
      state.error = null;
    },

    submitFormSuccess: (state, action) => {
      state.loading = false;
      state.lastInsertedId = action.payload;
    },

    submitFormFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteFormRequest: (state) => {
      state.loading = true;
    },

    deleteFormSuccess: (state, action) => {
      state.loading = false;
      state.forms = state.forms.filter((f) => f.id !== action.payload);
    },

    deleteAllFormsRequest: (state) => {
      state.loading = true;
    },

    deleteAllFormsSuccess: (state) => {
      state.loading = false;
      state.forms = [];
    },
  },
});

export const {
  fetchFormsRequest,
  fetchFormsSuccess,
  fetchFormsFailure,
  submitFormRequest,
  submitFormSuccess,
  submitFormFailure,
  deleteFormRequest,
  deleteFormSuccess,
  deleteAllFormsRequest,
  deleteAllFormsSuccess,
} = formSlice.actions;

// ✅ THIS LINE FIXES YOUR ERROR
export default formSlice.reducer;
