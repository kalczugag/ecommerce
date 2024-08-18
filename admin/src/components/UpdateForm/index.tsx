import { ReactNode } from "react";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Loading from "../Loading";
import AlertDialog from "../AlertDialog";

interface UpdateModalProps {
    formElements: ReactNode;
    initialValues: any[];
    isLoading: boolean;
    handleSubmit: (values: any) => void;
}

const UpdateForm = ({
    handleSubmit,
    initialValues,
    formElements,
    isLoading,
}: UpdateModalProps) => {
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
                            <AlertDialog
                                title="Are you sure?"
                                content="You won't be able to revert this!"
                                cancel="Cancel"
                                confirm="Yes"
                                onConfirm={handleSubmit}
                            >
                                {(props) => (
                                    <Button
                                        type="button"
                                        variant="contained"
                                        onClick={props.open}
                                    >
                                        Save
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

export default UpdateForm;
