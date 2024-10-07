import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { Button, Divider } from "@mui/material";
import { useAddOrderMutation } from "@/store";
import type { Cart, Item } from "@/types/Cart";

interface CheckoutSummaryProps {
    data: Cart;
    isLoading: boolean;
    isSummary?: boolean;
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
    isLoading,
    isSummary,
}: CheckoutSummaryProps) => {
    const navigate = useNavigate();
    const { token } = useAuth();

    const [addOrder] = useAddOrderMutation();

    const itemsCount = data._products.length;
    const itemsLabel = `${itemsCount} ${itemsCount > 1 ? "items" : "item"}`;
    const deliveryCost = data.total < 100 ? `$${data.deliveryCost}` : "Free";
    const totalAmount = data.subTotal - data.discount + data.deliveryCost;

    const handleCheckout = async () => {
        if (!token) {
            navigate("/login");
        }

        const productsWithIds = data._products.map((product) => ({
            ...product,
            product: product.product?._id || "",
        }));

        const orderPayload = {
            items: productsWithIds,
            deliveryCost: data.deliveryCost,
            subTotal: data.subTotal,
            discount: data.discount,
            total: data.total,
        };

        try {
            const result = await addOrder(orderPayload);
            const orderId = result.data?.data._id;

            if (orderId) {
                const queryParams = new URLSearchParams(location.search);
                const step = queryParams.get("step") || "0";

                navigate(`/checkout?id=${orderId}&step=${step}`);
            }
        } catch (error) {
            console.error("Error while adding order:", error);
        }
    };

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
            <Button
                variant="contained"
                onClick={handleCheckout}
                disabled={isLoading}
                fullWidth
            >
                {isSummary ? "PAYMENT" : "CHECK OUT"}
            </Button>
        </div>
    );
};

export default CheckoutSummary;
