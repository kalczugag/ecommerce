import { cloneElement, isValidElement, ReactElement, ReactNode } from "react";
import { Form, FormSpy } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Loading from "../Loading";
import AlertDialog from "../AlertDialog";
import Review from "../Review";

interface UpdateModalProps {
    formElements: ReactNode;
    initialValues: any;
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
                mutators={{
                    ...arrayMutators,
                }}
                initialValues={initialValues}
                render={({ handleSubmit, values }) => (
                    <form onSubmit={handleSubmit}>
                        <FormSpy subscription={{ values: true }}>
                            {({ values }) => (
                                <>
                                    {isValidElement(formElements) ? (
                                        cloneElement(
                                            formElements as ReactElement,
                                            {
                                                formValues: values,
                                            }
                                        )
                                    ) : (
                                        <div />
                                    )}
                                </>
                            )}
                        </FormSpy>
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
                                confirm="Yes"
                                onConfirm={handleSubmit}
                            >
                                {(props) => (
                                    <Button
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
