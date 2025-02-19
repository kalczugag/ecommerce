import { deletePayment } from "./delete";
import { updatePayment } from "./update";

const methods = {
    update: updatePayment,
    delete: deletePayment,
};

export default methods;
