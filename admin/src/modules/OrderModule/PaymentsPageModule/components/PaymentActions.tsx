import { enqueueSnackbar } from "notistack";
import { useEditPaymentMutation } from "@/store";
import { Button } from "@mui/material";
import AlertDialog from "@/components/AlertDialog";
import TooltipButton from "@/components/TooltipButton";
import ReceivePaymentDialog from "./ReceivePaymentDialog";
import type { Payment } from "@/types/Order";

interface PaymentActionsProps {
    payment: Payment;
}

const PaymentActions = ({ payment }: PaymentActionsProps) => {
    const [editPayment, { isLoading }] = useEditPaymentMutation();

    const handleAuthorize = async () => {
        try {
            await editPayment({
                _id: payment._id || "",
                authorized: true,
            }).unwrap();
            enqueueSnackbar("Payment authorized", {
                variant: "success",
            });
        } catch (error) {
            enqueueSnackbar("Failed to authorize", {
                variant: "error",
            });
        }
    };

    const isDisabled = payment.authorized || isLoading;

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex space-x-1">
                <ReceivePaymentDialog data={payment} />
                <AlertDialog
                    title="Are you sure?"
                    content="You won't be able to revert this!"
                    cancel="Cancel"
                    confirm="Yes"
                    onConfirm={handleAuthorize}
                >
                    {(props) => (
                        <TooltipButton
                            title="Authorize"
                            tooltipText="Payment already authorized"
                            variant="contained"
                            onClick={props.open}
                            disabled={isDisabled}
                        />
                    )}
                </AlertDialog>
            </div>
            <div className="flex space-x-1">
                <Button variant="outlined" color="warning">
                    Void
                </Button>
                <Button variant="outlined" color="warning">
                    Edit
                </Button>
                <Button variant="outlined" color="error">
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default PaymentActions;
