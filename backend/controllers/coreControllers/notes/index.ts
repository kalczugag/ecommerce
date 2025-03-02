import { createNote } from "./create";
import { deleteNote } from "./delete";
import { getNotesByOrderId } from "./readByOrderId";
import { reorderNotes } from "./reorder";

const methods = {
    readByOrderId: getNotesByOrderId,
    create: createNote,
    reorder: reorderNotes,
    delete: deleteNote,
};

export default methods;
