import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import sidebarReducer from "./sidebar/sidebarSlice";
import authReducer from "./auth/authSlice";
import tableReducer from "./table/tableSlice";
import { apiSlice } from "./apis/apiSlice";
import { productApi } from "./apis/productsApi";
import { userApi } from "./apis/usersApi";
import { orderApi } from "./apis/ordersApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        sidebar: sidebarReducer,
        table: tableReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(apiSlice.middleware)
            .concat(productApi.middleware)
            .concat(userApi.middleware)
            .concat(orderApi.middleware),
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
