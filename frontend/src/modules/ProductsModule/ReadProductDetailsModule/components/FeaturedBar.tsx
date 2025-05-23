import InfiniteCarousel from "@/components/InfiniteCarousel";
import ProductCard from "@/components/ProductCard";
import { useGetAllProductsQuery } from "@/store";
import { CircularProgress, Divider } from "@mui/material";

interface FeaturedBarProps {
    category: string;
    productLoading: boolean;
}

const FeaturedBar = ({ category, productLoading }: FeaturedBarProps) => {
    const { data, isFetching, isSuccess } = useGetAllProductsQuery({
        limit: 8,
        category,
    });

    const renderedProducts = data?.result.map((product, index) => (
        <ProductCard
            size="sm"
            key={product._id + "_" + index}
            data={product}
            className="mr-4"
            isLoading={isFetching}
        />
    ));

    return (
        <div className={isFetching ? "text-center" : ""}>
            {isSuccess ? (
                <>
                    <Divider sx={{ my: 6 }} />
                    <h1 className="text-2xl font-semibold">Recommendations</h1>
                    <InfiniteCarousel
                        content={renderedProducts || []}
                        isLoading={isFetching || productLoading}
                        bgColor={{
                            primary: "#ffffff",
                            secondary: "#EFEFF0",
                        }}
                        textColor={{
                            primary: "#000000",
                            secondary: "#ffffff",
                        }}
                        customConfig={[
                            {
                                breakpoint: 1280,
                                settings: {
                                    slidesToShow: 4,
                                    slidesToScroll: 1,
                                },
                            },
                            {
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 1,
                                },
                            },
                            {
                                breakpoint: 600,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 1,
                                },
                            },
                        ]}
                    />
                </>
            ) : (
                isFetching && <CircularProgress sx={{ mt: 12 }} />
            )}
        </div>
    );
};

export default FeaturedBar;
