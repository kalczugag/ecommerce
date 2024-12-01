import OrderAddressSkeleton from "./OrderAddressSkeleton";
import type { Address } from "@/types/User";

interface OrderAddressProps {
    name: string;
    address?: Address;
    isLoading: boolean;
}

const OrderAddress = ({ name, address, isLoading }: OrderAddressProps) => {
    return (
        <div className="flex flex-col space-y-6">
            <h2 className="text-2xl font-semibold">Delivery address</h2>
            {isLoading ? (
                <OrderAddressSkeleton />
            ) : (
                <div className="flex flex-col">
                    <p>{name}</p>
                    <p>{address?.street}</p>
                    <p>
                        {address?.postalCode} {address?.city},{" "}
                        {address?.country}
                    </p>
                </div>
            )}
        </div>
    );
};

export default OrderAddress;
