import { Stepper, Step, StepLabel, useMediaQuery } from "@mui/material";
import { orderStatuses } from "@/constants/orderStatuses";
import type { Order } from "@/types/Order";

interface StatusProps {
    status: Order["status"];
}

type StepKey = keyof typeof orderStatuses;

const Status = ({ status }: StatusProps) => {
    const stepKeys = Object.keys(orderStatuses) as StepKey[];
    const isMobile = useMediaQuery("(max-width: 768px)");

    if (!status) return null;

    const ignore = ["canceled", "returned", "pending payment"];

    return (
        <Stepper activeStep={stepKeys.indexOf(status)}>
            {isMobile ? (
                <Step>
                    <StepLabel>Status: {orderStatuses[status]}</StepLabel>
                </Step>
            ) : (
                stepKeys.map((key, index) => {
                    if (ignore.includes(key)) return null;
                    return (
                        <Step key={key + index}>
                            <StepLabel>{orderStatuses[key]}</StepLabel>
                        </Step>
                    );
                })
            )}
        </Stepper>
    );
};

export default Status;
