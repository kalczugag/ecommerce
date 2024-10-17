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
                        <DeliveryForm isLoading={isLoading || isUpdating} />
                        <div className="flex justify-end col-span-2">
                            <Button
                                variant="contained"
                                type="submit"
                                className="col-span-2"
                                disabled={isUpdating}
                            >
                                Use this address
                            </Button>
                        </div>
                    </form>
                );
            }}
        />
    );
};

export default DeliveryModule;
