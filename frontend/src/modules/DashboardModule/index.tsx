import { useGetFeaturedCampaignQuery } from "@/store";
import useAuth from "@/hooks/useAuth";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@mui/material";
import Carousel from "@/components/Carousel";

const DashboardModule = () => {
    const { token } = useAuth();

    const options = {
        populate:
            "products.title,products.brand,products.description,products.imageUrl,products.price,products.discountPercent,products.discountedPrice",
    };

    const { data, isLoading, isFetching } = useGetFeaturedCampaignQuery(
        options,
        {
            skip: !token,
        }
    );

    const content = data?.data[0].products.map((product) => (
        <ProductCard
            key={product._id}
            data={product}
            size="sm"
            variant="highlighted"
            isLoading={isLoading}
        />
    ));

    return (
        <div className="my-8">
            {isLoading || !data ? (
                <div className="flex flex-row space-x-4 items-center justify-center">
                    <Skeleton variant="rectangular" height={150} width={300} />
                    <Skeleton variant="rectangular" height={150} width={300} />
                    <Skeleton variant="rectangular" height={150} width={300} />
                    <Skeleton variant="rectangular" height={150} width={300} />
                </div>
            ) : (
                <Carousel
                    content={content || []}
                    isLoading={isFetching}
                    colors={data.data[0].colors}
                />
            )}
        </div>
    );
};

export default DashboardModule;
