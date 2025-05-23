import { cloneElement, isValidElement, ReactElement, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormSpy } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { Button, Divider } from "@mui/material";
import Loading from "../Loading";
import AlertDialog from "../AlertDialog";
import Review from "../Review";
import FormValuesDisplay from "../FormValuesDisplay";

interface CreateFormProps {
    formElements: ReactNode;
    initialValues?: any;
    isLoading: boolean;
    formValuesDisplay?: boolean;
    className?: string;
    handleSubmit: (values: any) => void;
}

const CreateForm = ({
    handleSubmit,
    formElements,
    initialValues,
    isLoading,
    className,
    formValuesDisplay,
}: CreateFormProps) => {
    const navigate = useNavigate();

    return (
        <Loading isLoading={isLoading}>
            <Form
                onSubmit={handleSubmit}
                initialValues={initialValues}
                mutators={{
                    ...arrayMutators,
                }}
                render={({ handleSubmit, values }) => (
                    <form onSubmit={handleSubmit}>
                        <FormSpy subscription={{ values: true }}>
                            {({ values }) => (
                                <div
                                    className={
                                        formValuesDisplay
                                            ? "flex flex-col md:flex-row"
                                            : ""
                                    }
                                >
                                    <div className={`flex-1 ${className}`}>
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
                                    </div>
                                    {formValuesDisplay && (
                                        <>
                                            <Divider
                                                flexItem
                                                orientation="vertical"
                                                sx={{ mx: 2 }}
                                            />
                                            <FormValuesDisplay
                                                values={values}
                                            />
                                        </>
                                    )}
                                </div>
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
