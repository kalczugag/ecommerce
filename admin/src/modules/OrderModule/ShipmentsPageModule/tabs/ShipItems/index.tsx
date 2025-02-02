import { useSearchParams } from "react-router-dom";
import DetailCard from "@/modules/OrderModule/SummaryPageModule/components/DetailCard";
import Contact from "@/modules/OrderModule/SummaryPageModule/components/Contact";
import EnterTrackingNumber from "../../components/EnterTrackingNumber";
import type { ManageAction } from "@/modules/ManageModule/types/Manage";
import type { Order } from "@/types/Order";
import { Divider, useMediaQuery } from "@mui/material";

interface ShipItemsProps extends ManageAction {
    data: Order;
}

const ShipItems = ({ data, handleSubTabChange }: ShipItemsProps) => {
    const [searchParams] = useSearchParams();
    const isMobile = useMediaQuery("(max-width: 768px)");

    const shipmentIndex = parseInt(searchParams.get("shipmentIndex") || "0");

    const shipFrom = data._shipment[shipmentIndex].shipFrom;
    const shipTo = data._shipment[shipmentIndex].shipTo;
    const user = {
        fullName: data._user?.firstName + " " + data._user?.lastName,
        phone: data._user?.phone,
    };

    return (
        <DetailCard label="Ship Items">
            <div className="flex flex-col md:flex-row">
                <div className="flex-1 flex justify-between">
                    <Contact label="Ship From" address={shipFrom} />
                    <Contact label="Ship To" address={shipTo} contact={user} />
                </div>

                <Divider
                    orientation={isMobile ? "horizontal" : "vertical"}
                    flexItem
                    sx={isMobile ? { marginY: 4 } : { marginX: 4 }}
                />

                <EnterTrackingNumber
                    data={data._shipment[shipmentIndex]}
                    handleBack={() => handleSubTabChange(0)}
                />
            </div>
        </DetailCard>
    );
};

export default ShipItems;
