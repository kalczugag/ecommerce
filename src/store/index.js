import { configureStore } from "@reduxjs/toolkit";
import { postsReducer, changePostSearchTerm } from "./slices/postSlice";
import { postAddFormReducer } from "./slices/postAddFormSlice";
import { cartReducer } from "./slices/cartSlice";
import { postEditFormReducer } from "./slices/postEditFormSlice";
import { adminReducer } from "./slices/adminSlice";
import { orderReducer, changeOrderSearchTerm } from "./slices/orderSlice";
import { categoriesReducer } from "./slices/categoriesSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        orders: orderReducer,
        postAddForm: postAddFormReducer,
        postEditForm: postEditFormReducer,
        cart: cartReducer,
        admin: adminReducer,
        categories: categoriesReducer,
    },
});

export * from "./slices/postAddFormSlice";
export * from "./slices/postEditFormSlice";
export * from "./slices/cartSlice";
export * from "./slices/adminSlice";
export * from "./slices/orderSlice";
export * from "./thunks/fetchPosts";
export * from "./thunks/addPost";
export * from "./thunks/removePost";
export * from "./thunks/editPost";
export * from "./thunks/fetchOrders";
export * from "./thunks/editOrder";
export * from "./thunks/addOrder";
export * from "./thunks/fetchCategories";
export { changePostSearchTerm, changeOrderSearchTerm };
