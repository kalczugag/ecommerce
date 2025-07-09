import { useNavigate } from "react-router-dom";
import { useAddUserMutation } from "@/store";
import { enqueueSnackbar } from "notistack";
import { useTitle } from "@/hooks/useTitle";
import CreateForm from "@/components/CreateForm";
import CustomerForm from "@/forms/CustomerForm";
import CrudModule from "@/modules/CrudModule";
import type { User } from "@/types/User";

const CustomersAdd = () => {
    const navigate = useNavigate();
    const [addCategory, result] = useAddUserMutation();

    useTitle("Customer - Add");

    const handleSubmit = async (values: User) => {
        try {
            await addCategory(values).unwrap();
            navigate(-1);
            enqueueSnackbar("Customer added successfully", {
                variant: "success",
            });
        } catch (error) {
            enqueueSnackbar("Failed to add customer", { variant: "error" });
        }
    };

    return (
        <CrudModule
            actionForm={
                <CreateForm
                    handleSubmit={handleSubmit}
                    initialValues={{ emailVerified: false }}
                    isLoading={result.isLoading}
                    buttonText="Create customer"
                    formElements={<CustomerForm isLoading={result.isLoading} />}
                />
            }
        />
    );
};

export default CustomersAdd;
