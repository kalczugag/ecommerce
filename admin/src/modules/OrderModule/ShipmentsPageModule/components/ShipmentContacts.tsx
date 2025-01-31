import { Button } from "@mui/material";
import Contact from "../../SummaryPageModule/components/Contact";
import type { ShippingAddress } from "@/types/Order";

interface ShipmentContactsProps {
    shipFrom: ShippingAddress;
    shipTo: ShippingAddress;
    user: { fullName?: string; phone?: string };
    onEditAddress: () => void;
}

const ShipmentContacts = ({
    shipFrom,
    shipTo,
    user,
    onEditAddress,
}: ShipmentContactsProps) => {
    return (
        <div className="flex-1 flex justify-between">
            <Contact label="Ship From" address={shipFrom} className="w-full" />
            <Contact
                label="Ship To"
                address={shipTo}
                contact={user}
                actionButton={
                    <Button variant="outlined" onClick={onEditAddress}>
                        Edit Address
                    </Button>
                }
                className="w-full"
            />
        </div>
    );
};

export default ShipmentContacts;
