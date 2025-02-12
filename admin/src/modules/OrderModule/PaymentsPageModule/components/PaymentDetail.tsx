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
    return (
        <DetailCard
            key={payment._id}
            variant="accordion"
            label={`Payment #${paymentIndex + 1} of ${paymentCount}`}
            defaultExpanded
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
