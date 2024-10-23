import { ReactNode } from "react";
import { useOrder } from "@/contexts/OrderContext";
import { Box, Container, Step, StepLabel, Stepper } from "@mui/material";
import useIsMobile from "@/hooks/useIsMobile";
import useStep from "@/modules/CheckoutModule/hooks/useStep";
import type { Order } from "@/types/Order";

interface CheckoutLayoutProps {
    children: ReactNode;
}

const orderStatuses: Record<NonNullable<Order["status"]>, string> = {
    placed: "Placed",
    confirmed: "Confirmed",
    shipped: "Shipped",
    in_delivery: "In Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
};

const CheckoutLayout = ({ children }: CheckoutLayoutProps) => {
    const isMobile = useIsMobile();
    const { steps, order } = useOrder();
    const [activeStep] = useStep();

    const orderSteps = Object.values(orderStatuses);

    const activeCheckoutStepIndex = steps.indexOf(activeStep || "");
    const activeOrderStepIndex = order
        ? Object.keys(orderStatuses).indexOf(order.status || "")
        : -1;

    const showCheckoutStatus =
        activeStep !== "cancel" && activeStep !== "success";

    return (
        <Container maxWidth="xl">
            {showCheckoutStatus ? (
                <Stepper
                    nonLinear
                    activeStep={activeCheckoutStepIndex}
                    sx={{ marginY: "24px" }}
                >
                    {steps.map((label, index) => (
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
                    activeStep={activeOrderStepIndex}
                    sx={{ marginY: "24px" }}
                >
                    {isMobile ? (
                        <Step>
                            <StepLabel>Status: {order?.status}</StepLabel>
                        </Step>
                    ) : (
                        orderSteps.map((label, index) => {
                            if (label === "Cancelled") return;

                            return (
                                <Step
                                    key={label}
                                    completed={index < activeOrderStepIndex}
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
