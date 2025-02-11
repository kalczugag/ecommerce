import { Button } from "@mui/material";
import Contact from "../../SummaryPageModule/components/Contact";
import type { Shipment, ShippingAddress } from "@/types/Order";
import EditAddressDialog from "./EditAddressDialog";

interface ShipmentContactsProps {
    shipment: Shipment;
    user: { fullName?: string; phone?: string };
}

const ShipmentContacts = ({ shipment, user }: ShipmentContactsProps) => {
    const shipFrom = shipment.shipFrom;
    const shipTo = shipment.shipTo;

    return (
        <div className="flex-1 space-x-2 flex justify-between">
            <Contact label="Ship From" address={shipFrom} className="w-full" />
            <Contact
                label="Ship To"
                address={shipTo}
                contact={user}
                actionButton={<EditAddressDialog shipment={shipment} />}
                className="w-full"
            />
        </div>
    );
};

export default ShipmentContacts;
