import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "@/store";
import ReadProductModule from "@/modules/ProductsModule/ReadProductModule";
import NotFound from "@/components/NotFound";

const ProductDetails = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetProductByIdQuery(id || "");

    if (isError || (!isLoading && !data)) return <NotFound />;

    const config = {
        isLoading,
    };

    return <ReadProductModule config={config} data={data} />;
};

export default ProductDetails;
