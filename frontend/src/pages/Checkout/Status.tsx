import { useOrder } from "@/contexts/OrderContext";
import useStep from "@/modules/CheckoutModule/hooks/useStep";
import CartProductItem from "@/modules/CartModule/components/CartProductItem";
import NotFound from "@/components/NotFound";
import MessageBox from "@/components/MessageBox";

interface MessageDetails {
    title: string;
    message: string;
    variant: "success" | "error";
}

const CheckoutStatus = () => {
    const { order, isLoading } = useOrder();
    const [activeStep] = useStep();

    const getMessageDetails = (): MessageDetails | null => {
        if (activeStep === "success" && order?.status !== "cancelled") {
            return {
                title: "Payment Successful",
                message: "Congratulations, your order has been placed",
                variant: "success",
            };
        } else if (activeStep === "cancel" && order?.status === "cancelled") {
            return {
                title: "Payment Cancelled",
                message: "Unfortunately, your payment was cancelled",
                variant: "error",
            };
        }
        return null;
    };

    const messageDetails = getMessageDetails();

    if ((!messageDetails || !order) && !isLoading) {
        return <NotFound />;
    }

    return (
        <div>
            <MessageBox
                variant={messageDetails?.variant}
                title={messageDetails?.title || ""}
                message={messageDetails?.message || ""}
            />
            <div className="w-full space-y-4 max-h-[500px] overflow-auto">
                {order?.items.map((item, index) => (
                    <CartProductItem
                        key={index}
                        data={item}
                        isLoading={isLoading}
                        editable={false}
                    />
                ))}
            </div>
        </div>
    );
};

export default CheckoutStatus;
