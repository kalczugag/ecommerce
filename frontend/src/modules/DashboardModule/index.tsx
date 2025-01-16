import { useGetFeaturedCampaignQuery } from "@/store";
import useAuth from "@/hooks/useAuth";
import { Skeleton } from "@mui/material";
import ProductCard from "@/components/ProductCard";
import InfiniteCarousel from "@/components/InfiniteCarousel";

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
            variant="highlighted"
            isLoading={isLoading}
            showRating
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
                <InfiniteCarousel
                    name={data.data[0].name}
                    description={data.data[0].description}
                    content={content || []}
                    isLoading={isFetching}
                    bgColor={data.data[0].bgColor}
                    textColor={data.data[0].textColor}
                />
            )}
        </div>
    );
};

export default DashboardModule;
