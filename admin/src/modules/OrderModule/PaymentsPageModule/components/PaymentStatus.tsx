import PaymentActions from "./PaymentActions";
import type { Payment } from "@/types/Order";

interface PaymentStatusProps {
    payment: Payment;
}

const PaymentStatus = ({ payment }: PaymentStatusProps) => {
    return (
        <div className="flex-1 flex flex-col space-y-4">
            <div>
                <span className="font-bold">Payment Status: </span>
                <span>{payment.paymentStatus}</span>
            </div>
            <div className="flex flex-col space-y-1">
                <span className="font-bold">Fraud Report: </span>
                <span className="text-sm">AVS: Not Supported (S)</span>
                <span className="text-sm">CVV: Not Response (x)</span>
            </div>

            <PaymentActions payment={payment} />
        </div>
    );
};

export default PaymentStatus;
