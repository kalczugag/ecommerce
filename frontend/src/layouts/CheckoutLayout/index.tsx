import { ReactNode } from "react";
import { useOrder } from "@/contexts/OrderContext";
import { Skeleton, Container, Step, StepLabel, Stepper } from "@mui/material";
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
    const { steps, order, isLoading } = useOrder();
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
                            {isLoading ? (
                                <Skeleton width={80} height={30} />
                            ) : (
                                <StepLabel color="inherit">{label}</StepLabel>
                            )}
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
                            {isLoading ? (
                                <Skeleton width={80} height={30} />
                            ) : (
                                <StepLabel>Status: {order?.status}</StepLabel>
                            )}
                        </Step>
                    ) : (
                        orderSteps.map((label, index) => {
                            if (label === "Cancelled") return;

                            return (
                                <Step
                                    key={label}
                                    completed={index < activeOrderStepIndex}
                                >
                                    {isLoading ? (
                                        <Skeleton width={80} height={30} />
                                    ) : (
                                        <StepLabel color="inherit">
                                            {label}
                                        </StepLabel>
                                    )}
                                </Step>
                            );
                        })
                    )}
                </Stepper>
            )}
            {isLoading ? (
                <div className="flex flex-col -space-y-16">
                    <Skeleton height={150} width={isMobile ? "100%" : 350} />
                    <Skeleton height={240} />
                    <Skeleton height={240} />
                </div>
            ) : (
                children
            )}
        </Container>
    );
};

export default CheckoutLayout;
