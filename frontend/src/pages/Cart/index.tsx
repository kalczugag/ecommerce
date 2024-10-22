import { useGetUsersCartQuery } from "@/store";
import useAuth from "@/hooks/useAuth";
import CartModule from "@/modules/CartModule";
import { useEffect } from "react";
import { useSnackbar } from "notistack";

const Cart = () => {
    const { token } = useAuth();
    const { data, isFetching } = useGetUsersCartQuery(undefined, {
        skip: !token,
    });
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (!token) {
            enqueueSnackbar("Please login first", { variant: "warning" });
        }
    }, []);

    return <CartModule data={data} isLoading={isFetching} />;
};

export default Cart;
