import DefaultLayout from "@/layouts/DefaultLayout";
import type { Cart } from "@/types/Cart";
import Loading from "@/components/Loading";

interface CartModuleProps {
    data?: Cart;
    isLoading: boolean;
}

const CartModule = ({ data, isLoading }: CartModuleProps) => {
    console.log(data);

    return (
        <Loading isLoading={isLoading}>
            <DefaultLayout>Cart</DefaultLayout>
        </Loading>
    );
};

export default CartModule;
