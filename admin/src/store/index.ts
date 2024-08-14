import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import sidebarReducer from "./sidebar/sidebarSlice";
import userReducer from "./user/userSlice";
import tableReducer from "./table/tableSlice";
import { productApi } from "./apis/productsApi";
import { userApi } from "./apis/usersApi";

export const store = configureStore({
    reducer: {
        user: userReducer,
        sidebar: sidebarReducer,
        table: tableReducer,
        [productApi.reducerPath]: productApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(productApi.middleware)
            .concat(userApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./sidebar/sidebarSlice";
export * from "./table/tableSlice";
export * from "./user/userSlice";
export { useGetAllProductsQuery } from "./apis/productsApi";
export {
    useGetAllUsersQuery,
    useGetUsersByRoleQuery,
    useGetUserByIdQuery,
    useEditUserMutation,
} from "./apis/usersApi";
