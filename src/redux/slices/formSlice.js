import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    forms: [],
    selectedForm: null,
    loading: false,
    lastInsertedId: null,
    error: null,
  },
  reducers: {
    /* ---------- FETCH ALL ---------- */
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

    /* ---------- FETCH BY ID (QR) ---------- */
    fetchFormByIdRequest: (state) => {
      state.loading = true;
      state.selectedForm = null;
      state.error = null;
    },
    fetchFormByIdSuccess: (state, action) => {
      state.selectedForm = action.payload;
      state.loading = false;
    },
    fetchFormByIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ---------- SUBMIT ---------- */
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

    /* ---------- DELETE ---------- */
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
  fetchFormByIdRequest,
  fetchFormByIdSuccess,
  fetchFormByIdFailure,
  submitFormRequest,
  submitFormSuccess,
  submitFormFailure,
  deleteFormRequest,
  deleteFormSuccess,
  deleteAllFormsRequest,
  deleteAllFormsSuccess,
} = formSlice.actions;

export default formSlice.reducer;
