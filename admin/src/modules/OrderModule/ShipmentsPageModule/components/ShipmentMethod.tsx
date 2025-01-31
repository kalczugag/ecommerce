import { Button } from "@mui/material";

interface ShipmentMethodProps {
    methodName: string;
    onChangeMethod: () => void;
    onRecalculate: () => void;
}

const ShipmentMethod = ({
    methodName,
    onChangeMethod,
    onRecalculate,
}: ShipmentMethodProps) => {
    return (
        <div className="space-y-4">
            <div>
                <span className="font-bold">Method: </span>
                <span>{methodName}</span>
            </div>
            <div className="flex space-x-1">
                <Button variant="outlined" onClick={onChangeMethod}>
                    Change Method
                </Button>
                <Button variant="outlined" onClick={onRecalculate}>
                    Recalculate
                </Button>
            </div>
        </div>
    );
};

export default ShipmentMethod;
