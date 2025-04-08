import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useAddReviewMutation } from "@/store";
import Loading from "@/components/Loading";
import ReviewForm from "@/forms/ReviewForm";
import DefaultLayout from "@/layouts/DefaultLayout";
import type { Item, Order } from "@/types/Order";
import { Button, Divider, useMediaQuery } from "@mui/material";
import { useHandleMutation } from "@/hooks/useHandleMutation";

interface ReviewModuleProps {
    orderData?: Order;
    itemData?: Item;
    isLoading: boolean;
}

interface FormValues {
    rating: number;
    message?: string;
    pros?: string;
    cons?: string;
}

const ReviewModule = ({
    orderData,
    itemData,
    isLoading,
}: ReviewModuleProps) => {
    const { handleMutation } = useHandleMutation();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const navigate = useNavigate();

    const [addReview, { isLoading: isAdding }] = useAddReviewMutation();

    const handleSubmit = (values: FormValues) => {
        const formattedValues = {
            pros: values.pros?.trim().split(","),
            cons: values.cons?.trim().split(","),
            value: values.rating,
            _product: itemData?._product._id,
            _order: orderData?._id,
            message: values.message,
        };

        handleMutation({
            mutation: addReview,
            values: formattedValues,
            errorMessage: "Failed to add review",
            onSuccess: () => navigate(-1),
        });
    };

    return (
        <Loading isLoading={isLoading}>
            <DefaultLayout
                direction={isMobile ? "column" : "row"}
                className="justify-center space-x-4"
            >
                {itemData && orderData?.createdAt && (
                    <>
                        <img
                            src={`${itemData._product.imageUrl[0]}?imwidth=144`}
                            alt={itemData._product.title}
                            className="max-w-28 max-h-28 object-contain object-top md:max-w-36 md:max-h-36"
                        />
                        <div className="flex flex-col spacey-2">
                            <p>{itemData._product.title}</p>
                            <div className="flex text-sm text-gray-600">
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
                            </div>
                            <Form
                                onSubmit={handleSubmit}
                                render={({ handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>
                                        <ReviewForm isMobile={isMobile} />
                                        <Divider sx={{ my: 4 }} />
                                        <div className="flex justify-between">
                                            <Button
                                                type="button"
                                                onClick={() => navigate(-1)}
                                            >
                                                Cancel
                                            </Button>
                                            <div className="flex space-x-2">
                                                <Button
                                                    type="button"
                                                    variant="outlined"
                                                >
                                                    Review later
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    disabled={isAdding}
                                                >
                                                    Add
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
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
