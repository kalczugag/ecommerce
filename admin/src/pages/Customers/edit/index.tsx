import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "react-final-form";
import { useGetUserByIdQuery, useEditUserMutation } from "@/store";
import { useTitle } from "@/hooks/useTitle";
import CrudModule from "@/modules/CrudModule";
import CustomerForm from "@/forms/CustomerForm";
import NotFound from "@/components/NotFound";
import { Button } from "@mui/material";
import type { User } from "@/types/User";

const CustomersEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    useTitle("Customers - Edit");

    const { data, isSuccess } = useGetUserByIdQuery(id || "");
    const [editUser, result] = useEditUserMutation();

    useEffect(() => {
        if (result.isSuccess) navigate("/customers");
    }, [result.isSuccess]);

    if (!data || !isSuccess) {
        return <NotFound />;
    }

    const handleSubmit = (values: User) => {
        editUser(values);
    };

    const FormContainer = () => {
        return (
            <Form
                onSubmit={handleSubmit}
                initialValues={data}
                render={({ handleSubmit }) => (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-4"
                    >
                        <CustomerForm isLoading={result.isLoading} />
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
