import { configureStore } from "@reduxjs/toolkit";
import SidebarReducer from "./sidebar/sidebarSlice";

export const store = configureStore({
    reducer: {
        sidebar: SidebarReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./sidebar/sidebarSlice";
