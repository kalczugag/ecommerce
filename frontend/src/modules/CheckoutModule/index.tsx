import { RefObject, useRef, useState } from "react";
import { Form } from "react-final-form";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import {
    useElements,
    useStripe,
    PaymentElement,
    Elements,
} from "@stripe/react-stripe-js";
import { enqueueSnackbar } from "notistack";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Stack,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import Info from "./components/Info";
import InfoMobile from "./components/InfoMobile";
import Review from "./components/Review";
import PaymentStep, { PaymentStepProps } from "./components/PaymentStep";
import AddressForm from "@/forms/AddressForm";
// import PaymentForm from "@/forms/PaymentForm";
import DeliveryMethodForm from "@/forms/DeliveryMethodForm";
import {
    useAddOrderMutation,
    useCreatePaymentMutation,
    setStripeClientSecret,
    type CheckoutActionPayload,
} from "@/store";
import type { CreateOrder } from "@/types/Order";
import type { Cart } from "@/types/Cart";
import type { User } from "@/types/User";

const getStepContent = (
    step: number,
    totalPrice: number,
    stripeClientSecret: string | undefined,
    stripePromise: any,
    paymentRef: RefObject<PaymentStepProps>
) => {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <DeliveryMethodForm totalPrice={totalPrice || 0} />;
        case 2:
            return stripeClientSecret ? (
                <Elements
                    stripe={stripePromise}
                    options={{ clientSecret: stripeClientSecret }}
                >
                    <PaymentStep ref={paymentRef} />
                </Elements>
            ) : (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight={200}
                >
                    <CircularProgress />
                    <Typography sx={{ ml: 2 }}>Preparing payment...</Typography>
                </Box>
            );
        case 3:
            return <Review />;
        default:
            return "Unknown step";
    }
};

interface CheckoutModuleProps {
    data: Cart;
    userData?: User;
    steps: string[];
    handleUpdateCheckout: (data: Partial<CheckoutActionPayload>) => {
        payload: Partial<CheckoutActionPayload>;
        type: "checkout/updateCheckout";
    };
    stripePromise: ReturnType<typeof import("@stripe/stripe-js").loadStripe>;
}

const CheckoutModule = ({
    data,
    userData,
    steps,
    handleUpdateCheckout,
    stripePromise,
}: CheckoutModuleProps) => {
    const dispatch = useAppDispatch();
    const [activeStep, setActiveStep] = useState(0);
    const [isCreatingPayment, setIsCreatingPayment] = useState(false);
    const paymentRef = useRef<PaymentStepProps>(null);

    const { paymentInfo, shippingAddress, billingAddress, stripeClientSecret } =
        useAppSelector((state) => state.checkout);

    const [createOrder] = useAddOrderMutation();
    const [createPayment] = useCreatePaymentMutation();

    const handleNext = async (values: any) => {
        if (activeStep === 1) {
            setIsCreatingPayment(true);

            handleUpdateCheckout({
                _deliveryMethod: values._deliveryMethod,
            });

            const orderData: CreateOrder = {
                orderData: {
                    _user: userData?._id || "",
                    _cart: (userData?._cart as string) || "",
                    shippingAddress: shippingAddress!,
                    billingAddress: billingAddress!,
                },
                shipmentData: {
                    shipFrom: {
                        street: "Człuchowska 92",
                        city: "Warsaw",
                        state: "Masovian",
                        postalCode: "01-360",
                        country: "Poland",
                    },
                    shipTo: shippingAddress!,
                    _deliveryMethod: values._deliveryMethod,
                },
            };

            try {
                const { data: order } = await createOrder(orderData);

                if (!order?.result._id) {
                    enqueueSnackbar("Failed to create order", {
                        variant: "error",
                    });
                    setIsCreatingPayment(false);
                    return;
                }

                const { data: payment } = await createPayment({
                    orderId: order.result._id,
                });

                if (!payment?.result.clientSecret) {
                    enqueueSnackbar("Failed to create payment intent", {
                        variant: "error",
                    });
                    setIsCreatingPayment(false);
                    return;
                }

                dispatch(setStripeClientSecret(payment.result.clientSecret));
                setIsCreatingPayment(false);

                setActiveStep(2);

                return;
            } catch (error) {
                console.error("Checkout error: ", error);
                return;
            }
        }

        if (activeStep === 2) {
            const confirmed = await paymentRef.current?.confirm();
            if (!confirmed) return;

            // handleUpdateCheckout(
            //     values.paymentType === "creditCard"
            //         ? {
            //               paymentInfo: {
            //                   paymentType: values.paymentType,
            //                   cardHolder: values.cardHolder,
            //                   last4: values.cardNumber.slice(-4),
            //                   expDate: values.expDate,
            //                   brand: "Visa",
            //               },
            //           }
            //         : { paymentInfo: undefined }
            // );
        }

        setActiveStep((prev) => prev + 1);
    };

    const canProceed = () => {
        if (activeStep === 1 && isCreatingPayment) return false;
        if (activeStep === 2 && !stripeClientSecret) return false;
        return !isCreatingPayment;
    };

    const handleBack = () => setActiveStep((prev) => prev - 1);

    return (
        <Grid
            container
            sx={{
                mt: {
                    xs: 4,
                    sm: 0,
                },
            }}
        >
            <Grid
                size={{ xs: 12, sm: 5, lg: 4 }}
                sx={{
                    display: { xs: "none", md: "flex" },
                    flexDirection: "column",
                    backgroundColor: "background.paper",
                    borderRight: { sm: "none", md: "1px solid" },
                    borderColor: { sm: "none", md: "divider" },
                    alignItems: "start",
                    pt: 6,
                    px: 10,
                    gap: 4,
                }}
            >
                {/* <Logo /> */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        width: "100%",
                        maxWidth: 500,
                    }}
                >
                    <Info />
                </Box>
            </Grid>
            <Grid
                size={{ sm: 12, md: 7, lg: 8 }}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "100%",
                    width: "100%",
                    backgroundColor: {
                        xs: "transparent",
                        sm: "background.default",
                    },
                    alignItems: "start",
                    pt: { xs: 0, sm: 6 },
                    px: { xs: 2, sm: 10 },
                    gap: { xs: 4, md: 8 },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: { sm: "space-between", md: "flex-end" },
                        alignItems: "center",
                        width: "100%",
                        maxWidth: { sm: "100%", md: 600 },
                    }}
                >
                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            flexGrow: 1,
                        }}
                    >
                        <Stepper
                            id="desktop-stepper"
                            activeStep={activeStep}
                            sx={{ width: "100%", height: 40 }}
                        >
                            {steps.map((label) => (
                                <Step
                                    sx={{
                                        ":first-child": { pl: 0 },
                                        ":last-child": { pr: 0 },
                                    }}
                                    key={label}
                                >
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </Box>
                <Card
                    sx={{ display: { xs: "flex", md: "none" }, width: "100%" }}
                >
                    <CardContent
                        sx={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <div>
                            <Typography variant="subtitle2" gutterBottom>
                                Selected products
                            </Typography>
                            <Typography variant="body1">
                                ${data.total.toFixed(2)}
                            </Typography>
                        </div>
                        <InfoMobile />
                    </CardContent>
                </Card>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        width: "100%",
                        maxWidth: { sm: "100%", md: 600 },
                        gap: { xs: 5, md: "none" },
                    }}
                >
                    <Stepper
                        id="mobile-stepper"
                        activeStep={activeStep}
                        alternativeLabel
                        sx={{ display: { sm: "flex", md: "none" } }}
                    >
                        {steps.map((label) => (
                            <Step
                                sx={{
                                    ":first-child": { pl: 0 },
                                    ":last-child": { pr: 0 },
                                    "& .MuiStepConnector-root": {
                                        top: { xs: 6, sm: 12 },
                                    },
                                }}
                                key={label}
                            >
                                <StepLabel
                                    sx={{
                                        ".MuiStepLabel-labelContainer": {
                                            maxWidth: "70px",
                                        },
                                    }}
                                >
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <Stack spacing={2} useFlexGap>
                            <Typography variant="h1">📦</Typography>
                            <Typography variant="h5">
                                Thank you for your order!
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ color: "text.secondary" }}
                            >
                                Your order number is
                                <strong>&nbsp;#140396</strong>. We have emailed
                                your order confirmation and will update you once
                                its shipped.
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    alignSelf: "start",
                                    width: { xs: "100%", sm: "auto" },
                                }}
                            >
                                Go to my orders
                            </Button>
                        </Stack>
                    ) : (
                        <Form
                            onSubmit={handleNext}
                            initialValues={{
                                firstName: userData?.firstName,
                                lastName: userData?.lastName,
                                address1: userData?.address?.street,
                                city: userData?.address?.city,
                                state: userData?.address?.state,
                                postalCode: userData?.address?.postalCode,
                                country: userData?.address?.country,
                                paymentType:
                                    paymentInfo?.paymentType || "creditCard",
                            }}
                            render={({ handleSubmit }) => {
                                const handleNextClick = async () => {
                                    const result = await handleSubmit();
                                    return result;
                                };

                                return (
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-10"
                                    >
                                        {getStepContent(
                                            activeStep,
                                            data.total,
                                            stripeClientSecret,
                                            stripePromise,
                                            paymentRef
                                        )}
                                        <Box
                                            sx={[
                                                {
                                                    display: "flex",
                                                    flexDirection: {
                                                        xs: "column-reverse",
                                                        sm: "row",
                                                    },
                                                    alignItems: "end",
                                                    flexGrow: 1,
                                                    gap: 1,
                                                    pb: { xs: 12, sm: 0 },
                                                    mt: { xs: 2, sm: 0 },
                                                    mb: "60px",
                                                },
                                                activeStep !== 0
                                                    ? {
                                                          justifyContent:
                                                              "space-between",
                                                      }
                                                    : {
                                                          justifyContent:
                                                              "flex-end",
                                                      },
                                            ]}
                                        >
                                            {activeStep !== 0 && (
                                                <Button
                                                    startIcon={
                                                        <ChevronLeftRounded />
                                                    }
                                                    onClick={handleBack}
                                                    variant="text"
                                                    sx={{
                                                        display: {
                                                            xs: "none",
                                                            sm: "flex",
                                                        },
                                                    }}
                                                    disabled={
                                                        isCreatingPayment ||
                                                        Boolean(
                                                            stripeClientSecret
                                                        )
                                                    }
                                                >
                                                    Previous
                                                </Button>
                                            )}
                                            {activeStep !== 0 && (
                                                <Button
                                                    startIcon={
                                                        <ChevronLeftRounded />
                                                    }
                                                    onClick={handleBack}
                                                    variant="outlined"
                                                    fullWidth
                                                    sx={{
                                                        display: {
                                                            xs: "flex",
                                                            sm: "none",
                                                        },
                                                    }}
                                                    disabled={
                                                        isCreatingPayment ||
                                                        Boolean(
                                                            stripeClientSecret
                                                        )
                                                    }
                                                >
                                                    Previous
                                                </Button>
                                            )}
                                            <Button
                                                variant="contained"
                                                endIcon={
                                                    <ChevronRightRounded />
                                                }
                                                onClick={handleNextClick}
                                                sx={{
                                                    width: {
                                                        xs: "100%",
                                                        sm: "fit-content",
                                                    },
                                                }}
                                                disabled={!canProceed()}
                                            >
                                                {isCreatingPayment
                                                    ? "Creating payment..."
                                                    : activeStep ===
                                                      steps.length - 1
                                                    ? "Place order"
                                                    : "Next"}
                                            </Button>
                                        </Box>
                                        {/* <FormSpy
                                            subscription={{ values: true }}
                                        >
                                            {({ values }) => {
                                                return <></>;
                                            }}
                                        </FormSpy> */}
                                    </form>
                                );
                            }}
                        />
                    )}
                </Box>
            </Grid>
        </Grid>
    );
};

export default CheckoutModule;
