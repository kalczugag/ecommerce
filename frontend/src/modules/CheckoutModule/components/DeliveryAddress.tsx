import { Form } from "react-final-form";
import DeliveryForm from "@/forms/DeliveryForm";
import { useGetCurrentUserQuery } from "@/store";
import AdditionalInfoForm from "@/forms/AdditionalInfoForm";

interface DeliveryAddressProps {
    isLoading?: boolean;
}

const DeliveryAddress = ({ isLoading = false }: DeliveryAddressProps) => {
    const { data } = useGetCurrentUserQuery();

    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <div className="grid grid-flow-row gap-8 pt-6 md:grid-cols-2">
            <Form
                onSubmit={handleSubmit}
                initialValues={data}
                render={({ handleSubmit }) => {
                    return (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <AdditionalInfoForm isLoading={isLoading} />
                        </form>
                    );
                }}
            />
            <Form
                onSubmit={handleSubmit}
                initialValues={data}
                render={({ handleSubmit }) => {
                    // onValidate(async () => form.submit());
                    return (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <DeliveryForm isLoading={isLoading} />
                        </form>
                    );
                }}
            />
        </div>
    );
};

export default DeliveryAddress;
