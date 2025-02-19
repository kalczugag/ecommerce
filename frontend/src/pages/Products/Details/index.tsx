import { useParams } from "react-router-dom";
import { useGetProductByIdQuery, useGetReviewsByProductIdQuery } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import ReadProductDetailsModule from "@/modules/ProductsModule/ReadProductDetailsModule";
import NotFound from "@/components/NotFound";

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useGetProductByIdQuery(id || "");
    const { data: rating } = useGetReviewsByProductIdQuery(id || "");

    useTitle(data?.result.title || (!isLoading ? "Product - Details" : ""));

    if (isError || (!isLoading && !data?.result)) return <NotFound />;

    const config = {
        rating: {
            count: rating?.result.count || 0,
            value: rating?.result.value || 0,
        },
        isLoading,
    };

    return <ReadProductDetailsModule config={config} data={data?.result} />;
};

export default ProductDetails;
