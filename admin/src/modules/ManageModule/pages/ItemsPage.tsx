import type { Order } from "@/types/Order";

interface ItemsPageProps {
    data: Order;
}

const ItemsPage = ({ data }: ItemsPageProps) => {
    return <div>Items</div>;
};

export default ItemsPage;
