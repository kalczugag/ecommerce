import { Form } from "react-final-form";
import { useUpdateOrderMutation, useUpdateUserMutation } from "@/store";
import { useOrder } from "@/contexts/OrderContext";
import DeliveryForm from "@/forms/DeliveryForm";
import AdditionalInfoForm from "@/forms/AdditionalInfoForm";
import useStep from "./hooks/useStep";
import { Button } from "@mui/material";
import { Address } from "@/types/User";

interface DeliveryFormProps {
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
    address?: Address;
    additionalInfo?: string;
}

const DeliveryModule = () => {
    const { order, isLoading } = useOrder();
    const [_, nextStep] = useStep();
    const [updateOrder, { isLoading: isUpdatingOrder }] =
        useUpdateOrderMutation();
    const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();

    const handleSubmit = async (values: DeliveryFormProps) => {
        if (values.address && order?._user?._id) {
            await updateUser({
                _id: order?._user?._id,
                address: values.address,
            });
        }

        await updateOrder({
            _id: order?._id,
            paymentMethod: "stripe",
            deliveryMethod: "delivery",
            additionalInfo: values.additionalInfo,
        });

        if (!isUpdatingOrder && !isUpdatingUser && values.address) nextStep();
    };

    const loading = isLoading || isUpdatingOrder || isUpdatingUser;

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
                        <AdditionalInfoForm isLoading={loading} />
                        <DeliveryForm isLoading={loading} />
                        <div className="flex justify-end md:col-span-2">
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={isUpdatingOrder || isUpdatingUser}
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
