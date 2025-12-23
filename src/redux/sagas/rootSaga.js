import { all } from "redux-saga/effects";
import adminAuthSaga from "./adminAuthSaga";
import ownerAuthSaga from "./ownerAuthSaga";
import formSaga from "./formSaga";

export default function* rootSaga() {
  yield all([adminAuthSaga(), ownerAuthSaga(), formSaga()]);
}
