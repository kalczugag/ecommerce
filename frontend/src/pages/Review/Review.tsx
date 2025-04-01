import { useSearchParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "@/store";
import ReviewModule from "@/modules/ReviewModule";
import NotFound from "@/components/NotFound";

const Review = () => {
    const [searchParams] = useSearchParams();

    const orderId = searchParams.get("orderId");
    const productId = searchParams.get("productId");

    const { data, isLoading, isError } = useGetOrderByIdQuery(orderId || "", {
        skip: !orderId,
    });

    if (isError || (!isLoading && !data?.result)) return <NotFound />;

    const foundItem = (data?.result.items || []).find(
        (item) => item._product._id === productId
    );

    return (
        <ReviewModule
            orderData={data?.result}
            itemData={foundItem}
            isLoading={isLoading}
        />
    );
};

export default Review;
