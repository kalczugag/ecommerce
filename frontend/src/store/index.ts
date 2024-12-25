import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./auth/authSlice";
import { apiSlice } from "./apis/apiSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            apiSlice.middleware
        ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./auth/authSlice";
export * from "./auth/authApiSlice";
export * from "./apis/productsApi";
export * from "./apis/categoriesApi";
export * from "./apis/ordersApi";
export * from "./apis/summaryApi";
export * from "./apis/reviewsApi";
export * from "./apis/cartApi";
export * from "./apis/userApi";
export * from "./apis/paymentApi";
export * from "./apis/campaignsApi";
export * from "./apis/deliveryMethods";
