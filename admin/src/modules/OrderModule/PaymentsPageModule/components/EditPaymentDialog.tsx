import { useState } from "react";
import { Field, Form } from "react-final-form";
import { compose, mustBeNumber, required } from "@/utils/validators";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import type { Payment } from "@/types/Order";
import { paymentStatuses } from "@/constants/paymentStatuses";

interface EditPaymentDialogProps {
    payment: Payment;
}

const EditPaymentDialog = ({ payment }: EditPaymentDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleSubmit = (values: any) => {
        console.log(values);
        handleClose();
    };

    return (
        <>
            <Button variant="outlined" color="warning" onClick={handleOpen}>
                Edit
            </Button>
            <Dialog open={isOpen} onClose={handleClose}>
                <Form
                    initialValues={payment}
                    onSubmit={handleSubmit}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <DialogTitle>Edit Payment</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    After updating this payment information,
                                    please ensure that all billing details are
                                    accurate. You may also need to verify your
                                    payment method to avoid any delays in
                                    processing.
                                </DialogContentText>
                            </DialogContent>
                            <DialogContent className="flex flex-row justify-between">
                                <div className="flex-1 flex flex-col space-y-4">
                                    <Field
                                        name="paymentMethod"
                                        validate={required}
                                    >
                                        {(props) => (
                                            <TextField
                                                {...props.input}
                                                label="Payment Method"
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
                                    <Field
                                        name="paymentStatus"
                                        type="select"
                                        validate={required}
                                    >
                                        {(props) => (
                                            <FormControl
                                                disabled={false}
                                                sx={{ minWidth: 200 }}
                                            >
                                                <InputLabel
                                                    error={
                                                        props.meta.error &&
                                                        props.meta.touched
                                                    }
                                                >
                                                    Payment Status
                                                </InputLabel>
                                                <Select
                                                    {...props.input}
                                                    label="Payment Status"
                                                    MenuProps={{
                                                        slotProps: {
                                                            paper: {
                                                                style: {
                                                                    maxHeight: 300,
                                                                },
                                                            },
                                                        },
                                                    }}
                                                    error={
                                                        props.meta.error &&
                                                        props.meta.touched
                                                    }
                                                >
                                                    {Object.entries(
                                                        paymentStatuses
                                                    ).map(([key, value]) => (
                                                        <MenuItem
                                                            key={key}
                                                            value={key}
                                                        >
                                                            {value}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {props.meta.error &&
                                                    props.meta.touched && (
                                                        <FormHelperText error>
                                                            Select payment
                                                            status
                                                        </FormHelperText>
                                                    )}
                                            </FormControl>
                                        )}
                                    </Field>
                                </div>

                                <Divider
                                    orientation="vertical"
                                    sx={{ marginX: 4 }}
                                    flexItem
                                />

                                <div className="flex-1 flex flex-col space-y-4">
                                    <Field
                                        name="transactionId"
                                        validate={required}
                                    >
                                        {(props) => (
                                            <TextField
                                                {...props.input}
                                                label="Transaction ID"
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
                                    <Field
                                        name="amount"
                                        validate={compose(
                                            mustBeNumber,
                                            required
                                        )}
                                    >
                                        {(props) => (
                                            <TextField
                                                {...props.input}
                                                label="Amount"
                                                type="number"
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
                                </div>
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

export default EditPaymentDialog;
