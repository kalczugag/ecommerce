import type { Order } from "@/types/Order";

interface PaymentsPageProps {
    data: Order;
}

const PaymentsPage = ({ data }: PaymentsPageProps) => {
    return <div>payments</div>;
};

export default PaymentsPage;
