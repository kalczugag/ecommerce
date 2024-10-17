import { ReactNode } from "react";
import { useOrder } from "@/contexts/OrderContext";
import { Container, Step, StepLabel, Stepper } from "@mui/material";
import useStep from "@/modules/CheckoutModule/hooks/useStep";

interface CheckoutLayoutProps {
    children: ReactNode;
}

const CheckoutLayout = ({ children }: CheckoutLayoutProps) => {
    const { steps } = useOrder();
    const [activeStep] = useStep();

    const activeStepIndex = steps.indexOf(activeStep || "");

    return (
        <Container maxWidth="xl">
            {activeStep !== "cancel" && (
                <Stepper
                    nonLinear
                    activeStep={activeStepIndex}
                    sx={{ marginY: "24px" }}
                >
                    {steps.map((label, index) => (
                        <Step key={label} completed={index < activeStepIndex}>
                            <StepLabel color="inherit">{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            )}
            {children}
        </Container>
    );
};

export default CheckoutLayout;
