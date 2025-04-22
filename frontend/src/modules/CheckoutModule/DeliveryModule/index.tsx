import { Form } from "react-final-form";
import { updateCheckout, useUpdateUserMutation } from "@/store";
import DeliveryForm from "@/forms/DeliveryForm";
import AdditionalInfoForm from "@/forms/AdditionalInfoForm";
import DeliveryMethodForm from "@/forms/DeliveryMethodForm";
import useStep from "./hooks/useStep";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { Button, Divider } from "@mui/material";
import type { ShippingAddress } from "@/types/Order";
import type { DeliveryMethod, Provider } from "@/types/DeliveryMethod";

interface DeliveryFormProps {
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
    _deliveryMethod: string;
    shippingAddress: ShippingAddress;
    billingAddress: ShippingAddress;
    additionalInfo?: string;
    sameAsShipping: any;
}

interface DeliveryModuleProps {
    data: DeliveryMethod[];
    isDeliveryLoading: boolean;
}

const findProviderById = (
    content: DeliveryMethod[],
    providerId: string | undefined
): Provider | undefined => {
    for (const method of content) {
        const provider = method.providers.find(
            (provider) => provider._id === providerId
        );
        if (provider) return provider;
    }
    return undefined;
};

const DeliveryModule = ({ data, isDeliveryLoading }: DeliveryModuleProps) => {
    const dispatch = useAppDispatch();
    const { products, total, userData, shippingAddress, billingAddress } =
        useAppSelector((state) => state.checkout);
    const [_, nextStep] = useStep();
    const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();

    const handleSubmit = async (values: DeliveryFormProps) => {
        const selectedProvider = findProviderById(data, values._deliveryMethod);

        if (values.shippingAddress && userData?._id) {
            dispatch(
                updateCheckout({
                    _deliveryMethod: values._deliveryMethod,
                    deliveryCost: selectedProvider?.price,
                    total: total + (selectedProvider?.price || 0),
                    shippingAddress: values.shippingAddress,
                    billingAddress: values.sameAsShipping
                        ? values.shippingAddress
                        : values.billingAddress,
                })
            );

            await updateUser({
                _id: userData._id,
                address: values.shippingAddress,
            });
        }

        const shipmentsData = [
            {
                shipFrom: {
                    street: "Człuchowska 92",
                    city: "Warsaw",
                    state: "Masovian",
                    postalCode: "01-360",
                    country: "Poland",
                },
                shipTo: shippingAddress,
                _deliveryMethod: values._deliveryMethod,
                shippingCost: total > 100 ? 0 : selectedProvider?.price,
                itemsDelivered: 0,
            },
        ];

        const orderData = {
            items: products,
            shippingAddress: shippingAddress,
            billingAddress: billingAddress,
        };

        if (!isUpdatingUser && shippingAddress) nextStep();
    };

    const loading = isUpdatingUser || isDeliveryLoading;

    return (
        <Form
            onSubmit={handleSubmit}
            initialValues={{
                firstName: userData?.firstName,
                lastName: userData?.lastName,
                shippingAddress: userData?.address,
                sameAsShipping: true,
            }}
            subscription={{
                submitting: true,
                pristine: true,
                error: true,
                touched: true,
            }}
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
                                    orderDeliveryCost={
                                        total > 100 ? 0 : undefined
                                    }
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
                                disabled={isUpdatingUser}
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
