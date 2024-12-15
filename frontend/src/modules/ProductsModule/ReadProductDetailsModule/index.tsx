import { useEditUsersCartMutation } from "@/store";
import { useSnackbar } from "notistack";
import useAuth from "@/hooks/useAuth";
import DefaultLayout from "@/layouts/DefaultLayout";
import DetailsProductCard from "./components/DetailsProductCard";
import type { Product } from "@/types/Product";
import type { ShortReviewsCount } from "@/types/Review";

export type Sizes = string;

interface ReadProductModuleProps {
    config: {
        rating: ShortReviewsCount;
        isLoading: boolean;
    };
    data?: Product;
}

const ReadProductModule = ({ config, data }: ReadProductModuleProps) => {
    const { rating, isLoading } = config;
    const { cartId, token } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const [editCart, { isLoading: editLoading }] = useEditUsersCartMutation();

    const handleAddToCart = async (size: Sizes | null) => {
        if (!size) {
            enqueueSnackbar("Please select a size", {
                variant: "warning",
            });
        } else if (token && cartId) {
            {
                try {
                    await editCart({
                        _id: cartId,
                        action: "add",
                        _product: data?._id || "",
                        color: data?.color,
                        size,
                        unitPrice: data?.price,
                        quantity: 1,
                    }).unwrap();

                    enqueueSnackbar("Product added to cart successfully", {
                        variant: "success",
                    });
                } catch (error) {
                    enqueueSnackbar("Failed to add product to cart", {
                        variant: "error",
                    });
                }
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
                rating={rating}
                onAddToCart={handleAddToCart}
            />
        </DefaultLayout>
    );
};

export default ReadProductModule;
