import { useEffect } from "react";
import { useGetUsersCartQuery } from "@/store";
import { enqueueSnackbar } from "notistack";
import useAuth from "@/hooks/useAuth";
import CartModule from "@/modules/CartModule";

const Cart = () => {
    const { token } = useAuth();
    const { data, isFetching } = useGetUsersCartQuery(undefined, {
        skip: !token,
    });

    useEffect(() => {
        if (!token) {
            enqueueSnackbar("Please login first", { variant: "warning" });
        }
    }, []);

    return <CartModule data={data} isLoading={isFetching} />;
};

export default Cart;
