import { call, put, takeLatest } from "redux-saga/effects";
import {
  adminLoginRequest,
  adminLoginSuccess,
  adminLoginFailure,
} from "../slices/adminAuthSlice";
import { supabase } from "../../supabase/client";

function* adminLoginSaga(action) {
  try {
    const { email, password } = action.payload;

    const { data, error } = yield call(() =>
      supabase
        .from("admins")
        .select("id, email, password")
        .eq("email", email)
        .single()
    );

    if (error || !data || data.password !== password) {
      throw new Error("Invalid admin credentials");
    }

    yield put(
      adminLoginSuccess({
        id: data.id,
        email: data.email,
      })
    );
  } catch (err) {
    yield put(adminLoginFailure(err.message));
  }
}

export default function* adminAuthSaga() {
  yield takeLatest(adminLoginRequest.type, adminLoginSaga);
}
