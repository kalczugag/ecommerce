import { useNavigate } from "react-router-dom";
import {
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

        try {
            // trackEvent("begin_checkout", {
            //     _cart: data?.result._id,
            // });
            navigate("/checkout");
            toggleDrawer(false);
        } catch (error) {
            console.error("Error while adding order:", error);
        }
    };

    const isEmpty = data?.result.items.length === 0;

    const loading = {
        edit: editLoading,
        // add: addLoading,
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
