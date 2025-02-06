import { useState } from "react";
import { Field, Form } from "react-final-form";
import { required, minValue, maxValue, compose } from "@/utils/validators";
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

interface ReceivePaymentDialogProps {
    data: Payment;
}

interface FormProps {
    amount: number;
    leaveAuthorizationOpen: boolean;
    paymentNote?: string;
}

const ReceivePaymentDialog = ({ data }: ReceivePaymentDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleSubmit = (values: FormProps) => {
        console.log(values);
        handleClose();
    };

    return (
        <>
            <Button variant="contained" onClick={handleOpen}>
                Receive Payment
            </Button>
            <Dialog open={isOpen} onClose={handleClose}>
                <Form
                    initialValues={{
                        amount: data.amount.toFixed(2),
                        leaveAuthorizationOpen: true,
                    }}
                    onSubmit={handleSubmit}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <DialogTitle>Receive Payment</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Accept receipt of payment.
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
                                        />
                                    )}
                                </Field>
                                <DialogContentText>
                                    <span className="font-semibold">
                                        Additional Capture Option:
                                    </span>
                                </DialogContentText>
                                <FormControl component="fieldset">
                                    <Field name="leaveAuthorizationOpen">
                                        {({ input }) => (
                                            <RadioGroup
                                                value={input.value}
                                                onChange={(event) => {
                                                    const value =
                                                        event.target.value ===
                                                        "true";
                                                    input.onChange(value);
                                                }}
                                                className="space-y-2"
                                            >
                                                <div>
                                                    <FormControlLabel
                                                        value="true"
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
                                                        value="false"
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
                                        />
                                    )}
                                </Field>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="info">
                                    Cancel
                                </Button>
                                <Button type="submit" color="info">
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

export default ReceivePaymentDialog;
