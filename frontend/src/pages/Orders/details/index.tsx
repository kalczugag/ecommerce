import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "@/store";
import DefaultLayout from "@/layouts/DefaultLayout";
import NotFound from "@/components/NotFound";

const OrderDetails = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetOrderByIdQuery(id || "");

    if (isError || (!isLoading && !data)) return <NotFound />;

    return (
        <DefaultLayout>
            {data &&
                Object.entries(data).map(([key, value], index) => (
                    <div key={index}>
                        <strong>{key}: </strong>
                        <span>{JSON.stringify(value)}</span>
                    </div>
                ))}
        </DefaultLayout>
    );
};

export default OrderDetails;
