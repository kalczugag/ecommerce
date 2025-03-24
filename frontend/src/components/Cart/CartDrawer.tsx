import { useAnalytics } from "@/hooks/useAnalytics";
import useAuth from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setDrawer, useAddOrderMutation, useGetUsersCartQuery } from "@/store";
import { Box, Button, Divider, Drawer } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const CartDrawer = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { token } = useAuth();
    const { drawerOpen } = useAppSelector((state) => state.cart);
    const { trackEvent } = useAnalytics();
    const { data, isFetching } = useGetUsersCartQuery(undefined, {
        skip: !drawerOpen || !token,
    });

    const [addOrder, { isLoading: addLoading }] = useAddOrderMutation();

    const toggleDrawer = (newOpen: boolean) => {
        dispatch(setDrawer(newOpen));
    };

    const handleCheckout = async () => {
        if (!token) {
            navigate("/login");
        }

        const productIds = data?.result.items.map((item) => item._id!);

        const orderPayload = {
            items: productIds!,
            subTotal: data!.result.subTotal,
            discount: data?.result.discount,
            total: data!.result.total,
        };

        try {
            const result = await addOrder(orderPayload);
            const orderId = result.data?.result._id;

            if (orderId) {
                trackEvent("begin_checkout", {
                    _cart: data?.result._id,
                    _order: orderId,
                });
                navigate(`/checkout/${orderId}/delivery`);
                toggleDrawer(false);
            }
        } catch (error) {
            console.error("Error while adding order:", error);
        }
    };

    return (
        <Drawer
            open={drawerOpen}
            onClose={() => toggleDrawer(false)}
            anchor="right"
        >
            <Box
                sx={{
                    minWidth: 400,
                    p: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 4,
                }}
                role="presentation"
                onClick={() => toggleDrawer(false)}
            >
                <h3 className="text-center font-semibold text-lg">
                    Your Cart{" "}
                    <span className="font-normal text-sm text-gray-600">
                        ({data?.result.items.length || 0})
                    </span>
                </h3>
                <Divider />
                <div className="flex-1 space-y-4 h-full overflow-y-auto">
                    {data?.result.items.map((item) => (
                        <Link
                            key={item._id}
                            to={`/product/${item._product._id}`}
                            onClick={() => toggleDrawer(false)}
                            className="flex justify-between space-x-4 mr-2"
                        >
                            <img
                                src={`${item._product.imageUrl[0]}?imwidth=100`}
                                className="w-20 h-20 border object-top object-cover"
                                alt={item._product.title}
                            />
                            <div className="flex-1 flex flex-col text-gray-600 text-sm">
                                <p className="font-semibold text-black">
                                    {item._product.title}
                                </p>
                                <p>Size: {item.size}</p>
                                <p className="font-semibold mt-2">
                                    ${item.total?.toFixed(2)}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
                <Divider />
                <div className="flex justify-between items-end space-x-6">
                    <div className="whitespace-nowrap">
                        <span className="text-sm text-gray-500">Subtotal:</span>{" "}
                        <span className="text-xl">
                            ${data?.result.total.toFixed(2)}
                        </span>
                    </div>
                    <Button
                        variant="contained"
                        onClick={handleCheckout}
                        disabled={addLoading || isFetching}
                    >
                        Checkout
                    </Button>
                </div>
            </Box>
        </Drawer>
    );
};

export default CartDrawer;
