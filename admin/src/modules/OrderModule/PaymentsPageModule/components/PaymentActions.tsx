import { useEditPaymentMutation, useDeletePaymentMutation } from "@/store";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import { Button } from "@mui/material";
import AlertDialog from "@/components/AlertDialog";
import TooltipButton from "@/components/TooltipButton";
import ReceivePaymentDialog from "./ReceivePaymentDialog";
import type { Payment } from "@/types/Order";
import EditPaymentDialog from "./EditPaymentDialog";

interface PaymentActionsProps {
    payment: Payment;
}

const PaymentActions = ({ payment }: PaymentActionsProps) => {
    const { handleMutation } = useHandleMutation();

    const [editPayment, { isLoading: editLoading }] = useEditPaymentMutation();
    const [deletePayment, { isLoading: deleteLoading }] =
        useDeletePaymentMutation();

    const handleAuthorize = async () => {
        handleMutation({
            values: { _id: payment._id, authorized: true },
            mutation: editPayment,
            successMessage: "Payment authorized",
            errorMessage: "Failed to authorize",
        });
    };

    const handleVoid = () => {
        handleMutation({
            values: { _id: payment._id, voided: true },
            mutation: editPayment,
            successMessage: "Payment voided",
            errorMessage: "Failed to void",
        });
    };

    const handleDelete = () => {
        handleMutation({
            values: payment._id,
            mutation: deletePayment,
            successMessage: "Payment deleted",
            errorMessage: "Failed to delete payment",
        });
    };

    const isDisabled = editLoading || deleteLoading;

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex space-x-1">
                <ReceivePaymentDialog data={payment} disabled={isDisabled} />
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
                            disabled={payment.authorized || isDisabled}
                        />
                    )}
                </AlertDialog>
            </div>
            <div className="flex space-x-1">
                <AlertDialog
                    title="Are you sure?"
                    content="You won't be able to revert this!"
                    cancel="Cancel"
                    confirm="Yes"
                    onConfirm={handleVoid}
                >
                    {(props) => (
                        <TooltipButton
                            title="Void"
                            tooltipText="Payment already voided"
                            color="warning"
                            variant="outlined"
                            onClick={props.open}
                            disabled={payment.voided || isDisabled}
                        />
                    )}
                </AlertDialog>
                <EditPaymentDialog payment={payment} disabled={isDisabled} />
                <AlertDialog
                    title="Are you sure?"
                    content="You won't be able to revert this!"
                    cancel="Cancel"
                    confirm="Yes"
                    onConfirm={handleDelete}
                >
                    {(props) => (
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={props.open}
                            disabled={isDisabled}
                        >
                            Delete
                        </Button>
                    )}
                </AlertDialog>
            </div>
        </div>
    );
};

export default PaymentActions;
