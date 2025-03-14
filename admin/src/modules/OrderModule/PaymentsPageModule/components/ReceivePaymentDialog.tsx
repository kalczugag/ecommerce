import { useState } from "react";
import { Field, Form } from "react-final-form";
import moment from "moment";
import { useEditPaymentMutation } from "@/store";
import { useHandleMutation } from "@/hooks/useHandleMutation";
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
import TooltipButton from "@/components/TooltipButton";

interface ReceivePaymentDialogProps {
    data: Payment;
    disabled: boolean;
}

interface FormProps {
    amount: number;
    authorizationStatus: "open" | "closed";
    paymentNote?: string;
}

const ReceivePaymentDialog = ({
    data,
    disabled,
}: ReceivePaymentDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editPayment, { isLoading }] = useEditPaymentMutation();
    const { handleMutation } = useHandleMutation();

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleSubmit = async (values: FormProps) => {
        handleMutation({
            values: {
                _id: data._id || "",
                capturedAmount: values.amount,
                authorizationStatus: values.authorizationStatus,
                paymentNotes: Array.isArray(data.paymentNotes)
                    ? [
                          ...data.paymentNotes,
                          { text: values.paymentNote || "", private: true },
                      ]
                    : [{ text: values.paymentNote || "", private: true }],
            },
            mutation: editPayment,
        });

        handleClose();
    };

    const isDisabled = Boolean(data.capturedAmount) || isLoading || disabled;

    return (
        <>
            <TooltipButton
                title="Receive Payment"
                tooltipText="Payment already received"
                disabled={isDisabled}
                onClick={handleOpen}
                variant="contained"
            />
            <Dialog open={isOpen} onClose={handleClose}>
                <Form
                    initialValues={{
                        amount: data.amount,
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

export default ReceivePaymentDialog;
