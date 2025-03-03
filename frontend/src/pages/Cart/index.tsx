import { useEffect } from "react";
import { useGetUsersCartQuery } from "@/store";
import { enqueueSnackbar } from "notistack";
import useAuth from "@/hooks/useAuth";
import { useTitle } from "@/hooks/useTitle";
import CartModule from "@/modules/CartModule";

const Cart = () => {
    useTitle("Cart");
    const { token } = useAuth();
    const { data, isFetching } = useGetUsersCartQuery(undefined, {
        skip: !token,
    });

    useEffect(() => {
        if (!token) {
            enqueueSnackbar("Please login first", { variant: "warning" });
        }
    }, []);

    return <CartModule data={data?.result} isLoading={isFetching} />;
};

export default Cart;
