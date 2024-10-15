import Loading from "@/components/Loading";
import Box from "@/components/Box";
import { useOrder } from "@/contexts/OrderContext";
import CartProductItem from "@/modules/CartModule/components/CartProductItem";
import Contact from "./Contact";
import CheckoutSummary from "@/modules/CartModule/components/CheckoutSummary";
import type { Cart } from "@/types/Cart";

const OrderSummary = () => {
    const { order, isLoading } = useOrder();

    const cartProps: Cart = {
        _user: order?._user?._id || "",
        _products: order?.items || [],
        subTotal: order?.subTotal || 0,
        discount: order?.discount || 0,
        deliveryCost: order?.deliveryCost || 0,
        total: order?.total || 0,
    };

    const handleCheckout = () => {
        console.log("s");
    };

    return (
        <Loading isLoading={isLoading} className="space-y-4">
            <Box>
                <Contact data={order?._user} />
            </Box>
            <div className="flex flex-col items-center space-y-10 md:flex-row md:justify-between md:items-start md:space-x-10 md:space-y-0">
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
                <CheckoutSummary
                    data={cartProps}
                    isLoading={isLoading}
                    handleCheckout={handleCheckout}
                    isSummary
                />
            </div>
        </Loading>
    );
};

export default OrderSummary;
