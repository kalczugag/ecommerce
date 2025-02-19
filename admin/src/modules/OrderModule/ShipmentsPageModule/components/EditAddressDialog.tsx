import { useState } from "react";
import { Field, Form } from "react-final-form";
import { enqueueSnackbar } from "notistack";
import { useEditShipmentMutation } from "@/store";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import type { Shipment, ShippingAddress } from "@/types/Order";
import { required } from "@/utils/validators";
import Row from "@/components/Row";

interface EditAddressDialogProps {
    shipment: Shipment;
}

const EditAddressDialog = ({ shipment }: EditAddressDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editShipment, { isLoading }] = useEditShipmentMutation();

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleSubmit = async (values: ShippingAddress) => {
        try {
            await editShipment({
                _id: shipment._id || "",
                shipTo: values,
            }).unwrap();
            enqueueSnackbar("Address edited successfully", {
                variant: "success",
            });
        } catch (error) {
            enqueueSnackbar("Failed to edit address", {
                variant: "error",
            });
        }

        handleClose();
    };

    return (
        <>
            <Button
                variant="outlined"
                onClick={handleOpen}
                disabled={isLoading}
            >
                Edit Address
            </Button>
            <Dialog open={isOpen} onClose={handleClose}>
                <Form
                    initialValues={shipment.shipTo}
                    onSubmit={handleSubmit}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <DialogTitle>Edit Address</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Updating the shipping address may affect
                                    delivery times and shipping charges. Please
                                    ensure the new address is correct before
                                    saving.
                                </DialogContentText>
                            </DialogContent>
                            <DialogContent className="space-y-4">
                                <Field name="street" validate={required}>
                                    {(props) => (
                                        <TextField
                                            {...props.input}
                                            label="Street"
                                            fullWidth
                                        />
                                    )}
                                </Field>
                                <Row>
                                    <Field name="city" validate={required}>
                                        {(props) => (
                                            <TextField
                                                {...props.input}
                                                label="City"
                                                fullWidth
                                            />
                                        )}
                                    </Field>
                                    <Field
                                        name="postalCode"
                                        validate={required}
                                    >
                                        {(props) => (
                                            <TextField
                                                {...props.input}
                                                label="Postal Code"
                                                fullWidth
                                            />
                                        )}
                                    </Field>
                                </Row>
                                <Row>
                                    <Field name="state">
                                        {(props) => (
                                            <TextField
                                                {...props.input}
                                                label="State"
                                                fullWidth
                                            />
                                        )}
                                    </Field>
                                    <Field name="country">
                                        {(props) => (
                                            <TextField
                                                {...props.input}
                                                label="Country"
                                                fullWidth
                                            />
                                        )}
                                    </Field>
                                </Row>
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

export default EditAddressDialog;
