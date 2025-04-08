import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import useAuth from "@/hooks/useAuth";
import { useTitle } from "@/hooks/useTitle";
import CartModule from "@/modules/CartModule";

const Cart = () => {
    useTitle("Cart");
    const { token } = useAuth();

    useEffect(() => {
        if (!token) {
            enqueueSnackbar("Please login first", { variant: "warning" });
        }
    }, []);

    return <CartModule />;
};

export default Cart;
