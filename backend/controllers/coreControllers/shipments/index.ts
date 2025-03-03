import { createShipment } from "./create";
import { getShipmentById } from "./readById";
import { updateShipment } from "./update";

const methods = {
    readById: getShipmentById,
    create: createShipment,
    update: updateShipment,
};

export default methods;
