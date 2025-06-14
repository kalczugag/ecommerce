import { Chip } from "@mui/material";

interface StatusChipProps {
    status: string;
    type: "order" | "payment" | "shipment";
    size?: "small" | "medium";
    customMap?: Record<
        string,
        | "default"
        | "primary"
        | "secondary"
        | "error"
        | "warning"
        | "info"
        | "success"
    >;
}

const StatusChip = ({
    status,
    type,
    customMap,
    size = "medium",
}: StatusChipProps) => {
    const orderColorMap: Record<
        string,
        | "default"
        | "primary"
        | "secondary"
        | "error"
        | "warning"
        | "info"
        | "success"
    > = {
        placed: "default",
        confirmed: "primary",
        shipped: "info",
        delivered: "success",
        canceled: "info",
        "pending payment": "warning",
        returned: "secondary",
    };

    const paymentColorMap: Record<
        string,
        | "default"
        | "primary"
        | "secondary"
        | "error"
        | "warning"
        | "info"
        | "success"
    > = {
        unpaid: "warning",
        pending: "default",
        completed: "primary",
        failed: "error",
        refunded: "secondary",
    };

    const shipmentColorMap: Record<
        string,
        | "default"
        | "primary"
        | "secondary"
        | "error"
        | "warning"
        | "info"
        | "success"
    > = {
        pending: "default",
        shipped: "info",
        delivered: "primary",
        returned: "secondary",
        failed: "error",
        canceled: "info",
    };

    const colorMap =
        type === "order"
            ? orderColorMap
            : type === "payment"
            ? paymentColorMap
            : shipmentColorMap;

    return (
        <Chip
            label={status}
            color={customMap ? customMap[status] : colorMap[status]}
            size={size}
        />
    );
};

export default StatusChip;
