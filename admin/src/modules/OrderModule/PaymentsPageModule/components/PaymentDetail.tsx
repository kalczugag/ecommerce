import type { Payment } from "@/types/Order";
import PaymentInfo from "./PaymentInfo";
import { Divider } from "@mui/material";
import PaymentStatus from "./PaymentStatus";
import DetailCard from "@/components/DetailCard";

interface PaymentDetailProps {
    payment: Payment;
    paymentIndex: number;
    paymentCount: number;
    isMobile: boolean;
}

const PaymentDetail = ({
    payment,
    paymentIndex,
    paymentCount,
    isMobile,
}: PaymentDetailProps) => {
    const card = payment.card;

    let paymentLabel: string;
    const baseLabel = `Payment #${paymentIndex + 1} of ${paymentCount}`;

    if (payment.paymentStatus === "completed") {
        if (card) {
            paymentLabel = `${baseLabel}
                (${card.brand.charAt(0).toUpperCase() + card.brand.slice(1)}
                ***${card.last4.slice(-1)})`;
        } else {
            paymentLabel = `Payment #${paymentIndex + 1} of ${paymentCount}`;
        }
    } else if (payment.paymentStatus === "unpaid") {
        paymentLabel = `${baseLabel} - not paid`;
    } else if (payment.paymentStatus === "pending") {
        paymentLabel = `Payment #${
            paymentIndex + 1
        } of ${paymentCount} - pending`;
    } else {
        paymentLabel = `Payment #${paymentIndex + 1} of ${paymentCount}`;
    }

    return (
        <DetailCard
            key={payment._id}
            variant="accordion"
            label={paymentLabel}
            defaultExpanded={paymentIndex === 0}
        >
            <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:justify-between">
                <PaymentInfo payment={payment} />

                <Divider
                    orientation={isMobile ? "horizontal" : "vertical"}
                    flexItem
                    sx={isMobile ? { marginY: 4 } : { marginX: 4 }}
                />

                <PaymentStatus payment={payment} />
            </div>
        </DetailCard>
    );
};

export default PaymentDetail;
