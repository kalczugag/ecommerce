import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddOrderMutation, useEditUsersCartMutation } from "@/store";
import { enqueueSnackbar } from "notistack";
import useAuth from "@/hooks/useAuth";
import DefaultLayout from "@/layouts/DefaultLayout";
import Loading from "@/components/Loading";
import CheckoutSummary from "./components/CheckoutSummary";
import EmptyCart from "./components/EmptyCart";
import CartProductItem from "./components/CartProductItem";
import type { Cart } from "@/types/Cart";

interface CartModuleProps {
    data?: Cart;
    isLoading: boolean;
}

const CartModule = ({ data, isLoading }: CartModuleProps) => {
    const navigate = useNavigate();
    const { token } = useAuth();

    const [editCart, { isLoading: editLoading }] = useEditUsersCartMutation();
    const [addOrder, { isLoading: addLoading }] = useAddOrderMutation();

    const handleQuantityChange = async (id: string, quantity: number) => {
        await editCart({
            cartId: data?._id,
            action: "changeQuantity",
            _id: id,
            quantity,
        });
    };

    const handleDelete = async (id: string) => {
        try {
            await editCart({
                cartId: data?._id,
                action: "delete",
                _id: id,
            }).unwrap();

            enqueueSnackbar("Product removed from cart successfully", {
                variant: "success",
            });
        } catch (error) {
            enqueueSnackbar("Failed to remove product from cart", {
                variant: "error",
            });
        }
    };

    const handleCheckout = async () => {
        if (!token) {
            navigate("/login");
        }

        const productIds = data?.items.map((item) => item._id!);

        const orderPayload = {
            items: productIds!,
            deliveryCost: data!.deliveryCost,
            subTotal: data!.subTotal,
            discount: data?.discount,
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
        <Loading isLoading={isLoading}>
            <DefaultLayout>
                {data && data?.items.length > 0 ? (
                    <div className="flex flex-col items-center space-y-10 md:flex-row md:justify-between md:items-start md:space-x-10 md:space-y-0">
                        <div className="flex flex-col space-y-6 w-full">
                            {data.items.map((item, index) => (
                                <CartProductItem
                                    key={item._product?._id + "_" + index}
                                    data={item}
                                    isLoading={editLoading}
                                    onQuantityChange={handleQuantityChange}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                        <CheckoutSummary
                            data={data}
                            isLoading={isLoading || addLoading}
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
