import { useNavigate } from "react-router-dom";
import { useAddOrderMutation, useEditUsersCartMutation } from "@/store";
import useAuth from "@/hooks/useAuth";
import DefaultLayout from "@/layouts/DefaultLayout";
import Loading from "@/components/Loading";
import CheckoutSummary from "./components/CheckoutSummary";
import EmptyCart from "./components/EmptyCart";
import CartProductItem from "./components/CartProductItem";
import type { Cart } from "@/types/Cart";
import type { Sizes } from "../ProductsModule/ReadProductModule";

interface CartModuleProps {
    data?: Cart;
    isLoading: boolean;
}

const CartModule = ({ data, isLoading }: CartModuleProps) => {
    const navigate = useNavigate();
    const { token } = useAuth();

    const [editCart, { isLoading: editLoading }] = useEditUsersCartMutation();
    const [addOrder, { isLoading: addLoading }] = useAddOrderMutation();

    const handleQuantityChange = (
        productId: string,
        quantity: number,
        size: Sizes,
        color: string
    ) => {
        editCart({
            _id: data?._id,
            action: "changeQuantity",
            productId,
            quantity,
            size,
            color,
        });
    };

    const handleDelete = (productId: string, size: Sizes, color: string) => {
        editCart({ _id: data?._id, action: "delete", productId, size, color });
    };

    const handleCheckout = async () => {
        if (!token) {
            navigate("/login");
        }

        const productsWithIds = data!._products.map((product) => ({
            ...product,
            product: product.product?._id || "",
        }));

        const orderPayload = {
            items: productsWithIds,
            deliveryCost: data!.deliveryCost,
            subTotal: data!.subTotal,
            discount: data!.discount,
            total: data!.total,
        };

        try {
            const result = await addOrder(orderPayload);
            const orderId = result.data?.data._id;

            if (orderId) {
                navigate(`/checkout/${orderId}/delivery`);
            }
        } catch (error) {
            console.error("Error while adding order:", error);
        }
    };

    return (
        <Loading isLoading={isLoading || editLoading}>
            <DefaultLayout>
                {data && data?._products.length > 0 ? (
                    <div className="flex flex-col items-center space-y-10 md:flex-row md:justify-between md:items-start md:space-x-10 md:space-y-0">
                        <div className="flex flex-col space-y-6 w-full">
                            {data._products.map((product, index) => (
                                <CartProductItem
                                    key={product.product?._id + "_" + index}
                                    data={product}
                                    isLoading={editLoading}
                                    onQuantityChange={handleQuantityChange}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                        <CheckoutSummary
                            data={data}
                            isLoading={isLoading || editLoading || addLoading}
                            handleCheckout={handleCheckout}
                        />
                    </div>
                ) : (
                    <EmptyCart />
                )}
            </DefaultLayout>
        </Loading>
    );
};

export default CartModule;
