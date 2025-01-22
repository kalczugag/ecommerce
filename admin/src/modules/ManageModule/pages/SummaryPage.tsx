import type { Order } from "@/types/Order";
import DetailCard from "../components/DetailCard";
import moment from "moment";

interface SummaryPageProps {
    data: Order;
}

const SummaryPage = ({ data }: SummaryPageProps) => {
    return (
        <div className="flex justify-between space-x-8">
            <DetailCard
                label="Billing"
                address={data.billingAddress}
                contact={{
                    fullName:
                        data._user?.firstName + " " + data._user?.lastName,
                    email: data._user?.email,
                    phone: data._user?.phone,
                }}
            >
                <div>
                    <span className="font-bold">Order Date: </span>
                    <span>
                        {moment(data.createdAt).format("DD/MM/YYYY, HH:mm")}
                    </span>
                </div>
                <div>
                    <span className="font-bold">Order Status: </span>
                    <span>{data.status}</span>
                </div>
            </DetailCard>

            <DetailCard
                label="Shipping"
                address={data.billingAddress}
                contact={{
                    fullName:
                        data._user?.firstName + " " + data._user?.lastName,
                    phone: data._user?.phone,
                }}
            >
                <div>
                    <span className="font-bold">Order Date: </span>
                    <span>
                        {moment(data.createdAt).format("DD/MM/YYYY, HH:mm")}
                    </span>
                </div>
                <div>
                    <span className="font-bold">Last Shipment: </span>
                    <span>None</span>
                </div>
                <div
                    className={`p-1 rounded text-center text-white font-semibold ${
                        data.status === "delivered"
                            ? "bg-green-600"
                            : "bg-orange-500"
                    }`}
                >
                    items {data.status}
                </div>
                <div>
                    <span className="font-bold">Shipping Cost: </span>
                    <span>
                        {data.deliveryCost === 0
                            ? "Free shipping"
                            : `$${data.deliveryCost.toFixed(2)}`}
                    </span>
                </div>
            </DetailCard>

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
        </div>
    );
};

export default SummaryPage;
