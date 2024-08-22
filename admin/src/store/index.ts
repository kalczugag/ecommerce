import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import sidebarReducer from "./sidebar/sidebarSlice";
import authReducer from "./auth/authSlice";
import tableReducer from "./table/tableSlice";
import { apiSlice } from "./apis/apiSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        sidebar: sidebarReducer,
        table: tableReducer,
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
export * from "./table/tableSlice";
export * from "./auth/userSlice";
export * from "./auth/authSlice";
export { useLoginMutation } from "./auth/authApiSlice";
export {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useEditProductMutation,
    useDeleteProductMutation,
} from "./apis/productsApi";
export {
    useGetAllUsersQuery,
    useGetUsersByRoleQuery,
    useGetUserByIdQuery,
    useEditUserMutation,
    useDeleteUserMutation,
} from "./apis/usersApi";
export { useGetAllOrdersQuery, useGetOrderByIdQuery } from "./apis/ordersApi";
