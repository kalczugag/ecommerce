import { Form } from "react-final-form";
import DeliveryForm from "@/forms/DeliveryForm";

interface DeliveryAddressProps {
    onValidate: (submit: () => Promise<any>) => void;
}

const DeliveryAddress = ({ onValidate }: DeliveryAddressProps) => {
    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <div className="grid grid-cols-2">
            <div>additional info</div>
            <Form
                onSubmit={async (values) => {
                    const errors: any = {};
                    if (!values.firstName)
                        errors.firstName = "First Name is required";
                    if (!values.lastName)
                        errors.lastName = "Last Name is required";
                    if (!values.address?.street)
                        errors.street = "Street is required";
                    if (!values.address?.city) errors.city = "City is required";
                    if (!values.address?.state)
                        errors.state = "State is required";
                    if (!values.address?.postalCode)
                        errors.postalCode = "Postal Code is required";
                    if (!values.address?.country)
                        errors.country = "Country is required";

                    return Object.keys(errors).length > 0
                        ? errors
                        : handleSubmit;
                }}
                render={({ handleSubmit, form }) => {
                    onValidate(async () => form.submit());
                    return (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <DeliveryForm isLoading={false} />
                        </form>
                    );
                }}
            />
        </div>
    );
};

export default DeliveryAddress;
