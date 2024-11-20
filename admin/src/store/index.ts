import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import sidebarReducer from "./sidebar/sidebarSlice";
import authReducer from "./auth/authSlice";
import { apiSlice } from "./apis/apiSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        sidebar: sidebarReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./sidebar/sidebarSlice";
export * from "./auth/authSlice";
export * from "./auth/authApiSlice";
export * from "./apis/productsApi";
export * from "./apis/usersApi";
export * from "./apis/ordersApi";
export * from "./apis/summary";
export * from "./apis/categoriesApi";
export * from "./apis/rolesApi";
