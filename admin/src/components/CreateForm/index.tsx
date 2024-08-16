import { ReactNode } from "react";
import { Form } from "react-final-form";
import { Button } from "@mui/material";
import Loading from "../Loading";

interface CreateFormProps {
    formElements: ReactNode;
    isLoading: boolean;
    handleSubmit: (values: any) => void;
}

const CreateForm = ({
    handleSubmit,
    formElements,
    isLoading,
}: CreateFormProps) => {
    return (
        <Loading isLoading={isLoading}>
            <Form
                onSubmit={handleSubmit}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        {formElements}
                        <Button
                            className="mt-8"
                            type="submit"
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </form>
                )}
            />
        </Loading>
    );
};

export default CreateForm;
