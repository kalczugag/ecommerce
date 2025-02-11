import moment from "moment";
import { processPayments } from "@/utils/processFunctions";
import { Divider, useMediaQuery } from "@mui/material";
import DetailCard from "@/components/DetailCard";
import type { Order } from "@/types/Order";
import PaymentDetails from "./components/PaymentDetails";
import PaymentActions from "./components/PaymentActions";

interface PaymentsPageProps {
    data: Order;
}

const PaymentsPage = ({ data }: PaymentsPageProps) => {
    const { payments, paymentCount } = processPayments(data.payments || []);

    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <>
            {payments?.map((payment, index) => (
                <DetailCard
                    key={payment._id}
                    variant="accordion"
                    label={`Payment #${index + 1} of ${paymentCount}`}
                    defaultExpanded
                >
                    <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:justify-between">
                        <PaymentDetails
                            date={moment(payment.createdAt).format(
                                "DD/MM/YYYY, HH:mm"
                            )}
                            amount={payment.amount}
                        />

                        <Divider
                            orientation={isMobile ? "horizontal" : "vertical"}
                            flexItem
                            sx={isMobile ? { marginY: 4 } : { marginX: 4 }}
                        />

                        <div className="flex-1 flex flex-col space-y-4">
                            <div>
                                <span className="font-bold">
                                    Payment Status:{" "}
                                </span>
                                <span>{payment.paymentStatus}</span>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <span className="font-bold">
                                    Fraud Report:{" "}
                                </span>
                                <span className="text-sm">
                                    AVS: Not Supported (S)
                                </span>
                                <span className="text-sm">
                                    CVV: Not Response (x)
                                </span>
                            </div>

                            <PaymentActions payment={payment} />
                        </div>
                    </div>
                </DetailCard>
            ))}
        </>
    );
};

export default PaymentsPage;
