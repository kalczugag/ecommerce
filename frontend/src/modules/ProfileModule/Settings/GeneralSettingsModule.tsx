import { Form } from "react-final-form";
import DeliveryMethodForm, {
    DeliveryMethodContentProps,
} from "@/forms/DeliveryMethodForm";

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

const GeneralSettingsModule = () => {
    const handleSubmit = (value: string) => {
        console.log(value);
    };

    return (
        <Form
            onSubmit={handleSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <DeliveryMethodForm content={content} isLoading={false} />
                </form>
            )}
        />
    );
};

export default GeneralSettingsModule;
