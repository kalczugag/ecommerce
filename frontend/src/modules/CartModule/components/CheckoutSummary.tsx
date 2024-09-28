import { Button, Divider } from "@mui/material";
import type { Cart } from "@/types/Cart";

interface CheckoutSummaryProps {
    data: Cart;
    isLoading: boolean;
}

interface BoxProps {
    title: string;
    value: string;
    bold?: boolean;
    color?: "standard" | "green";
}

const Box = ({ title, value, bold, color = "standard" }: BoxProps) => {
    const textColor = color === "standard" ? "" : "text-green-600";

    return (
        <div className={`flex justify-between ${bold && "font-bold"}`}>
            <span>{title}</span>
            <span className={`font-bold ${textColor}`}>{value}</span>
        </div>
    );
};

const CheckoutSummary = ({ data, isLoading }: CheckoutSummaryProps) => {
    const itemsCount = data._products.length;
    const itemsLabel = `${itemsCount} ${itemsCount > 1 ? "items" : "item"}`;
    const deliveryCost =
        data.deliveryCost > 0 ? `$${data.deliveryCost}` : "Free";
    const totalAmount = data.subTotal - data.discount + data.deliveryCost;

    return (
        <div className="flex flex-col space-y-6 p-6 shadow border rounded w-full md:w-[550px]">
            <h3 className="font-bold text-gray-600">PRICE DETAILS</h3>
            <Divider />
            <div className="flex flex-col space-y-2">
                <Box
                    title={`Price (${itemsLabel})`}
                    value={`$${data.subTotal}`}
                />
                <Box
                    title="Discount"
                    value={`-$${data.discount}`}
                    color="green"
                />
                <Box
                    title="Delivery Charges"
                    value={deliveryCost}
                    color="green"
                />
                <Box title="Total Amount" value={`$${totalAmount}`} bold />
            </div>
            <Divider />
            <Button variant="contained" disabled={isLoading} fullWidth>
                CHECK OUT
            </Button>
        </div>
    );
};

export default CheckoutSummary;
