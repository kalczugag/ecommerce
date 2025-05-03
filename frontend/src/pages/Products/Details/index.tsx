import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import { useAnalytics } from "@/hooks/useAnalytics";
import ReadProductDetailsModule from "@/modules/ProductsModule/ReadProductDetailsModule";
import NotFound from "@/components/NotFound";

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const { data, isFetching, isError } = useGetProductByIdQuery(id || "");
    const { trackEvent } = useAnalytics();
    useTitle(data?.result.title || (!isFetching ? "Product - Details" : ""));

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
    }, [location.pathname]);

    if (isError || (!isFetching && !data?.result)) return <NotFound />;

    const config = {
        isLoading: isFetching,
    };

    return <ReadProductDetailsModule config={config} data={data?.result} />;
};

export default ProductDetails;
