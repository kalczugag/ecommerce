import { ReactNode } from "react";
import {
    Skeleton,
    Container,
    Step,
    StepLabel,
    Stepper,
    useMediaQuery,
} from "@mui/material";
import { orderStatuses } from "@/constants/orderStatuses";
import { checkoutSteps } from "@/constants/checkoutSteps";
import { useSearchParams } from "react-router-dom";

interface CheckoutLayoutProps {
    children: ReactNode;
}

const CheckoutLayout = ({ children }: CheckoutLayoutProps) => {
    const isMobile = useMediaQuery("(max-width: 1024px)");
    const [searchParams] = useSearchParams();

    const activeStep = searchParams.get("step");
    const orderSteps = Object.values(orderStatuses);

    const activeCheckoutStepIndex = checkoutSteps.indexOf(activeStep || "");

    const showCheckoutStatus =
        activeStep !== "cancel" && activeStep !== "success";

    return (
        <Container maxWidth="lg">
            {showCheckoutStatus ? (
                <Stepper
                    nonLinear
                    activeStep={activeCheckoutStepIndex}
                    sx={{ marginY: "24px" }}
                >
                    {checkoutSteps.map((label, index) => (
                        <Step
                            key={label}
                            completed={index < activeCheckoutStepIndex}
                        >
                            <StepLabel color="inherit">{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            ) : (
                <Stepper
                    nonLinear
                    activeStep={activeCheckoutStepIndex}
                    sx={{ marginY: "24px" }}
                >
                    {isMobile ? (
                        <Step>
                            <StepLabel>
                                Status: {activeCheckoutStepIndex}
                            </StepLabel>
                        </Step>
                    ) : (
                        orderSteps.map((label, index) => {
                            if (label === "Cancelled") return;

                            return (
                                <Step
                                    key={label}
                                    completed={index < activeCheckoutStepIndex}
                                >
                                    <StepLabel color="inherit">
                                        {label}
                                    </StepLabel>
                                </Step>
                            );
                        })
                    )}
                </Stepper>
            )}

            {children}
        </Container>
    );
};

export default CheckoutLayout;
