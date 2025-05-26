import { useState } from "react";
import { Form, FormSpy } from "react-final-form";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Stack,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import Info from "./components/Info";
import type { Cart } from "@/types/Cart";
import InfoMobile from "./components/InfoMobile";
import AddressForm from "@/forms/AddressForm";
import PaymentForm from "@/forms/PaymentForm";
import DeliveryMethodForm from "@/forms/DeliveryMethodForm";

const getStepContent = (step: number) => {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <DeliveryMethodForm />;
        case 2:
            return <PaymentForm />;
        case 3:
            return <div>Review your order</div>;
        default:
            return "Unknown step";
    }
};

interface CheckoutModuleProps {
    data: Cart;
    steps: string[];
}

const CheckoutModule = ({ data, steps }: CheckoutModuleProps) => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

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
                    <Info
                        products={data.items}
                        totalPrice={`$${data.total.toFixed(2)}`}
                    />
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
                        <InfoMobile
                            products={data.items}
                            totalPrice={`$${data.total.toFixed(2)}`}
                        />
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
                            render={({ handleSubmit, values }) => (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-10"
                                >
                                    {getStepContent(activeStep)}
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
                                            >
                                                Previous
                                            </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            endIcon={<ChevronRightRounded />}
                                            onClick={handleNext}
                                            sx={{
                                                width: {
                                                    xs: "100%",
                                                    sm: "fit-content",
                                                },
                                            }}
                                        >
                                            {activeStep === steps.length - 1
                                                ? "Place order"
                                                : "Next"}
                                        </Button>
                                    </Box>
                                    <FormSpy subscription={{ values: true }}>
                                        {({ values }) => {
                                            console.log(values);
                                            return <></>;
                                        }}
                                    </FormSpy>
                                </form>
                            )}
                        />
                    )}
                </Box>
            </Grid>
        </Grid>
    );
};

export default CheckoutModule;
