import InfiniteCarousel from "@/components/InfiniteCarousel";
import ProductCard from "@/components/ProductCard";
import { useGetAllProductsQuery } from "@/store";

interface FeaturedBarProps {
    category: string;
    productLoading: boolean;
}

const FeaturedBar = ({ category, productLoading }: FeaturedBarProps) => {
    const { data, isFetching } = useGetAllProductsQuery({
        limit: 8,
        category,
    });

    const renderedProducts = data?.result.map((product, index) => (
        <ProductCard
            size="sm"
            key={product._id + "_" + index}
            data={product}
            isLoading={isFetching}
        />
    ));

    return (
        data?.result && (
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
            />
        )
    );
};

export default FeaturedBar;
