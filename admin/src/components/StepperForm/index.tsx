import { useState, cloneElement } from "react";
import { useSearchParams } from "react-router-dom";
import { Form } from "react-final-form";
import {
    Box,
    Button,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import type { StepProps } from "@/types/Step";
import AlertDialog from "../AlertDialog";
import Review from "../Review";

interface StepperFormProps {
    content: {
        label: string;
        element: (props: StepProps) => JSX.Element;
    }[];
    initialValues?: any;
    className?: string;
    onSubmit?: (values: any) => void;
}

const StepperForm = ({
    content,
    initialValues,
    className,
    onSubmit,
}: StepperFormProps) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const activeStep = parseInt(searchParams.get("step") || "0");

    const setActiveStep = (newValue: number) => {
        setSearchParams({ step: newValue.toString() });
    };

    const [formValues, setFormValues] = useState<any>(initialValues || {});
    const [completed, setCompleted] = useState<{ [key: number]: boolean }>({});

    const totalSteps = () => content.length;
    const completedSteps = () => Object.keys(completed).length;
    const isLastStep = () => activeStep === totalSteps() - 1;
    const allStepsCompleted = () => completedSteps() === totalSteps();

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? content.findIndex((_, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleComplete = (stepValues: any) => {
        const updatedFormValues = {
            ...formValues,
            ...stepValues,
        };
        setFormValues(updatedFormValues);

        const newCompleted = {
            ...completed,
            [activeStep]: true,
        };
        setCompleted(newCompleted);

        const newCompletedCount = Object.keys(newCompleted).length;
        if (newCompletedCount === totalSteps()) {
            if (onSubmit) {
                onSubmit(updatedFormValues);
            }
            return;
        }

        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
        setFormValues(initialValues || {});
    };

    const currentStepProps = {
        handleNext,
        handleBack,
        handleComplete,
        handleReset,
        formValues,
    };

    return (
        <div>
            <Stepper activeStep={activeStep}>
                {content.map(({ label }, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Form
                onSubmit={handleComplete}
                initialValues={{ ...initialValues, ...formValues }}
                render={({ handleSubmit, form }) => (
                    <form onSubmit={handleSubmit}>
                        {allStepsCompleted() ? (
                            <>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Review values={form.getState().values} />
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        pt: 2,
                                    }}
                                >
                                    <Box sx={{ flex: "1 1 auto" }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        mt: 6,
                                    }}
                                    className={className}
                                >
                                    {content[activeStep] ? (
                                        cloneElement(
                                            content[activeStep].element(
                                                currentStepProps
                                            )
                                        )
                                    ) : (
                                        <Typography>
                                            No content available for this step.
                                        </Typography>
                                    )}
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        pt: 2,
                                    }}
                                >
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                    <Box sx={{ flex: "1 1 auto" }} />
                                    {completed[activeStep] ? (
                                        <Button
                                            onClick={handleNext}
                                            sx={{ mr: 1 }}
                                            disabled={isLastStep()}
                                        >
                                            Next
                                        </Button>
                                    ) : isLastStep() ? (
                                        <AlertDialog
                                            title="Are you sure?"
                                            content={
                                                <Review
                                                    values={
                                                        form.getState().values
                                                    }
                                                />
                                            }
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
                                    ) : (
                                        <Button
                                            type="submit"
                                            variant="contained"
                                        >
                                            Next
                                        </Button>
                                    )}
                                </Box>
                            </>
                        )}
                    </form>
                )}
            />
        </div>
    );
};

export default StepperForm;
