import moment from "moment";
import { Button, Divider, useMediaQuery } from "@mui/material";
import DetailCard from "@/components/DetailCard";
import ReceivePaymentDialog from "./components/ReceivePaymentDialog";
import type { Order } from "@/types/Order";

interface PaymentsPageProps {
    data: Order;
}

const PaymentsPage = ({ data }: PaymentsPageProps) => {
    const numOfPayments = 1; // in future this will be dynamic

    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <DetailCard
            variant="accordion"
            label={`Payment #${numOfPayments}`}
            defaultExpanded
        >
            <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:justify-between">
                <div className="flex-1 flex flex-col space-y-4">
                    <div>
                        <span className="font-bold">Date: </span>
                        <span>
                            {moment(data._payment?.createdAt).format(
                                "DD/MM/YYYY, HH:mm"
                            )}
                        </span>
                    </div>
                    <div>
                        <span className="font-bold">Amount: </span>
                        <span>${data._payment?.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <span className="font-bold">Account Details: </span>
                        <span className="text-sm">
                            Account data storage or SSL has been disabled.
                        </span>
                    </div>
                </div>

                <Divider
                    orientation={isMobile ? "horizontal" : "vertical"}
                    flexItem
                    sx={isMobile ? { marginY: 4 } : { marginX: 4 }}
                />

                <div className="flex-1 flex flex-col space-y-4">
                    <div>
                        <span className="font-bold">Payment Status: </span>
                        <span>{data._payment?.paymentStatus}</span>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <span className="font-bold">Fraud Report: </span>
                        <span className="text-sm">AVS: Not Supported (S)</span>
                        <span className="text-sm">CVV: Not Response (x)</span>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <div className="flex space-x-1">
                            {data._payment && (
                                <ReceivePaymentDialog data={data._payment} />
                            )}
                            <Button variant="contained">Authorize</Button>
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
                </div>
            </div>
        </DetailCard>
    );
};

export default PaymentsPage;
