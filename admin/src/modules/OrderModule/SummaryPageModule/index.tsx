import { Divider, useMediaQuery } from "@mui/material";
import type { Order } from "@/types/Order";
import BillingCard from "./components/BillingCard";
import ShippingCard from "./components/ShippingCard";
import PaymentsCard from "./components/PaymentsCard";

interface SummaryPageProps {
    data: Order;
}

const SummaryPage = ({ data }: SummaryPageProps) => {
    const isMobile = useMediaQuery("(max-width: 767px)");

    const divider = isMobile && (
        <Divider
            orientation={isMobile ? "horizontal" : "vertical"}
            flexItem
            sx={isMobile ? { marginY: 4 } : { marginX: 4 }}
        />
    );

    return (
        <div
            className={`grid grid-flow-row grid-cols-1 md:grid-cols-3  ${
                !isMobile && "gap-4"
            }`}
        >
            <BillingCard data={data} />

            {divider}

            {data.shipments.length > 0 && <ShippingCard data={data} />}

            {divider}

            {Array.isArray(data.payments) && data.payments.length > 0 && (
                <PaymentsCard
                    payment={data.payments[0]}
                    orderTotal={data.total}
                />
            )}
        </div>
    );
};

export default SummaryPage;
