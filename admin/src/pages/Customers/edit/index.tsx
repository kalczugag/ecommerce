import { Form } from "react-final-form";
import { useTitle } from "@/hooks/useTitle";
import CrudModule from "@/modules/CrudModule";
import CustomerForm from "@/forms/CustomerForm";
import { Button } from "@mui/material";

const CustomersEdit = () => {
    useTitle("Customers - Edit");

    const handleSubmit = (values: any) => {
        console.log(values);
    };

    const FormContainer = () => {
        return (
            <Form
                onSubmit={handleSubmit}
                render={({ handleSubmit }) => (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-4"
                    >
                        <CustomerForm isLoading={false} />
                        <div>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ mt: 4 }}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                )}
            />
        );
    };

    return (
        <CrudModule
            config={{
                topLabel: "Edit Customer",
            }}
            actionForm={<FormContainer />}
            handleSubmit={handleSubmit}
            formOnly
        />
    );
};

export default CustomersEdit;
