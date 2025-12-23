import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// ✅ Separate reducers
import adminAuthReducer from "../redux/slices/adminAuthSlice";
import ownerAuthReducer from "../redux/slices/ownerAuthSlice";
import formReducer from "../redux/slices/formSlice";

// ✅ Root saga (admin + owner + form)
import rootSaga from "../redux/sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer, // 🔐 Admin auth
    ownerAuth: ownerAuthReducer, // 🔐 Owner auth
    form: formReducer, // 📄 Forms
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
