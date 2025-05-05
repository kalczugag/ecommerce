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
    isLoading: boolean;
    onSubmit: (promoCode: string) => void;
}

const DiscountDialog = ({ isLoading, onSubmit }: DiscountDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPromoCode, setCurrentPromoCode] = useState<string | null>(
        () => {
            const stored = localStorage.getItem("promoCode");
            return stored ? JSON.parse(stored) : null;
        }
    );

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleRemoveDiscount = () => {
        localStorage.removeItem("promoCode");
    };

    const handleSubmit = (values: { promo_code: string }) => {
        onSubmit(values.promo_code.trim());
        handleClose();
    };

    return (
        <>
            {!currentPromoCode ? (
                <Button
                    startIcon={<Add />}
                    color="inherit"
                    onClick={handleOpen}
                >
                    Discount code
                </Button>
            ) : (
                <div className="flex flex-row justify-center items-center space-x-2">
                    <span className="text-gray-700 underline">
                        {currentPromoCode}
                    </span>
                    <IconButton size="small" onClick={handleRemoveDiscount}>
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
