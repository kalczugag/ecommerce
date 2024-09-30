import { useGetUsersCartQuery } from "@/store";
import useAuth from "@/hooks/useAuth";
import CartModule from "@/modules/CartModule";

const Cart = () => {
    const { token } = useAuth();
    const { data, isFetching } = useGetUsersCartQuery(undefined, {
        skip: !token,
    });

    return <CartModule data={data} isLoading={isFetching} />;
};

export default Cart;
