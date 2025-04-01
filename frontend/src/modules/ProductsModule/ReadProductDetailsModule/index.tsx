import { useEditUsersCartMutation, ProductResult, setDrawer } from "@/store";
import { useSnackbar } from "notistack";
import useAuth from "@/hooks/useAuth";
import { useAppDispatch } from "@/hooks/useStore";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import DefaultLayout from "@/layouts/DefaultLayout";
import DetailsProductCard from "./components/DetailsProductCard";

export type Sizes = string;

interface ReadProductModuleProps {
    config: {
        isLoading: boolean;
    };
    data?: ProductResult;
}

const ReadProductModule = ({ config, data }: ReadProductModuleProps) => {
    const { isLoading } = config;
    const dispatch = useAppDispatch();
    const { cartId, token } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const { trackEvent } = useAnalytics();
    const { handleMutation } = useHandleMutation();

    const [editCart, { isLoading: editLoading }] = useEditUsersCartMutation();

    const toggleDrawer = (newOpen: boolean) => {
        dispatch(setDrawer(newOpen));
    };

    const handleAddToCart = async (size: Sizes | null) => {
        if (!size) {
            enqueueSnackbar("Please select a size", {
                variant: "warning",
            });
        } else if (data && token && cartId) {
            {
                const itemPrice =
                    (data.discountPercent ?? 0) > 0
                        ? data.price -
                          (data.price * (data.discountPercent ?? 1)) / 100
                        : data.price;

                handleMutation({
                    values: {
                        cartId,
                        _product: data._id,
                        action: "add",
                        color: data.color,
                        size,
                        unitPrice: itemPrice,
                        quantity: 1,
                    },
                    mutation: editCart,
                    onSuccess: () => {
                        toggleDrawer(true);
                        trackEvent("add_to_cart", {
                            _cart: cartId,
                            _product: data._id,
                        });
                    },
                    snackbar: false,
                });
            }
        } else {
            enqueueSnackbar("Please log in to add items to your cart.", {
                variant: "warning",
            });
        }
    };

    return (
        <DefaultLayout className="items-center">
            <DetailsProductCard
                data={data}
                isLoading={isLoading}
                editLoading={editLoading}
                onAddToCart={handleAddToCart}
            />
        </DefaultLayout>
    );
};

export default ReadProductModule;
