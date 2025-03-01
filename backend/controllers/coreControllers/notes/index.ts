import { createNote } from "./create";
import { getNotesByOrderId } from "./readByOrderId";

const methods = {
    readByOrderId: getNotesByOrderId,
    create: createNote,
};

export default methods;
