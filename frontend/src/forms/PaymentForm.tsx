import { useState } from "react";
import {
    AccountBalanceRounded,
    CreditCardRounded,
    SimCardRounded,
    WarningRounded,
} from "@mui/icons-material";
import {
    styled,
    Box,
    Alert,
    CardActionArea,
    CardContent,
    Card as MuiCard,
    FormControlLabel,
    RadioGroup,
    Stack,
    FormControl,
    Typography,
    FormLabel,
    OutlinedInput,
    Checkbox,
} from "@mui/material";
import { Field } from "react-final-form";

const Card = styled(MuiCard)<{ selected?: boolean }>(({ theme }) => ({
    border: "1px solid",
    borderColor: theme.palette.divider,
    width: "100%",
    "&:hover": {
        background:
            "linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)",
        borderColor: "primary.light",
        boxShadow: "0px 2px 8px hsla(0, 0%, 0%, 0.1)",
        ...theme.applyStyles("dark", {
            background:
                "linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)",
            borderColor: "primary.dark",
            boxShadow: "0px 1px 8px hsla(210, 100%, 25%, 0.5) ",
        }),
    },
    [theme.breakpoints.up("md")]: {
        flexGrow: 1,
        maxWidth: `calc(50% - ${theme.spacing(1)})`,
    },
    variants: [
        {
            props: ({ selected }: { selected?: boolean }) => selected,
            style: {
                borderColor: theme.palette.primary.light,
                ...theme.applyStyles("dark", {
                    borderColor: theme.palette.primary.dark,
                }),
            },
        },
    ],
}));

const PaymentContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: 375,
    padding: theme.spacing(3),
    borderRadius: `calc(${theme.shape.borderRadius}px + 4px)`,
    border: "1px solid ",
    borderColor: theme.palette.divider,
    background:
        "linear-gradient(to bottom right, hsla(220, 35%, 97%, 0.3) 25%, hsla(220, 20%, 88%, 0.3) 100%)",
    boxShadow: "0px 4px 8px hsla(210, 0%, 0%, 0.05)",
    [theme.breakpoints.up("xs")]: {
        height: 300,
    },
    [theme.breakpoints.up("sm")]: {
        height: 350,
    },
    ...theme.applyStyles("dark", {
        background:
            "linear-gradient(to right bottom, hsla(220, 30%, 6%, 0.2) 25%, hsla(220, 20%, 25%, 0.2) 100%)",
        boxShadow: "0px 4px 8px hsl(220, 35%, 0%)",
    }),
}));

const FormGrid = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
}));

const PaymentForm = () => {
    const [paymentType, setPaymentType] = useState("creditCard");
    const [cardNumber, setCardNumber] = useState("");
    const [cvv, setCvv] = useState("");
    const [expirationDate, setExpirationDate] = useState("");

    const handlePaymentTypeChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setPaymentType(event.target.value);
    };

    const handleCardNumberChange = (event: { target: { value: string } }) => {
        const value = event.target.value.replace(/\D/g, "");
        const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
        if (value.length <= 16) {
            setCardNumber(formattedValue);
        }
    };

    const handleCvvChange = (event: { target: { value: string } }) => {
        const value = event.target.value.replace(/\D/g, "");
        if (value.length <= 3) {
            setCvv(value);
        }
    };

    const handleExpirationDateChange = (event: {
        target: { value: string };
    }) => {
        const value = event.target.value.replace(/\D/g, "");
        const formattedValue = value.replace(/(\d{2})(?=\d{2})/, "$1/");
        if (value.length <= 4) {
            setExpirationDate(formattedValue);
        }
    };

    return (
        <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
            <FormControl component="fieldset" fullWidth>
                <RadioGroup
                    aria-label="Payment options"
                    name="paymentType"
                    value={paymentType}
                    onChange={handlePaymentTypeChange}
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2,
                    }}
                >
                    <Field name="paymentType" type="radio">
                        {({ input }) => (
                            <Card selected={paymentType === "creditCard"}>
                                <CardActionArea
                                    onClick={() => {
                                        input.onChange("creditCard");
                                        setPaymentType("creditCard");
                                    }}
                                    sx={{
                                        ".MuiCardActionArea-focusHighlight": {
                                            backgroundColor: "transparent",
                                        },
                                        "&:focus-visible": {
                                            backgroundColor: "action.hover",
                                        },
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        <CreditCardRounded
                                            fontSize="small"
                                            sx={[
                                                (theme) => ({
                                                    color: "grey.400",
                                                    ...theme.applyStyles(
                                                        "dark",
                                                        {
                                                            color: "grey.600",
                                                        }
                                                    ),
                                                }),
                                                paymentType ===
                                                    "creditCard" && {
                                                    color: "primary.main",
                                                },
                                            ]}
                                        />
                                        <Typography
                                            sx={{ fontWeight: "medium" }}
                                        >
                                            Card
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )}
                    </Field>
                    <Field name="paymentType" type="radio">
                        {({ input }) => (
                            <Card selected={paymentType === "bankTransfer"}>
                                <CardActionArea
                                    onClick={() => {
                                        input.onChange("bankTransfer");
                                        setPaymentType("bankTransfer");
                                    }}
                                    sx={{
                                        ".MuiCardActionArea-focusHighlight": {
                                            backgroundColor: "transparent",
                                        },
                                        "&:focus-visible": {
                                            backgroundColor: "action.hover",
                                        },
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        <AccountBalanceRounded
                                            fontSize="small"
                                            sx={[
                                                (theme) => ({
                                                    color: "grey.400",
                                                    ...theme.applyStyles(
                                                        "dark",
                                                        {
                                                            color: "grey.600",
                                                        }
                                                    ),
                                                }),
                                                paymentType ===
                                                    "bankTransfer" && {
                                                    color: "primary.main",
                                                },
                                            ]}
                                        />
                                        <Typography
                                            sx={{ fontWeight: "medium" }}
                                        >
                                            Bank account
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )}
                    </Field>
                </RadioGroup>
            </FormControl>
            {paymentType === "creditCard" && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <PaymentContainer>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography variant="subtitle2">
                                Credit card
                            </Typography>
                            <CreditCardRounded
                                sx={{ color: "text.secondary" }}
                            />
                        </Box>
                        <SimCardRounded
                            sx={{
                                fontSize: { xs: 48, sm: 56 },
                                transform: "rotate(90deg)",
                                color: "text.secondary",
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                                gap: 2,
                            }}
                        >
                            <FormGrid sx={{ flexGrow: 1 }}>
                                <FormLabel htmlFor="card-number" required>
                                    Card number
                                </FormLabel>
                                <OutlinedInput
                                    id="card-number"
                                    autoComplete="card-number"
                                    placeholder="0000 0000 0000 0000"
                                    required
                                    size="small"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                />
                            </FormGrid>
                            <FormGrid sx={{ maxWidth: "20%" }}>
                                <FormLabel htmlFor="cvv" required>
                                    CVV
                                </FormLabel>
                                <OutlinedInput
                                    id="cvv"
                                    autoComplete="CVV"
                                    placeholder="123"
                                    required
                                    size="small"
                                    value={cvv}
                                    onChange={handleCvvChange}
                                />
                            </FormGrid>
                        </Box>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <FormGrid sx={{ flexGrow: 1 }}>
                                <FormLabel htmlFor="card-name" required>
                                    Name
                                </FormLabel>
                                <OutlinedInput
                                    id="card-name"
                                    autoComplete="card-name"
                                    placeholder="John Smith"
                                    required
                                    size="small"
                                />
                            </FormGrid>
                            <FormGrid sx={{ flexGrow: 1 }}>
                                <FormLabel htmlFor="card-expiration" required>
                                    Expiration date
                                </FormLabel>
                                <OutlinedInput
                                    id="card-expiration"
                                    autoComplete="card-expiration"
                                    placeholder="MM/YY"
                                    required
                                    size="small"
                                    value={expirationDate}
                                    onChange={handleExpirationDateChange}
                                />
                            </FormGrid>
                        </Box>
                    </PaymentContainer>
                    <FormControlLabel
                        control={<Checkbox name="saveCard" />}
                        label="Remember credit card details for next time"
                    />
                </Box>
            )}
            {paymentType === "bankTransfer" && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Alert severity="warning" icon={<WarningRounded />}>
                        Your order will be processed once we receive the funds.
                    </Alert>
                    <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "medium" }}
                    >
                        Bank account
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Please transfer the payment to the bank account details
                        shown below.
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Typography
                            variant="body1"
                            sx={{ color: "text.secondary" }}
                        >
                            Bank:
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ fontWeight: "medium" }}
                        >
                            Mastercredit
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Typography
                            variant="body1"
                            sx={{ color: "text.secondary" }}
                        >
                            Account number:
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ fontWeight: "medium" }}
                        >
                            123456789
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Typography
                            variant="body1"
                            sx={{ color: "text.secondary" }}
                        >
                            Routing number:
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ fontWeight: "medium" }}
                        >
                            987654321
                        </Typography>
                    </Box>
                </Box>
            )}
        </Stack>
    );
};

export default PaymentForm;
