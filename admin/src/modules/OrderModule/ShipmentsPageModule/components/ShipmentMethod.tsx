import { Button } from "@mui/material";
import ChangeShippingMethodDialog from "./ChangeShippingMethodDialog";
import { deliveryMethods } from "@/constants/deliveryMethods";
import type { DeliveryMethod } from "@/types/DeliveryMethod";
import { Form } from "react-final-form";

interface ShipmentMethodProps {
    deliveryMethod: DeliveryMethod;
    onChangeMethod: () => void;
    onRecalculate: () => void;
}

const ShipmentMethod = ({
    deliveryMethod,
    onChangeMethod,
    onRecalculate,
}: ShipmentMethodProps) => {
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
                <Form
                    onSubmit={() => {}}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <ChangeShippingMethodDialog
                                methodName={methodName}
                                onChangeMethod={onChangeMethod}
                            />
                        </form>
                    )}
                />
                <Button variant="outlined" onClick={onRecalculate}>
                    Recalculate
                </Button>
            </div>
        </div>
    );
};

export default ShipmentMethod;
