import { useNavigate, useParams } from "react-router-dom";
import { useGetUserByIdQuery, useEditUserMutation } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import { enqueueSnackbar } from "notistack";
import CrudModule from "@/modules/CrudModule";
import CustomerForm from "@/forms/CustomerForm";
import NotFound from "@/components/NotFound";
import UpdateForm from "@/components/UpdateForm";
import type { User } from "@/types/User";

const CustomersEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    useTitle("Customer - Edit");

    const { data, isError, isLoading } = useGetUserByIdQuery(id || "");
    const [editUser, result] = useEditUserMutation();

    if (isError || (!isLoading && !data)) return <NotFound />;

    const handleSubmit = async (values: User) => {
        try {
            await editUser(values).unwrap();
            navigate(-1);
            enqueueSnackbar("User updated successfully", {
                variant: "success",
            });
        } catch (error) {
            enqueueSnackbar("Failed to update category", {
                variant: "error",
            });
        }
    };

    return (
        <CrudModule
            actionForm={
                <UpdateForm
                    initialValues={data}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading || result.isLoading}
                    formElements={<CustomerForm isLoading={result.isLoading} />}
                />
            }
        />
    );
};

export default CustomersEdit;
