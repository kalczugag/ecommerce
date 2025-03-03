import PaymentActions from "./PaymentActions";
import type { Payment } from "@/types/Order";

interface PaymentStatusProps {
    payment: Payment;
}

type FraudCheckStatus = "pass" | "fail" | "unavailable" | "unchecked";

const fraudCheckLabels: Record<FraudCheckStatus, string> = {
    pass: "Approved",
    fail: "Declined",
    unavailable: "Unavailable",
    unchecked: "Unchecked",
};

const PaymentStatus = ({ payment }: PaymentStatusProps) => {
    const cardChecks = payment.card?.checks;

    const avsStatus = cardChecks?.address_line1_check || "unchecked";
    const cvcStatus = cardChecks?.cvc_check || "unchecked";

    return (
        <div className="flex-1 flex flex-col space-y-4">
            <div>
                <span className="font-bold">Payment Status: </span>
                <span>{payment.paymentStatus}</span>
            </div>
            <div className="flex flex-col space-y-1">
                <span className="font-bold">Fraud Report: </span>
                <div className="text-sm">
                    <div>AVS: {fraudCheckLabels[avsStatus]}</div>
                    <div>CVC: {fraudCheckLabels[cvcStatus]}</div>
                </div>
            </div>

            <PaymentActions payment={payment} />

            <p className="text-xs italic xl:w-1/2 text-text-light dark:text-text-dark">
                * Voiding a payment cancels the transaction before it's fully
                processed, preventing charges. Use this for errors or
                cancellations before settlement.
            </p>
        </div>
    );
};

export default PaymentStatus;
