import { useState } from "react";
import { Field, Form } from "react-final-form";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    InputAdornment,
    TextField,
} from "@mui/material";
import type { Payment } from "@/types/Order";
import { CalendarMonth } from "@mui/icons-material";
import moment from "moment";

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
                        paymentDate: moment(data.createdAt).format(
                            "YYYY-MM-DD"
                        ),
                        leaveAuthorizationOpen: true,
                        privateNote: true,
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
                                <Field name="paymentDate" type="date">
                                    {(props) => (
                                        <TextField
                                            {...props.input}
                                            type="date"
                                            label="Date of Payment"
                                            slotProps={{
                                                inputLabel: {
                                                    shrink: true,
                                                },
                                                input: {
                                                    readOnly: true,
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <CalendarMonth />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                            fullWidth
                                        />
                                    )}
                                </Field>
                                <DialogContentText>
                                    <div>
                                        <span className="font-semibold">
                                            Payment Method:{" "}
                                        </span>
                                        <span>Visa ***9</span>
                                    </div>
                                </DialogContentText>
                                <DialogContentText>
                                    <div>
                                        <span className="font-semibold">
                                            Amount:{" "}
                                        </span>
                                        <span>${data.amount.toFixed(2)}</span>
                                    </div>
                                </DialogContentText>
                                <DialogContentText>
                                    <span className="font-semibold">
                                        Payment Note
                                    </span>
                                </DialogContentText>
                                <Field name="paymentNote">
                                    {({ input }) => (
                                        <TextField
                                            {...input}
                                            placeholder="Enter a note about this transaction."
                                            rows={3}
                                            multiline
                                            fullWidth
                                        />
                                    )}
                                </Field>
                                <Field name="privateNote" type="checkbox">
                                    {({ input }) => (
                                        <FormControlLabel
                                            {...input}
                                            label="Make this comment private"
                                            control={<Checkbox />}
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
