import moment from "moment";
import type { Payment } from "@/types/Order";

interface PaymentInfoProps {
    payment: Payment;
}

const PaymentInfo = ({ payment }: PaymentInfoProps) => {
    return (
        <div className="flex-1 flex flex-col space-y-4">
            <div>
                <span className="font-bold">Date: </span>
                <span>
                    {moment(payment.createdAt).format("DD/MM/YYYY, HH:mm")}
                </span>
            </div>
            <div>
                <span className="font-bold">Amount: </span>
                <span>${payment.amount.toFixed(2)}</span>
            </div>
            <div className="flex flex-col space-y-1">
                <span className="font-bold">Account Details: </span>
                <span className="text-sm">
                    Account data storage or SSL has been disabled.
                </span>
            </div>
        </div>
    );
};

export default PaymentInfo;
