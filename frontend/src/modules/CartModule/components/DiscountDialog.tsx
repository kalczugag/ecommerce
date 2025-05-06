import { useState } from "react";
import { Field, Form } from "react-final-form";
import { required } from "@/utils/validators";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";

interface DiscountDialogProps {
    currentPromoCode: string | null;
    isLoading: boolean;
    handleAddDiscount: (promoCode: string) => void;
    handleDeleteDiscount: () => void;
}

const DiscountDialog = ({
    currentPromoCode,
    isLoading,
    handleAddDiscount,
    handleDeleteDiscount,
}: DiscountDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleSubmit = (values: { promo_code: string }) => {
        handleAddDiscount(values.promo_code.trim());
        handleClose();
    };

    return (
        <>
            {!currentPromoCode ? (
                <div className="flex justify-center">
                    <Button
                        startIcon={<Add />}
                        color="inherit"
                        onClick={handleOpen}
                    >
                        Discount code
                    </Button>
                </div>
            ) : (
                <div className="flex flex-row justify-center items-center space-x-2">
                    <span className="text-gray-700 underline">
                        {currentPromoCode}
                    </span>
                    <IconButton size="small" onClick={handleDeleteDiscount}>
                        <Close />
                    </IconButton>
                </div>
            )}
            <Dialog open={isOpen} onClose={handleClose} fullWidth>
                <Form
                    onSubmit={handleSubmit}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <DialogTitle>Add Discount</DialogTitle>
                            <DialogContent>
                                <Field
                                    name="promo_code"
                                    id="promo_code"
                                    validate={required}
                                >
                                    {(props) => (
                                        <TextField
                                            {...props.input}
                                            sx={{ mt: 1 }}
                                            label="Enter discount or gift card code"
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
                                            fullWidth
                                        />
                                    )}
                                </Field>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} variant="text">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isLoading}>
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

export default DiscountDialog;
