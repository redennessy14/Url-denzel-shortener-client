import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { urlsReducer } from "./slices/urls";
import {
  loadAuthFromLocalStorage,
  saveAuthToLocalStorage,
} from "../middleware/localstorage";
import { redirectReducer } from "./slices/redirect";

const preloadedState = {
  auth: loadAuthFromLocalStorage(),
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    urls: urlsReducer,
    redirect: redirectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveAuthToLocalStorage),
  preloadedState,
});

export default store;
