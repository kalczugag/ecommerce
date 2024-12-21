import { Form } from "react-final-form";
import { useUpdateOrderMutation, useUpdateUserMutation } from "@/store";
import { useOrder } from "@/contexts/OrderContext";
import DeliveryForm from "@/forms/DeliveryForm";
import AdditionalInfoForm from "@/forms/AdditionalInfoForm";
import DeliveryMethodForm, {
    DeliveryMethodContentProps,
} from "@/forms/DeliveryMethodForm";
import useStep from "./hooks/useStep";
import { Button, Divider } from "@mui/material";
import type { Order, ShippingAddress } from "@/types/Order";

const content: DeliveryMethodContentProps[] = [
    {
        label: "Home Delivery",
        value: "homeDelivery",
        items: [
            //in future it will be dynamic based on available delivery methods
            {
                _id: "1",
                label: "DPD",
                value: "dpd",
                price: 5,
                expectedDelivery: new Date(),
            },
            {
                _id: "2",
                label: "DHL",
                value: "dhl",
                price: 5,
                expectedDelivery: new Date(),
            },
            {
                _id: "3",
                label: "GLS",
                value: "gls",
                price: 5,
                expectedDelivery: new Date(),
            },
        ],
    },
    {
        label: "Pickup point",
        value: "pickupPoint",
        items: [
            //in future it will be dynamic based on available delivery methods
            {
                _id: "4",
                label: "DPD",
                value: "dpd",
                price: 5,
                expectedDelivery: new Date(),
            },
            {
                _id: "5",
                label: "DHL",
                value: "dhl",
                price: 5,
                expectedDelivery: new Date(),
            },
            {
                _id: "6",
                label: "GLS",
                value: "gls",
                price: 5,
                expectedDelivery: new Date(),
            },
        ],
    },
    {
        label: "In store pickup",
        value: "inStorePickup",
        items: [
            //in future it will be dynamic based on available delivery methods
            {
                _id: "7",
                value: "dpd",
                price: 5,
                address: {
                    street: "123 Main St",
                    city: "New York",
                    state: "NY",
                    postalCode: "10001",
                    country: "USA",
                },
            },
        ],
    },
];

interface DeliveryFormProps {
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
    deliveryMethod: Order["deliveryMethod"];
    address?: ShippingAddress;
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
            deliveryMethod: values.deliveryMethod,
            additionalInfo: values.additionalInfo,
            shippingAddress: values.address,
            billingAddress: values.address,
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
                        className="grid grid-flow-row gap-8 py-6 md:grid-cols-2"
                    >
                        <div className="flex flex-col">
                            <AdditionalInfoForm isLoading={loading} />
                            <Divider sx={{ mt: 4, mb: 2 }} />
                            <DeliveryMethodForm
                                content={content}
                                isLoading={isUpdatingOrder || isUpdatingUser}
                            />
                            <Divider sx={{ mt: 4, mb: 2 }} />
                        </div>
                        <div>
                            <DeliveryForm isLoading={loading} />

                            <div className="flex justify-end md:col-span-2">
                                <Button
                                    sx={{ mt: 4 }}
                                    variant="contained"
                                    type="submit"
                                    disabled={isUpdatingOrder || isUpdatingUser}
                                >
                                    Use this address
                                </Button>
                            </div>
                        </div>
                    </form>
                );
            }}
        />
    );
};

export default DeliveryModule;
