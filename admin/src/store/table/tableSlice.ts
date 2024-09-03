import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TableState {
    page: number;
    pageSize: number;
}

const initialState: TableState = {
    page: 0,
    pageSize: 5,
};

const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        setPagination(
            state,
            action: PayloadAction<{ page?: number; pageSize?: number }>
        ) {
            if (action.payload) {
                state.page = action.payload.page ?? state.page;
                state.pageSize = action.payload.pageSize ?? state.pageSize;
            }
        },
        reset() {
            return {
                ...initialState,
            };
        },
    },
});

export const { setPagination, reset } = tableSlice.actions;

export default tableSlice.reducer;
export type { TableState };
