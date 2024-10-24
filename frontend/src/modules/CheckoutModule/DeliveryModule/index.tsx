import { Form } from "react-final-form";
import { useUpdateOrderMutation } from "@/store";
import { useOrder } from "@/contexts/OrderContext";
import DeliveryForm from "@/forms/DeliveryForm";
import AdditionalInfoForm from "@/forms/AdditionalInfoForm";
import useStep from "../hooks/useStep";
import { Button } from "@mui/material";

const DeliveryModule = () => {
    const { order, isLoading } = useOrder();
    const [_, nextStep] = useStep();
    const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();

    const handleSubmit = (values: any) => {
        updateOrder({
            _id: order?._id,
            paymentMethod: "stripe",
            deliveryMethod: "delivery",
            additionalInfo: values.additionalInfo,
        });
        nextStep();
    };

    return (
        <Form
            onSubmit={handleSubmit}
            initialValues={order?._user}
            render={({ handleSubmit }) => {
                return (
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-flow-row gap-8 pt-6 md:grid-cols-2"
                    >
                        <AdditionalInfoForm
                            isLoading={isLoading || isUpdating}
                        />
                        <DeliveryForm
                            isLoading={isLoading || isUpdating || true}
                        />
                        <div className="flex justify-end md:col-span-2">
                            <div className="flex flex-col items-center space-y-2">
                                <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={isUpdating}
                                >
                                    Use this address
                                </Button>
                                <span className="text-sm text-gray-500 underline">
                                    Cannot edit address
                                </span>
                            </div>
                        </div>
                    </form>
                );
            }}
        />
    );
};

export default DeliveryModule;
