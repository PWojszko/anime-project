import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import counterReducer from "./counter";
import { animeListApi } from "./api";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [animeListApi.reducerPath]: animeListApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(animeListApi.middleware),
});

setupListeners(store.dispatch);
