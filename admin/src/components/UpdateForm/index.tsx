import { ReactNode } from "react";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Loading from "../Loading";

interface CreateFormProps {
    formElements: ReactNode;
    initialValues: any[];
    isLoading: boolean;
    handleSubmit: (values: any) => void;
}

const CreateForm = ({
    handleSubmit,
    initialValues,
    formElements,
    isLoading,
}: CreateFormProps) => {
    const navigate = useNavigate();

    return (
        <Loading isLoading={isLoading}>
            <Form
                onSubmit={handleSubmit}
                initialValues={initialValues}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        {formElements}
                        <div className="flex space-x-2 mt-8">
                            <Button
                                type="button"
                                variant="contained"
                                color="inherit"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained">
                                Save
                            </Button>
                        </div>
                    </form>
                )}
            />
        </Loading>
    );
};

export default CreateForm;
