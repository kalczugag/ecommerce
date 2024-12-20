import type { ShippingAddress } from "@/types/Order";

const Address = ({ street, city, postalCode, country }: ShippingAddress) => {
    return (
        <div className="flex flex-col">
            <p>st. {street || "-"}</p>
            <p>
                {postalCode || "-"} {city || "-"}, {country || "-"}
            </p>
        </div>
    );
};

export default Address;
