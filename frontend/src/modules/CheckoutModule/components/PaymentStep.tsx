import { forwardRef, useImperativeHandle } from "react";
import { enqueueSnackbar } from "notistack";
import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { Box, CircularProgress, Typography } from "@mui/material";

export interface PaymentStepProps {
    confirm(): Promise<boolean>;
}

const PaymentStep = forwardRef<PaymentStepProps>((_, ref) => {
    const stripe = useStripe();
    const elements = useElements();

    useImperativeHandle(
        ref,
        () => ({
            async confirm() {
                if (!stripe || !elements) {
                    enqueueSnackbar("Stripe not loaded", { variant: "error" });
                    return false;
                }
                const { error } = await stripe.confirmPayment({
                    elements,
                    confirmParams: {
                        return_url: `${window.location.origin}/checkout/success`,
                    },
                    redirect: "if_required",
                });
                if (error) {
                    enqueueSnackbar(error.message || "Payment failed", {
                        variant: "error",
                    });
                    return false;
                }
                return true;
            },
        }),
        [stripe, elements]
    );

    if (!stripe || !elements) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 200,
                }}
            >
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Preparing payment...</Typography>
            </Box>
        );
    }

    return <PaymentElement />;
});

export default PaymentStep;
