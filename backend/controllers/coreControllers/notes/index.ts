import { createNote } from "./create";
import { getNotesByOrderId } from "./readByOrderId";
import { reorderNotes } from "./reorder";

const methods = {
    readByOrderId: getNotesByOrderId,
    create: createNote,
    reorder: reorderNotes,
};

export default methods;
