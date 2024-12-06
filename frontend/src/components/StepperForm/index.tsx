import { useState, cloneElement, useEffect } from "react";
import {
    Box,
    Button,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import { Form } from "react-final-form";
import type { StepProps } from "@/modules/OrderModule/OrderReturnModule/types/Step";

interface StepperFormProps {
    content: {
        label: string;
        element: (props: StepProps) => JSX.Element;
    }[];
}

const StepperForm = ({ content }: StepperFormProps) => {
    const [formValues, setFormValues] = useState<any>({});
    const [activeStep, setActiveStep] = useState(0);
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
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleComplete = (stepValues: any) => {
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

    useEffect(() => {
        console.log(formValues);
    }, [formValues]);

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
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        {allStepsCompleted() ? (
                            <>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
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
                                    <Button onClick={handleNext} sx={{ mr: 1 }}>
                                        Next
                                    </Button>
                                    {activeStep !== content.length &&
                                        (completed[activeStep] ? (
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    display: "inline-block",
                                                }}
                                            >
                                                Step {activeStep + 1} already
                                                completed
                                            </Typography>
                                        ) : (
                                            <Button type="submit">
                                                {completedSteps() ===
                                                totalSteps() - 1
                                                    ? "Finish"
                                                    : "Complete Step"}
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
