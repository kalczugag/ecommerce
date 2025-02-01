import { Divider, useMediaQuery } from "@mui/material";
import type { Order } from "@/types/Order";
import BillingCard from "./components/BillingCard";
import ShippingCard from "./components/ShippingCard";
import PaymentsCard from "./components/PaymentsCard";

interface SummaryPageProps {
    data: Order;
}

const SummaryPage = ({ data }: SummaryPageProps) => {
    const isMobile = useMediaQuery("(max-width: 1024px)");

    const divider = isMobile && (
        <Divider
            orientation={isMobile ? "horizontal" : "vertical"}
            flexItem
            sx={isMobile ? { marginY: 4 } : { marginX: 4 }}
        />
    );

    return (
        <div
            className={`grid grid-flow-row grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ${
                !isMobile && "gap-4"
            }`}
        >
            <BillingCard data={data} />

            {divider}

            <ShippingCard data={data} />

            {divider}

            <PaymentsCard data={data} />
        </div>
    );
};

export default SummaryPage;
