import moment from "moment";
import { processShipments } from "@/utils/processFunctions";
import DetailCard from "@/components/DetailCard";
import StatusChip from "@/components/StatusChip";
import Contact from "./Contact";
import type { Order } from "@/types/Order";

interface ShippingCardProps {
    data: Order;
}

const ShippingCard = ({ data }: ShippingCardProps) => {
    const { shipmentTotal } = processShipments(data.shipments);

    return (
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

            <StatusChip status={data.status || ""} type="order" />
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
    );
};

export default ShippingCard;
