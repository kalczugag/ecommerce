import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-final-form";
import { Button } from "@mui/material";
import Loading from "../Loading";
import AlertDialog from "../AlertDialog";
import Review from "../Review";

interface CreateFormProps {
    formElements: ReactNode;
    initialValues?: any;
    isLoading: boolean;
    handleSubmit: (values: any) => void;
}

const CreateForm = ({
    handleSubmit,
    formElements,
    initialValues,
    isLoading,
}: CreateFormProps) => {
    const navigate = useNavigate();

    return (
        <Loading isLoading={isLoading}>
            <Form
                onSubmit={handleSubmit}
                initialValues={initialValues}
                render={({ handleSubmit, values }) => (
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
                            <AlertDialog
                                title="Are you sure?"
                                content={<Review values={values} />}
                                cancel="Cancel"
                                confirm="Submit"
                                onConfirm={handleSubmit}
                            >
                                {(props) => (
                                    <Button
                                        variant="contained"
                                        onClick={props.open}
                                    >
                                        Submit
                                    </Button>
                                )}
                            </AlertDialog>
                        </div>
                    </form>
                )}
            />
        </Loading>
    );
};

export default CreateForm;
