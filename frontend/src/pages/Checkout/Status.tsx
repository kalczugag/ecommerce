import { useOrder } from "@/contexts/OrderContext";
import useStep from "@/modules/CheckoutModule/hooks/useStep";
import CartProductItem from "@/modules/CartModule/components/CartProductItem";
import NotFound from "@/components/NotFound";
import MessageBox from "@/components/MessageBox";

const CheckoutStatus = () => {
    const { order, isLoading } = useOrder();
    const [activeStep] = useStep();

    return (
        <div>
            {activeStep === "success" ? (
                <>
                    <MessageBox
                        title="Payment Successful"
                        message="Congratulations, your order get placed"
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
                </>
            ) : activeStep === "cancel" ? (
                <>
                    <MessageBox
                        variant="error"
                        title="Payment Cancelled"
                        message="Congratulations, your order get placed"
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
                </>
            ) : (
                <NotFound />
            )}
        </div>
    );
};

export default CheckoutStatus;
