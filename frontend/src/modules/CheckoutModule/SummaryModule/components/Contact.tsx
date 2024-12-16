import type { User } from "@/types/User";
import type { ShippingAddress } from "@/types/Order";

const Address = ({ data }: { data?: ShippingAddress }) => {
    if (!data) {
        return null;
    }

    const { street, postalCode, city, country } = data;

    return (
        <div className="flex flex-col">
            <p>st. {street || "-"}</p>
            <p>
                {postalCode || "-"} {city || "-"}, {country || "-"}
            </p>
        </div>
    );
};

interface ContactProps {
    data?: User;
    addressData: {
        shippingAddress?: ShippingAddress;
        billingAddress?: ShippingAddress;
    };
}

const Contact = ({ data, addressData }: ContactProps) => (
    <div className="space-y-4">
        <div>
            <h3 className="text-lg font-bold mb-1">Delivery Address</h3>
            {data?.address && <Address data={addressData.shippingAddress} />}
        </div>
        <div>
            <h4 className="font-bold mb-1">Phone number</h4>
            <p>{data?.phone}</p>
        </div>
    </div>
);

export default Contact;
