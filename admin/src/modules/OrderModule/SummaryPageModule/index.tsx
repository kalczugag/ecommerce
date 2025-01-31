import moment from "moment";
import { Divider, useMediaQuery } from "@mui/material";
import { processShipments } from "@/utils/processShipments";
import DetailCard from "./components/DetailCard";
import Contact from "./components/Contact";
import type { Order } from "@/types/Order";

interface SummaryPageProps {
    data: Order;
}

const SummaryPage = ({ data }: SummaryPageProps) => {
    const isMobile = useMediaQuery("(max-width: 1024px)");

    const { shipmentTotal } = processShipments(data._shipment);

    const divider = isMobile && (
        <Divider
            orientation={isMobile ? "horizontal" : "vertical"}
            flexItem
            sx={isMobile ? { marginY: 4 } : { marginX: 4 }}
        />
    );

    return (
        <div
            className={`grid grid-flow-row grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ${
                !isMobile && "gap-4"
            }`}
        >
            <DetailCard label="Billing">
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
                <Contact
                    address={data.billingAddress}
                    contact={{
                        fullName:
                            data._user?.firstName + " " + data._user?.lastName,
                        email: data._user?.email,
                        phone: data._user?.phone,
                    }}
                />
            </DetailCard>

            {divider}

            <DetailCard label="Shipping">
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
                        {shipmentTotal === 0
                            ? "Free shipping"
                            : `$${shipmentTotal}`}
                    </span>
                </div>
                <Contact
                    address={data.billingAddress}
                    contact={{
                        fullName:
                            data._user?.firstName + " " + data._user?.lastName,
                        phone: data._user?.phone,
                    }}
                />
            </DetailCard>

            {divider}

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
