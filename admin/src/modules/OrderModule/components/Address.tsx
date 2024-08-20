import { Address } from "@/components/TableFields";
import { Button } from "@mui/material";

interface AddressProps {
    address: {
        street: string;
        city: string;
        postalCode: number;
        country: string;
    };
    phone: string;
}

const Contact = ({ address, phone }: AddressProps) => (
    <div className="flex justify-between items-end">
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-bold mb-1">Delivery Address</h3>
                {address && <Address {...address} />}
            </div>
            <div>
                <h4 className="font-bold mb-1">Phone number</h4>
                <p>{phone}</p>
            </div>
        </div>
        <div>
            <Button>Cancel Order</Button>
        </div>
    </div>
);

export default Contact;
