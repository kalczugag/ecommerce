import { Button, Divider } from "@mui/material";
import DiscountDialog from "./DiscountDialog";
import type { Cart } from "@/types/Cart";

interface CheckoutSummaryProps {
    data: Cart;
    loadingGet: boolean;
    loadingEdit: boolean;
    isSummary?: boolean;
    handleCheckout: () => void;
    handleAddDiscount: (promoCode: string) => void;
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

const CheckoutSummary = ({
    data,
    loadingGet,
    loadingEdit,
    isSummary,
    handleCheckout,
    handleAddDiscount,
}: CheckoutSummaryProps) => {
    const itemsCount = data.items
        .map((item) => item.quantity)
        .reduce((a, b) => a + b, 0);
    const itemsLabel = `${itemsCount} ${itemsCount > 1 ? "items" : "item"}`;
    const deliveryCost = data.total < 100 ? `$${data.deliveryCost}` : "Free";
    const totalAmount = data.subTotal - data.discount + data.deliveryCost;

    return (
        <div className="flex flex-col space-y-6 p-6 shadow border rounded w-full md:w-[550px]">
            <h3 className="font-bold text-gray-600">PRICE DETAILS</h3>
            <Divider />
            <div className="flex flex-col space-y-2">
                <Box
                    title={`Price (${itemsLabel})`}
                    value={`$${data.subTotal.toFixed(2)}`}
                />
                <Box
                    title="Discount"
                    value={
                        data.discount > 0
                            ? `-$${data.discount.toFixed(2)}`
                            : "No discount"
                    }
                    color="green"
                />
                {isSummary && (
                    <Box
                        title="Delivery Charges"
                        value={deliveryCost}
                        color="green"
                    />
                )}
                <Box
                    title="Total Amount"
                    value={`$${totalAmount.toFixed(2)}`}
                    bold
                />
            </div>
            <Divider />
            <Button
                variant="contained"
                onClick={handleCheckout}
                loading={loadingGet}
                loadingPosition="end"
                fullWidth
            >
                {isSummary ? "Payment" : "Checkout"}
            </Button>
            {!isSummary && (
                <DiscountDialog
                    onSubmit={handleAddDiscount}
                    isLoading={loadingEdit}
                />
            )}
        </div>
    );
};

export default CheckoutSummary;
