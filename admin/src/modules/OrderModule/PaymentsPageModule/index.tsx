import { processPayments } from "@/utils/processFunctions";
import { useMediaQuery } from "@mui/material";
import NotFound from "@/components/NotFound";
import PaymentDetail from "./components/PaymentDetail";
import type { Order } from "@/types/Order";

interface PaymentsPageProps {
    data: Order;
}

const PaymentsPage = ({ data }: PaymentsPageProps) => {
    const { payments, paymentCount } = processPayments(data.payments || []);

    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <>
            {payments.length > 0 ? (
                payments.map((payment, index) => (
                    <PaymentDetail
                        payment={payment}
                        paymentIndex={index}
                        paymentCount={paymentCount}
                        isMobile={isMobile}
                    />
                ))
            ) : (
                <NotFound title="No payments found" />
            )}
        </>
    );
};

export default PaymentsPage;
