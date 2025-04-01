import { Form } from "react-final-form";
import moment from "moment";
import Loading from "@/components/Loading";
import ReviewForm from "@/forms/ReviewForm";
import DefaultLayout from "@/layouts/DefaultLayout";
import type { Item, Order } from "@/types/Order";
import { Divider } from "@mui/material";

interface ReviewModuleProps {
    orderData?: Order;
    itemData?: Item;
    isLoading: boolean;
}

const ReviewModule = ({
    orderData,
    itemData,
    isLoading,
}: ReviewModuleProps) => {
    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <Loading isLoading={isLoading}>
            <DefaultLayout direction="row" className="space-x-4">
                {itemData && orderData?.createdAt && (
                    <>
                        <img
                            src={`${itemData._product.imageUrl[0]}?imwidth=144`}
                            alt={itemData._product.title}
                            className="max-w-36 max-h-36 object-cover object-top"
                        />
                        <div className="flex flex-col spacey-2">
                            <p>{itemData._product.title}</p>
                            <p className="flex text-sm text-gray-600">
                                <span>
                                    bought:{" "}
                                    {moment(orderData.createdAt).format(
                                        "DD MMMM YYYY"
                                    )}
                                </span>

                                <Divider
                                    orientation="vertical"
                                    sx={{ mx: 1 }}
                                    flexItem
                                />

                                <span>brand: {itemData._product.brand}</span>
                            </p>
                            <Form
                                onSubmit={handleSubmit}
                                render={({ handleSubmit }) => (
                                    <ReviewForm data={itemData} />
                                )}
                            />
                        </div>
                    </>
                )}
            </DefaultLayout>
        </Loading>
    );
};

export default ReviewModule;
