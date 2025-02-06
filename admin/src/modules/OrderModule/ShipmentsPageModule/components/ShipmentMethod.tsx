import { Button } from "@mui/material";
import ChangeShippingMethodDialog from "./ChangeShippingMethodDialog";
import { deliveryMethods } from "@/constants/deliveryMethods";
import type { DeliveryMethod } from "@/types/DeliveryMethod";

interface ShipmentMethodProps {
    deliveryMethod: DeliveryMethod;
}

const ShipmentMethod = ({ deliveryMethod }: ShipmentMethodProps) => {
    const methodName =
        deliveryMethods[deliveryMethod.type] +
        " - " +
        deliveryMethod.providers[0].name;

    return (
        <div className="space-y-4">
            <div>
                <span className="font-bold">Method: </span>
                <span>{methodName}</span>
            </div>
            <div className="flex space-x-1">
                <ChangeShippingMethodDialog
                    currentDeliveryMethod={deliveryMethod.providers[0]._id}
                    methodName={methodName}
                />
                <Button variant="outlined">Recalculate</Button>
            </div>
        </div>
    );
};

export default ShipmentMethod;
