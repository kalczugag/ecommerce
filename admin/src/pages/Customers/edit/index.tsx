import { useParams } from "react-router-dom";
import { useGetUserByIdQuery, useEditUserMutation } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import CrudModule from "@/modules/CrudModule";
import CustomerForm from "@/forms/CustomerForm";
import NotFound from "@/components/NotFound";
import UpdateForm from "@/components/UpdateForm";
import type { User } from "@/types/User";

const CustomersEdit = () => {
    const { id } = useParams();
    useTitle("Customers - Edit");

    const { data, isError, isLoading } = useGetUserByIdQuery(id || "");
    const [editUser, result] = useEditUserMutation();

    if (isError || (!isLoading && !data)) return <NotFound />;

    const handleSubmit = (values: User) => {
        editUser(values);
    };

    return (
        <CrudModule
            actionForm={
                <UpdateForm
                    initialValues={data}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                    formElements={<CustomerForm isLoading={result.isLoading} />}
                />
            }
        />
    );
};

export default CustomersEdit;
