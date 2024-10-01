import { useRef, useState } from "react";
import {
    Box,
    Button,
    Step,
    Stepper,
    Typography,
    StepLabel,
} from "@mui/material";
import DeliveryAddress from "./DeliveryAddress";
import OrderSummary from "./OrderSummary";
import Payment from "./Payment";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const steps = [
    {
        label: "Delivery Address",
        content: (onValidate: any) => (
            <DeliveryAddress onValidate={onValidate} />
        ),
    },
    { label: "Order Summary", content: <OrderSummary /> },
    { label: "Payment", content: <Payment /> },
];

const TabsWithStepper = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{
        [k: number]: boolean;
    }>({});
    const submitHandlers = useRef<(() => Promise<any>)[]>([]);

    const totalSteps = () => steps.length;
    const completedSteps = () => Object.keys(completed).length;
    const isLastStep = () => activeStep === totalSteps() - 1;
    const allStepsCompleted = () => completedSteps() === totalSteps();

    const handleNext = async () => {
        const result = await submitHandlers.current[activeStep]?.();
        if (result !== undefined && !result.error) {
            const newActiveStep =
                isLastStep() && !allStepsCompleted()
                    ? steps.findIndex((_, i) => !(i in completed))
                    : activeStep + 1;
            setActiveStep(newActiveStep);
        }
    };

    const handleBack = () =>
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const handleComplete = async () => {
        const result = await submitHandlers.current[activeStep]?.();
        console.log(result);
        if (result !== undefined && !result.error) {
            setCompleted({ ...completed, [activeStep]: true });
            handleNext();
        }
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
                        {steps.map(({ content }, index) => (
                            <CustomTabPanel
                                key={index}
                                value={activeStep}
                                index={index}
                            >
                                {typeof content === "function"
                                    ? content(
                                          (submit: any) =>
                                              (submitHandlers.current[index] =
                                                  submit)
                                      )
                                    : content}
                            </CustomTabPanel>
                        ))}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
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
                            {activeStep !== steps.length &&
                                (completed[activeStep] ? (
                                    <Typography
                                        variant="caption"
                                        sx={{ display: "inline-block" }}
                                    >
                                        Step {activeStep + 1} already completed
                                    </Typography>
                                ) : (
                                    <Button onClick={handleComplete}>
                                        {completedSteps() === totalSteps() - 1
                                            ? "Finish"
                                            : "Complete Step"}
                                    </Button>
                                ))}
                        </Box>
                    </>
                )}
            </div>
        </Box>
    );
};

export default TabsWithStepper;
