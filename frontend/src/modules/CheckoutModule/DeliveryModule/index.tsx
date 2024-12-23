import { Form } from "react-final-form";
import { useUpdateOrderMutation, useUpdateUserMutation } from "@/store";
import { useOrder } from "@/contexts/OrderContext";
import DeliveryForm from "@/forms/DeliveryForm";
import AdditionalInfoForm from "@/forms/AdditionalInfoForm";
import DeliveryMethodForm from "@/forms/DeliveryMethodForm";
import useStep from "./hooks/useStep";
import { Button, Divider } from "@mui/material";
import type { ShippingAddress } from "@/types/Order";
import { DeliveryMethod, Provider } from "@/types/DeliveryMethod";

interface DeliveryFormProps {
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
    _deliveryMethod: string;
    address?: ShippingAddress;
    additionalInfo?: string;
}

interface DeliveryModuleProps {
    data: DeliveryMethod[];
    isDeliveryLoading: boolean;
}

const DeliveryModule = ({ data, isDeliveryLoading }: DeliveryModuleProps) => {
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
            _deliveryMethod: values._deliveryMethod,
            shippingAddress: values.address,
            billingAddress: values.address,
        });

        if (!isUpdatingOrder && !isUpdatingUser && values.address) nextStep();
    };

    const loading =
        isLoading || isUpdatingOrder || isUpdatingUser || isDeliveryLoading;

    return (
        <Form
            onSubmit={handleSubmit}
            initialValues={order?._user}
            render={({ handleSubmit }) => {
                return (
                    <form onSubmit={handleSubmit} className="py-6">
                        <div className="flex flex-col-reverse md:flex-row md:space-x-8">
                            <div className="flex-1">
                                <Divider
                                    className="block md:hidden"
                                    sx={{ mt: 4, mb: 4 }}
                                />

                                <DeliveryMethodForm
                                    content={data}
                                    isLoading={loading}
                                />

                                <Divider sx={{ mt: 4, mb: 4 }} />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <DeliveryForm isLoading={loading} />

                                <Divider
                                    sx={{
                                        mt: 4,
                                        mb: 4,
                                    }}
                                />

                                <AdditionalInfoForm isLoading={loading} />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                sx={{ mt: 4 }}
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
