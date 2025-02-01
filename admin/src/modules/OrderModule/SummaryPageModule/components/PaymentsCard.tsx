import DetailCard from "./DetailCard";
import type { Order } from "@/types/Order";

interface PaymentsCardProps {
    data: Order;
}

const PaymentsCard = ({ data }: PaymentsCardProps) => {
    return (
        <DetailCard label="Payments">
            <div>
                <span className="font-bold">Payment Status: </span>
                <span>{data._payment?.paymentStatus}</span>
            </div>
            <div>
                <span className="font-bold">Order Total: </span>
                <span>${data.total.toFixed(2)}</span>
            </div>
            <div
                className={`p-1 rounded text-center text-white font-semibold ${
                    data._payment?.paymentStatus === "completed"
                        ? "bg-green-600"
                        : "bg-orange-500"
                }`}
            >
                {data._payment?.paymentStatus}
            </div>
            <div>
                <span className="font-bold">Last Payment: </span>
                <span>Visa ***9</span>
            </div>
        </DetailCard>
    );
};

export default PaymentsCard;
