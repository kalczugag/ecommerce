import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import SidebarReducer from "./sidebar/sidebarSlice";
import UserReducer from "./user/userSlice";

export const store = configureStore({
    reducer: {
        user: UserReducer,
        sidebar: SidebarReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./sidebar/sidebarSlice";
export { login, logout } from "./user/userSlice";
