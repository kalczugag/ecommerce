import CapturePaymentDialog from "./CapturePaymentDialog";
import DetailCard from "@/components/DetailCard";
import StatusChip from "@/components/StatusChip";
import type { Payment } from "@/types/Order";

interface PaymentsCardProps {
    payment: Payment;
    orderTotal: number;
}

const PaymentsCard = ({ payment, orderTotal }: PaymentsCardProps) => {
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
            <StatusChip status={payment.paymentStatus || ""} type="payment" />
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
