import { useEditUsersCartMutation } from "@/store";
import useAuth from "@/hooks/useAuth";
import DefaultLayout from "@/layouts/DefaultLayout";
import DetailsProductCard from "../components/DetailsProductCard";
import Loading from "@/components/Loading";
import type { Product } from "@/types/Product";
import type { ShortReviewsCount } from "@/types/Review";

export type Sizes = "S" | "M" | "L";

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

    const [editCart, { isLoading: editLoading }] = useEditUsersCartMutation();

    const handleAddToCart = (size: Sizes) => {
        if (token && cartId) {
            editCart({
                _id: cartId,
                action: "add",
                productId: data!._id!,
                color: data?.color,
                size,
                unitPrice: data?.price,
                quantity: 1,
            });
        }
    };

    return (
        <Loading isLoading={isLoading}>
            <DefaultLayout className="items-center">
                {data && (
                    <DetailsProductCard
                        data={data}
                        isLoading={editLoading}
                        rating={rating}
                        onAddToCart={handleAddToCart}
                    />
                )}
            </DefaultLayout>
        </Loading>
    );
};

export default ReadProductModule;
