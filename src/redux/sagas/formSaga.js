import { call, put, takeLatest } from "redux-saga/effects";
import { supabase } from "../../supabase/client";
import {
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
} from "../slices/formSlice";

/* ================= FETCH ALL ================= */
function* fetchFormsSaga() {
  try {
    const { data, error } = yield call(() =>
      supabase
        .from("forms")
        .select("*")
        .order("created_at", { ascending: false })
    );

    if (error) throw error;

    yield put(fetchFormsSuccess(data || []));
  } catch (err) {
    yield put(fetchFormsFailure(err.message));
  }
}

/* ================= SUBMIT ================= */
function* submitFormSaga(action) {
  try {
    const p = action.payload;

    const { data, error } = yield call(() =>
      supabase
        .from("forms")
        .insert([
          {
            entry_no: p.entryNo,
            entry_name: p.entryName,
            applicant_name: p.applicantName,
            gramsevak_name: p.gramsevakName,
            issue_date: p.issueDate,
            gram_panchayat: p.gramPanchayat,
            taluka: p.taluka,
            district: p.district,
            encrypted_payload: p.encryptedPayload,
          },
        ])
        .select("id")
        .single()
    );

    if (error || !data?.id) throw error;

    yield put(submitFormSuccess(data.id));
  } catch (err) {
    yield put(submitFormFailure(err.message));
  }
}

/* ================= FETCH BY ID ================= */
function* fetchFormByIdSaga(action) {
  try {
    const id = action.payload;

    const { data, error } = yield call(() =>
      supabase.from("forms").select("*").eq("id", id).single()
    );

    if (error || !data) throw error;

    yield put(fetchFormByIdSuccess(data));
  } catch {
    yield put(fetchFormByIdFailure("Invalid QR"));
  }
}

/* ================= DELETE ONE ================= */
function* deleteFormSaga(action) {
  try {
    const id = action.payload;

    const { error } = yield call(() =>
      supabase.from("forms").delete().eq("id", id)
    );

    if (error) throw error;

    yield put(deleteFormSuccess(id));
  } catch (err) {
    yield put(submitFormFailure(err.message));
  }
}

/* ================= DELETE ALL ================= */
function* deleteAllFormsSaga() {
  try {
    const { error } = yield call(() =>
      supabase.from("forms").delete().neq("id", "")
    );

    if (error) throw error;

    yield put(deleteAllFormsSuccess());
  } catch (err) {
    yield put(submitFormFailure(err.message));
  }
}

/* ================= WATCHERS ================= */
export default function* formSaga() {
  yield takeLatest(fetchFormsRequest.type, fetchFormsSaga);
  yield takeLatest(fetchFormByIdRequest.type, fetchFormByIdSaga);
  yield takeLatest(submitFormRequest.type, submitFormSaga);
  yield takeLatest(deleteFormRequest.type, deleteFormSaga);
  yield takeLatest(deleteAllFormsRequest.type, deleteAllFormsSaga);
}
