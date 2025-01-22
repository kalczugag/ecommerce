import type { Order } from "@/types/Order";

interface ShipmentsPageProps {
    data: Order;
}

const ShipmentsPage = ({ data }: ShipmentsPageProps) => {
    return <div>shipments</div>;
};

export default ShipmentsPage;
