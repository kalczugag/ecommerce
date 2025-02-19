import { Button } from "@mui/material";

interface ShipmentActionsProps {
    onShipItems: () => void;
    onEdit: () => void;
    onSplit: () => void;
}

const ShipmentActions = ({
    onShipItems,
    onEdit,
    onSplit,
}: ShipmentActionsProps) => {
    return (
        <div className="space-y-4">
            <Button variant="contained" onClick={onShipItems}>
                Ship Items
            </Button>
            <div className="flex space-x-1">
                <Button variant="outlined" onClick={onEdit}>
                    Edit
                </Button>
                <Button variant="outlined" onClick={onSplit}>
                    Split
                </Button>
            </div>
        </div>
    );
};

export default ShipmentActions;
