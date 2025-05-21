import { useState, cloneElement, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
    Box,
    Button,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import { Form } from "react-final-form";
import type { StepProps } from "@/types/Step";

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

    useEffect(() => {
        setActiveStep(activeStep);
    }, [activeStep]);

    const [formValues, setFormValues] = useState<any>({});
    const [completed, setCompleted] = useState<{ [key: number]: boolean }>({});

    const totalSteps = () => content.length;
    const completedSteps = () => Object.keys(completed).length;
    const isLastStep = () => activeStep === totalSteps() - 1;
    const allStepsCompleted = () => completedSteps() === totalSteps();

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                  content.findIndex((_, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleComplete = (stepValues: any) => {
        if (allStepsCompleted() && onSubmit) {
            onSubmit(formValues);
            return;
        }

        setFormValues((prev: any) => ({
            ...prev,
            ...stepValues,
        }));
        setCompleted({
            ...completed,
            [activeStep]: true,
        });
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
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
                initialValues={initialValues}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        {!allStepsCompleted() && (
                            <>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        mt: 6,
                                    }}
                                    className={className}
                                >
                                    {/* here are rendering components from contend */}

                                    {cloneElement(
                                        content[activeStep].element(
                                            currentStepProps
                                        )
                                    ) || (
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
                                    {activeStep !== content.length &&
                                        (completed[activeStep] ? (
                                            <Button
                                                onClick={handleNext}
                                                sx={{ mr: 1 }}
                                            >
                                                Next
                                            </Button>
                                        ) : (
                                            <Button type="submit">
                                                {completedSteps() ===
                                                totalSteps() - 1
                                                    ? "Submit"
                                                    : "Next"}
                                            </Button>
                                        ))}
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
