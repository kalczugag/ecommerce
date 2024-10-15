import { Form } from "react-final-form";
import { useOrder } from "@/contexts/OrderContext";
import DeliveryForm from "@/forms/DeliveryForm";
import AdditionalInfoForm from "@/forms/AdditionalInfoForm";

const DeliveryAddress = () => {
    const { order, isLoading } = useOrder();

    const handleSubmit = (values: any) => {
        console.log(values);
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
                        <AdditionalInfoForm isLoading={isLoading} />
                        <DeliveryForm isLoading={isLoading} />
                    </form>
                );
            }}
        />
    );
};

export default DeliveryAddress;
