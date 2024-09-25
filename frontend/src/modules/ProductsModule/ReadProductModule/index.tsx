import DefaultLayout from "@/layouts/DefaultLayout";
import DetailsProductCard from "../components/DetailsProductCard";
import Loading from "@/components/Loading";
import type { Product } from "@/types/Product";
import type { ShortReviewsCount } from "@/types/Review";

interface ReadProductModuleProps {
    config: {
        rating: ShortReviewsCount;
        isLoading: boolean;
    };
    data?: Product;
}

const ReadProductModule = ({ config, data }: ReadProductModuleProps) => {
    const { rating, isLoading } = config;

    return (
        <Loading isLoading={isLoading}>
            <DefaultLayout className="items-center">
                {data && <DetailsProductCard data={data} rating={rating} />}
            </DefaultLayout>
        </Loading>
    );
};

export default ReadProductModule;
