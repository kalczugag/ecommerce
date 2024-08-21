import { Stepper, Step, StepLabel } from "@mui/material";
import useIsMobile from "@/hooks/useIsMobile";
import type { Order } from "@/types/Order";

interface StatusProps {
    status: Order["status"];
}

const steps = {
    placed: "Placed",
    confirmed: "Order Confirmed",
    shipped: "Shipped",
    in_delivery: "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
};

type StepKey = keyof typeof steps;

const Status = ({ status }: StatusProps) => {
    const stepKeys = Object.keys(steps) as StepKey[];
    const isMobile = useIsMobile(768);

    return (
        <Stepper activeStep={stepKeys.indexOf(status)}>
            {isMobile ? (
                <Step>
                    <StepLabel>Status: {steps[status]}</StepLabel>
                </Step>
            ) : (
                stepKeys.map((key, index) => {
                    if (key !== "cancelled")
                        return (
                            <Step key={key + index}>
                                <StepLabel>{steps[key]}</StepLabel>
                            </Step>
                        );
                })
            )}
        </Stepper>
    );
};

export default Status;
