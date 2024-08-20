import type { Order } from "@/types/Order";

interface StatusProps {
    status: Order["status"];
}

const Status = ({ status }: StatusProps) => {
    const bgColor =
        status === "placed"
            ? "bg-blue-700"
            : status === "shipped"
            ? "bg-green-700"
            : status === "delivered"
            ? "bg-yellow-700"
            : status === "cancelled"
            ? "bg-red-700"
            : "bg-cyan-700";

    return (
        <div
            className={`${bgColor} text-center p-1 px-2 rounded-xl text-light-primary dark:text-text-dark`}
        >
            {status}
        </div>
    );
};

export default Status;
