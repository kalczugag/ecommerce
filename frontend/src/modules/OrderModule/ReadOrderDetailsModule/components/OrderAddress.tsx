import type { Address } from "@/types/User";

interface OrderAddressProps {
    name: string;
    address?: Address;
}

const OrderAddress = ({ name, address }: OrderAddressProps) => {
    return (
        <div className="flex flex-col space-y-6">
            <h2 className="text-2xl font-bold">Delivery address</h2>
            <div className="flex flex-col">
                <p>{name}</p>
                <p>{address?.street}</p>
                <p>
                    {address?.postalCode} {address?.city}, {address?.country}
                </p>
            </div>
        </div>
    );
};

export default OrderAddress;
