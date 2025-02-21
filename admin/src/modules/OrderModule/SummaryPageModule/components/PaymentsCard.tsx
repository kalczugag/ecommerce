import CapturePaymentDialog from "./CapturePaymentDialog";
import DetailCard from "@/components/DetailCard";
import type { Payment } from "@/types/Order";

interface PaymentsCardProps {
    payment: Payment;
    orderTotal: number;
}

const PaymentsCard = ({ payment, orderTotal }: PaymentsCardProps) => {
    // const payment = data.payments?.[0];

    const card = payment.card;

    return (
        <DetailCard label="Payments">
            <div>
                <span className="font-bold">Payment Status: </span>
                <span>{payment?.paymentStatus}</span>
            </div>
            <div>
                <span className="font-bold">Order Total: </span>
                <span>${orderTotal.toFixed(2)}</span>
            </div>
            <div
                className={`p-1 rounded text-center text-white font-semibold ${
                    payment?.paymentStatus === "completed"
                        ? "bg-green-600"
                        : "bg-orange-500"
                } dark:bg-slate-700`}
            >
                {payment?.paymentStatus}
            </div>
            <div>
                <span className="font-bold">Last Payment: </span>
                {card ? (
                    <span>
                        {card.brand.slice(0, 1).toUpperCase() +
                            card.brand.slice(1)}{" "}
                        {"***" + card.last4.slice(-1)}
                    </span>
                ) : (
                    <span>None</span>
                )}
            </div>
            <div>{payment && <CapturePaymentDialog data={payment} />}</div>
        </DetailCard>
    );
};

export default PaymentsCard;
