import { useParams } from "react-router-dom";
import { useGetProductByIdQuery, useGetReviewsByProductIdQuery } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import ReadProductDetailsModule from "@/modules/ProductsModule/ReadProductDetailsModule";
import NotFound from "@/components/NotFound";

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useGetProductByIdQuery(id || "");
    const { data: rating } = useGetReviewsByProductIdQuery(id || "");

    useTitle(data?.title || (!isLoading ? "Product - Details" : ""));

    if (isError || (!isLoading && !data)) return <NotFound />;

    const config = {
        rating: { count: rating?.count || 0, value: rating?.value || 0 },
        isLoading,
    };

    return <ReadProductDetailsModule config={config} data={data} />;
};

export default ProductDetails;
