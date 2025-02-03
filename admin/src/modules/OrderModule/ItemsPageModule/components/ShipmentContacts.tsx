import Contact from "../../SummaryPageModule/components/Contact";
import type { ShippingAddress } from "@/types/Order";

interface ShipmentContactsProps {
    billTo: ShippingAddress;
    shipTo: ShippingAddress;
    user: { fullName?: string; phone?: string };
}

const ShipmentContacts = ({ billTo, shipTo, user }: ShipmentContactsProps) => {
    return (
        <div className="flex-1 flex justify-between">
            <Contact
                label="Bill To"
                address={billTo}
                contact={user}
                className="w-full"
            />
            <Contact label="Ship To" address={shipTo} className="w-full" />
        </div>
    );
};

export default ShipmentContacts;
