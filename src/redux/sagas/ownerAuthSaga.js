import { call, put, takeLatest } from "redux-saga/effects";
import {
  ownerLoginRequest,
  ownerLoginSuccess,
  ownerLoginFailure,
} from "../slices/ownerAuthSlice";
import { supabase } from "@/supabase/client";

function* ownerLoginSaga(action) {
  try {
    const { email, password } = action.payload;

    const { data, error } = yield call(() =>
      supabase
        .from("owners")
        .select("id, email, password")
        .eq("email", email)
        .single()
    );

    if (error || !data || data.password !== password) {
      throw new Error("Invalid owner credentials");
    }

    yield put(
      ownerLoginSuccess({
        id: data.id,
        email: data.email,
      })
    );
  } catch (err) {
    yield put(ownerLoginFailure(err.message));
  }
}

export default function* ownerAuthSaga() {
  yield takeLatest(ownerLoginRequest.type, ownerLoginSaga);
}
