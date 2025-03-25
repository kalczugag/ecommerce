import { useNavigate } from "react-router-dom";
import {
    useAddOrderMutation,
    useEditUsersCartMutation,
    useGetUsersCartQuery,
    setDrawer,
} from "@/store";
import useAuth from "./useAuth";
import { useHandleMutation } from "./useHandleMutation";
import { useAnalytics } from "./useAnalytics";
import { useAppDispatch } from "./useStore";

const useCart = (condition = true) => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const dispatch = useAppDispatch();

    const { data, isFetching } = useGetUsersCartQuery(undefined, {
        skip: !token || !condition,
    });

    const { handleMutation } = useHandleMutation();
    const { trackEvent } = useAnalytics();

    const [editCart, { isLoading: editLoading }] = useEditUsersCartMutation();
    const [addOrder, { isLoading: addLoading }] = useAddOrderMutation();

    const toggleDrawer = (newOpen: boolean) => {
        dispatch(setDrawer(newOpen));
    };

    const handleQuantityChange = async (id: string, quantity: number) => {
        handleMutation({
            values: {
                cartId: data?.result._id,
                action: "changeQuantity",
                _id: id,
                quantity,
            },
            mutation: editCart,
            snackbar: false,
        });
    };

    const handleDelete = async (id: string) => {
        console.log(data);
        handleMutation({
            values: {
                cartId: data?.result._id,
                action: "delete",
                _id: id,
            },
            mutation: editCart,
            onSuccess: () => {
                trackEvent("remove_from_cart", {
                    _cart: data?.result._id,
                    _product: id,
                });
            },
            snackbar: false,
        });
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

    const isEmpty = data?.result.items.length === 0;

    const loading = {
        edit: editLoading,
        add: addLoading,
        get: isFetching,
    };

    return {
        data,
        loading,
        isEmpty,
        toggleDrawer,
        handleCheckout,
        handleDelete,
        handleQuantityChange,
    };
};

export default useCart;
