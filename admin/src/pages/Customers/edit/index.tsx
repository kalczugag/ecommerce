import { useNavigate, useParams } from "react-router-dom";
import { useGetUserByIdQuery, useEditUserMutation } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import CrudModule from "@/modules/CrudModule";
import CustomerForm from "@/forms/CustomerForm";
import NotFound from "@/components/NotFound";
import UpdateForm from "@/components/UpdateForm";
import type { User } from "@/types/User";

const CustomersEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    useTitle("Customers - Edit");

    const { data, isError, isLoading } = useGetUserByIdQuery(id || "");
    const [editUser, result] = useEditUserMutation();

    if (isError || (!isLoading && !data)) return <NotFound />;

    const handleSubmit = async (values: User) => {
        await editUser(values);
        navigate(-1);
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
