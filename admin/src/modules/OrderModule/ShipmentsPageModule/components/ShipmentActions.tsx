import { Button } from "@mui/material";

interface ShipmentActionsProps {
    isMobile: boolean;
    onShipItems: () => void;
    onEdit: () => void;
    onSplit: () => void;
}

const ShipmentActions = ({
    isMobile,
    onShipItems,
    onEdit,
    onSplit,
}: ShipmentActionsProps) => {
    return (
        <div className="space-y-4">
            <Button
                variant="contained"
                fullWidth={!isMobile}
                onClick={onShipItems}
            >
                Ship Items
            </Button>
            <div className="flex space-x-1">
                <Button
                    variant="outlined"
                    fullWidth={!isMobile}
                    onClick={onEdit}
                >
                    Edit
                </Button>
                <Button
                    variant="outlined"
                    fullWidth={!isMobile}
                    onClick={onSplit}
                >
                    Split
                </Button>
            </div>
        </div>
    );
};

export default ShipmentActions;
