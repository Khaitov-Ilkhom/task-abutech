import {configureStore} from "@reduxjs/toolkit";
import {reducer as authSlice} from "../slice/authSlice.ts";
import {api} from "../api";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store