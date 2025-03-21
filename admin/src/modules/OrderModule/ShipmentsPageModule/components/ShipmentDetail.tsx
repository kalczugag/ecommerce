import { ReactNode } from "react";
import DetailCard from "@/components/DetailCard";
import ShipmentContacts from "./ShipmentContacts";
import { Divider } from "@mui/material";
import ShipmentActions from "./ShipmentActions";
import ShipmentMethod from "./ShipmentMethod";
import PaperCard from "@/components/PaperCard";
import type { Shipment } from "@/types/Order";
import type { PaperCardProps } from "@/components/PaperCard";

interface ShipmentDetailProps {
    shipment: Shipment;
    shipmentIndex: number;
    shipmentCount: number;
    user: { fullName: string; phone?: string };
    config: PaperCardProps[];
    isMobile: boolean;
    isTablet: boolean;
    children?: ReactNode;
    handleSubTabChange: (tab: number, options?: any) => void;
    triggerFetch?: any;
}

const ShipmentDetail = ({
    shipment,
    shipmentIndex,
    shipmentCount,
    user,
    config,
    isMobile,
    isTablet,
    children,
    handleSubTabChange,
    triggerFetch,
}: ShipmentDetailProps) => {
    return (
        <DetailCard
            key={shipment._id}
            defaultExpanded={shipmentIndex === 0}
            label={`Shipment #${shipmentIndex + 1} of ${shipmentCount}`}
            variant="accordion"
            fetchOnMount={() => triggerFetch(shipment._id, 1)}
        >
            <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:justify-between">
                <ShipmentContacts
                    shipment={shipment}
                    user={{
                        fullName: user.fullName,
                        phone: user.phone,
                    }}
                />

                <Divider
                    orientation={isMobile ? "horizontal" : "vertical"}
                    flexItem
                    sx={isMobile ? { marginY: 4 } : { marginX: 4 }}
                />

                <div className="flex-1 flex flex-col 2xl:flex-row 2xl:justify-between">
                    <div className="flex flex-col space-y-6">
                        <div className="space-y-4">
                            <div>
                                <span className="font-bold">Status: </span>
                                <span>{shipment.status}</span>
                            </div>
                            <ShipmentActions
                                onShipItems={() =>
                                    handleSubTabChange(2, {
                                        shipmentIndex: shipmentIndex.toString(),
                                    })
                                }
                                onEdit={() => {}}
                                onSplit={() => handleSubTabChange(1)}
                            />
                        </div>
                        <ShipmentMethod
                            trackingNumber={shipment.trackingNumber}
                            deliveryMethod={shipment._deliveryMethod}
                        />
                    </div>

                    <Divider
                        orientation={isTablet ? "horizontal" : "vertical"}
                        flexItem
                        sx={isTablet ? { marginY: 4 } : { marginX: 4 }}
                    />

                    <div className="flex flex-row flex-wrap gap-6">
                        {config.map((item) => (
                            <PaperCard
                                key={item.description}
                                description={item.description}
                                elements={item.elements}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {children && children}
        </DetailCard>
    );
};

export default ShipmentDetail;
