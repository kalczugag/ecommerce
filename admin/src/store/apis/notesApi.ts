import { apiSlice } from "./apiSlice";
import type { OrderNote, OrderWithNotes } from "@/types/Order";

interface ReorderNotesProps {
    noteId: string;
    newIndex: number;
    belongsTo: {
        _entity: string;
        model: string;
    };
}

export const notesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotesByOrderId: builder.query<
            ApiResponseObject<OrderWithNotes>,
            string
        >({
            query: (id) => ({
                url: `/admin/notes/${id}`,
                method: "GET",
                keepUnusedDataFor: 300,
            }),
            providesTags: () => [{ type: "Notes", id: "LIST" }],
        }),

        addNote: builder.mutation<
            ApiResponseObject<OrderNote>,
            Partial<OrderNote>
        >({
            query: (values) => ({
                url: "/admin/notes",
                method: "POST",
                body: values,
            }),

            invalidatesTags: (data) => [
                { type: "Notes", id: data?.result._id },
            ],
        }),

        reorderNotes: builder.mutation<
            ApiResponseObject<OrderNote>,
            ReorderNotesProps
        >({
            query: ({ noteId, ...values }) => ({
                url: `/admin/notes/${noteId}`,
                method: "PATCH",
                body: values,
            }),

            invalidatesTags: (result, error, values) => [
                { type: "Notes", id: values.noteId },
            ],
        }),

        deleteNote: builder.mutation<ApiResponseObject<OrderNote>, string>({
            query: (id) => ({
                url: `/admin/notes/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: () => [{ type: "Notes", id: "LIST" }],
        }),
    }),
});

export const {
    useGetNotesByOrderIdQuery,
    useAddNoteMutation,
    useReorderNotesMutation,
    useDeleteNoteMutation,
} = notesApi;
