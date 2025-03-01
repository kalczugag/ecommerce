import OrderAddressSkeleton from "./OrderAddressSkeleton";
import type { ShippingAddress } from "@/types/Order";

interface OrderAddressProps {
    label: string;
    name: string;
    address?: ShippingAddress;
    isLoading: boolean;
}

const OrderAddress = ({
    label,
    name,
    address,
    isLoading,
}: OrderAddressProps) => {
    return (
        <div className="flex flex-col space-y-6">
            <h2 className="text-2xl font-semibold">{label}</h2>
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
