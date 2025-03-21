import { Button } from "@mui/material";
import OrderTotalSkeleton from "./OrderTotalSkeleton";
import type { Order } from "@/types/Order";

interface OrderTotalProps {
    total: string;
    subTotal: string;
    discount?: string;
    delivery?: string;
    status: Order["status"];
    isLoading: boolean;
}

const OrderTotal = ({
    total,
    subTotal,
    discount,
    delivery,
    status,
    isLoading,
}: OrderTotalProps) => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex flex-col font-semibold md:flex-row md:justify-between">
            <h2 className="text-2xl">Total cost</h2>
            <div className="flex flex-col items-end text-sm space-y-2">
                {status !== "canceled" && (
                    <Button
                        sx={{
                            "@media print": {
                                display: "none",
                            },
                        }}
                        onClick={handlePrint}
                    >
                        Invoice
                    </Button>
                )}
                {isLoading ? (
                    <OrderTotalSkeleton />
                ) : (
                    <div className="flex flex-col w-64">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>${subTotal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Delivery:</span>
                            <span>${delivery}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Discount:</span>
                            <span>${discount}</span>
                        </div>
                        <div className="flex justify-between mt-3 font-bold">
                            <span>Total:</span>
                            <span>${total}</span>
                        </div>
                        <p className="font-normal text-gray-600">
                            (Total cost includes VAT)
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderTotal;
