import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import { useAnalytics } from "@/hooks/useAnalytics";
import ReadProductDetailsModule from "@/modules/ProductsModule/ReadProductDetailsModule";
import NotFound from "@/components/NotFound";

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useGetProductByIdQuery(id || "");
    const { trackEvent } = useAnalytics();
    useTitle(data?.result.title || (!isLoading ? "Product - Details" : ""));

    useEffect(() => {
        if (data?.result) {
            trackEvent("product_view", {
                pageUrl: window.location.href,
                pageTitle: document.title,
                _product: data.result._id,
                _category: data.result.thirdLevelCategory._id,
            });
        }
    }, [data?.result]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isError || (!isLoading && !data?.result)) return <NotFound />;

    const config = {
        isLoading,
    };

    return <ReadProductDetailsModule config={config} data={data?.result} />;
};

export default ProductDetails;
