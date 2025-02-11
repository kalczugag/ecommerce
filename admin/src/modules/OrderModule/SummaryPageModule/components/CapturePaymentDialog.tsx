import { useState } from "react";
import { Field, Form } from "react-final-form";
import { enqueueSnackbar } from "notistack";
import { required, minValue, maxValue, compose } from "@/utils/validators";
import { useEditPaymentMutation } from "@/store/apis/paymentsApi";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    InputAdornment,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";
import type { Payment } from "@/types/Order";
import TooltipButton from "@/components/TooltipButton";

interface CapturePaymentDialogProps {
    data: Payment;
}

interface FormProps {
    amount: number;
    authorizationStatus: "open" | "closed";
    paymentNote?: string;
}

const CapturePaymentDialog = ({ data }: CapturePaymentDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editPayment, { isLoading }] = useEditPaymentMutation();

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleSubmit = async (values: FormProps) => {
        try {
            await editPayment({
                _id: data._id || "",
                capturedAmount: values.amount,
                authorizationStatus: values.authorizationStatus,
                paymentNotes: Array.isArray(data.paymentNotes)
                    ? [
                          ...data.paymentNotes,
                          { text: values.paymentNote || "", private: true },
                      ]
                    : [{ text: values.paymentNote || "", private: true }],
            }).unwrap();
            enqueueSnackbar("Payment captured successfully", {
                variant: "success",
            });
        } catch (error) {
            enqueueSnackbar("Failed to capture payment", {
                variant: "error",
            });
        }

        handleClose();
    };

    const isDisabled = Boolean(data.capturedAmount) || isLoading;

    return (
        <>
            <TooltipButton
                title="Capture"
                tooltipText="Payment already captured"
                disabled={isDisabled}
                onClick={handleOpen}
                variant="outlined"
            />
            <Dialog open={isOpen} onClose={handleClose}>
                <Form
                    initialValues={{
                        amount: data.amount.toFixed(2),
                        authorizationStatus: data.authorizationStatus,
                    }}
                    onSubmit={handleSubmit}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <DialogTitle>Capture Payment</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    The capture amount will be automatically
                                    adjusted to the order balance.
                                </DialogContentText>
                            </DialogContent>
                            <DialogContent className="space-y-4">
                                <DialogContentText>
                                    <span className="font-semibold">
                                        Authorization for:{" "}
                                    </span>
                                    <span>${data.amount.toFixed(2)}</span>
                                </DialogContentText>
                                <DialogContentText>
                                    <span className="font-semibold">
                                        Order balance:{" "}
                                    </span>
                                    <span>${data.amount.toFixed(2)}</span>
                                </DialogContentText>
                                <Field
                                    name="amount"
                                    type="select"
                                    validate={compose(
                                        required,
                                        minValue(0),
                                        maxValue(data.amount)
                                    )}
                                >
                                    {(props) => (
                                        <TextField
                                            {...props.input}
                                            type="number"
                                            label="Capture amount"
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            $
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                            error={
                                                props.meta.error &&
                                                props.meta.touched
                                            }
                                            helperText={
                                                props.meta.error &&
                                                props.meta.touched
                                                    ? props.meta.error
                                                    : null
                                            }
                                            disabled={isLoading}
                                        />
                                    )}
                                </Field>
                                <DialogContentText>
                                    <span className="font-semibold">
                                        Additional Capture Option:
                                    </span>
                                </DialogContentText>
                                <FormControl
                                    disabled={isLoading}
                                    component="fieldset"
                                >
                                    <Field name="authorizationStatus">
                                        {({ input }) => (
                                            <RadioGroup
                                                {...input}
                                                className="space-y-2"
                                            >
                                                <div>
                                                    <FormControlLabel
                                                        value="open"
                                                        control={<Radio />}
                                                        label="Yes, leave authorization open"
                                                    />
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Option to capture
                                                        additional funds on this
                                                        authorization.
                                                    </p>
                                                </div>
                                                <div>
                                                    <FormControlLabel
                                                        value="closed"
                                                        control={<Radio />}
                                                        label="No, do not leave authorization open"
                                                    />
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        No additional capture is
                                                        needed from this
                                                        authorization
                                                    </p>
                                                </div>
                                            </RadioGroup>
                                        )}
                                    </Field>
                                </FormControl>
                                <DialogContentText>
                                    <span className="font-semibold">
                                        Payment Note
                                    </span>
                                </DialogContentText>
                                <Field name="paymentNote">
                                    {({ input }) => (
                                        <TextField
                                            {...input}
                                            placeholder="Enter a private note about this transaction."
                                            rows={3}
                                            multiline
                                            fullWidth
                                            disabled={isLoading}
                                        />
                                    )}
                                </Field>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={handleClose}
                                    color="info"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    color="info"
                                    disabled={isLoading}
                                >
                                    Save
                                </Button>
                            </DialogActions>
                        </form>
                    )}
                />
            </Dialog>
        </>
    );
};

export default CapturePaymentDialog;
