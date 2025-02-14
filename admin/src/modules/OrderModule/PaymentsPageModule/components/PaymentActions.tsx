import { enqueueSnackbar } from "notistack";
import { useEditPaymentMutation, useDeletePaymentMutation } from "@/store";
import { Button } from "@mui/material";
import AlertDialog from "@/components/AlertDialog";
import TooltipButton from "@/components/TooltipButton";
import ReceivePaymentDialog from "./ReceivePaymentDialog";
import type { Payment } from "@/types/Order";

interface PaymentActionsProps {
    payment: Payment;
}

const PaymentActions = ({ payment }: PaymentActionsProps) => {
    const [editPayment, { isLoading: editLoading }] = useEditPaymentMutation();
    const [deletePayment, { isLoading: deleteLoading }] =
        useDeletePaymentMutation();

    const handleAction = async (
        values: Partial<Payment>,
        successMsg: string,
        errorMsg: string,
        fn?: (values?: Partial<Payment>) => ReturnType<typeof editPayment>
    ) => {
        try {
            if (!payment._id) throw new Error("Missing payment ID");

            if (fn) {
                await fn({
                    _id: payment._id,
                    ...values,
                }).unwrap();
            } else {
                await editPayment({
                    _id: payment._id,
                    ...values,
                }).unwrap();
            }

            enqueueSnackbar(successMsg, {
                variant: "success",
            });
        } catch (error) {
            enqueueSnackbar(errorMsg, {
                variant: "error",
            });
        }
    };

    const handleAuthorize = () => {
        handleAction(
            {
                authorized: true,
            },
            "Payment authorized",
            "Failed to authorize"
        );
    };

    const handleVoid = () => {
        handleAction({ voided: true }, "Payment voided", "Failed to void");
    };

    const handleDelete = () => {
        handleAction(
            {},
            "Payment deleted",
            "Failed to delete",
            deletePayment()
        );
    };

    const isDisabled = payment.authorized || editLoading || deleteLoading;

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
