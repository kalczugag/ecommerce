import { ReactNode, useState } from "react";
import {
    Box,
    Button,
    Step,
    Stepper,
    Typography,
    StepLabel,
} from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import useStep from "../hooks/useStep";
import type { Step as StepProps } from "@/types/Order";

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ paddingY: 3 }}>{children}</Box>}
        </div>
    );
};

const TabsWithStepper = ({ steps }: { steps: StepProps[] }) => {
    const [setActiveStep, activeStep] = useStep();
    const [completed, setCompleted] = useState<{
        [k: number]: boolean;
    }>({});

    const totalSteps = () => steps.length;
    const completedSteps = () => Object.keys(completed).length;
    const isLastStep = () => activeStep === totalSteps() - 1;
    const allStepsCompleted = () => completedSteps() === totalSteps();

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? steps.findIndex((_, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () =>
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const handleComplete = () => {
        setCompleted({ ...completed, [activeStep]: true });
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map(({ label }, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepLabel color="inherit">{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {steps.map(({ content }, index) => (
                    <CustomTabPanel
                        key={index}
                        value={activeStep}
                        index={index}
                    >
                        {content}
                    </CustomTabPanel>
                ))}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        pt: 2,
                    }}
                >
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                        back
                    </Button>
                    {activeStep !== steps.length && (
                        <Button
                            variant="contained"
                            endIcon={<NavigateNext />}
                            onClick={
                                completed[activeStep]
                                    ? handleNext
                                    : handleComplete
                            }
                        >
                            {steps[activeStep + 1]
                                ? steps[activeStep + 1].label
                                : ""}
                        </Button>
                    )}
                </Box>
            </div>
        </Box>
    );
};

export default TabsWithStepper;
