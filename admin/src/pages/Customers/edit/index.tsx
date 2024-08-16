import { useParams } from "react-router-dom";
import { useGetUserByIdQuery, useEditUserMutation } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import CrudModule from "@/modules/CrudModule";
import CustomerForm from "@/forms/CustomerForm";
import NotFound from "@/components/NotFound";
import type { User } from "@/types/User";
import UpdateForm from "@/components/UpdateForm";

const CustomersEdit = () => {
    const { id } = useParams();
    useTitle("Customers - Edit");

    const { data, isSuccess, isLoading } = useGetUserByIdQuery(id || "");
    const [editUser, result] = useEditUserMutation();

    console.log(data);

    if (!data && !isSuccess && !isLoading) return <NotFound />;

    const handleSubmit = (values: User) => {
        editUser(values);
    };

    return (
        <CrudModule
            actionForm={
                <UpdateForm
                    initialValues={data || []}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                    formElements={<CustomerForm isLoading={result.isLoading} />}
                />
            }
        />
    );
};

export default CustomersEdit;
