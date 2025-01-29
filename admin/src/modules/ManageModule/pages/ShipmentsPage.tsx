import type { Order } from "@/types/Order";
import { processShipments } from "@/utils/processShipments";
import { Button, Divider, useMediaQuery } from "@mui/material";
import { InsertPageBreak } from "@mui/icons-material";
import DetailCard from "../components/DetailCard";
import Contact from "../components/Contact";
import PaperCard, { PaperCardProps } from "../components/PaperCard";

interface ShipmentsPageProps {
    data: Order;
}

const config: PaperCardProps[] = [
    {
        label: "Print for this shipment",
        elements: [
            {
                label: "Packing Slip",
                icon: <InsertPageBreak />,
                onClick: () => {},
            },
            {
                label: "Pull Sheet",
                icon: <InsertPageBreak />,
                onClick: () => {},
            },
        ],
    },
    {
        label: "Make changes to this shipment",
        elements: [
            {
                label: "Add Product",
                onClick: () => {},
            },
            {
                label: "Add Other Item",
                onClick: () => {},
            },
        ],
    },
];

const ShipmentsPage = ({ data }: ShipmentsPageProps) => {
    const isMobile = useMediaQuery("(max-width: 768px)");

    const { shipmentCount, isMoreThanOne, shipments } = processShipments(
        data._shipment
    );

    const shipmentLabel = `Shipment #${
        isMoreThanOne
            ? shipments?.findIndex(
                  (shipment) => shipment._id === data._shipment[0]._id
              )
            : "1"
    } of ${shipmentCount}`;

    const divider = (
        <Divider
            orientation={isMobile ? "horizontal" : "vertical"}
            flexItem
            sx={isMobile ? { marginY: 4 } : { marginX: 4 }}
        />
    );

    return (
        <div className="flex flex-col space-y-4">
            {shipments.map((shipment, index) => (
                <DetailCard
                    key={shipment._id}
                    index={index}
                    label={shipmentLabel}
                    variant="accordion"
                >
                    <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:justify-between">
                        <div className="flex-1 flex justify-between">
                            <Contact
                                label="Ship From"
                                address={shipments[index].shipFrom}
                                className="w-full"
                            />
                            <Contact
                                label="Ship To"
                                address={shipments[index].shipTo}
                                contact={{
                                    fullName:
                                        data._user?.firstName +
                                        " " +
                                        data._user?.lastName,
                                    phone: data._user?.phone,
                                }}
                                actionButton={
                                    <Button variant="outlined">
                                        Edit Address
                                    </Button>
                                }
                                className="w-full"
                            />
                        </div>

                        {divider}

                        <div className="flex-1 flex flex-col md:flex-row md:justify-between">
                            <div className="flex flex-col space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <span className="font-bold">
                                            Status:{" "}
                                        </span>
                                        <span>{shipments[index].status}</span>
                                    </div>
                                    <Button variant="contained" fullWidth>
                                        Ship Items
                                    </Button>
                                    <div className="flex space-x-1">
                                        <Button variant="outlined" fullWidth>
                                            Edit
                                        </Button>
                                        <Button variant="outlined" fullWidth>
                                            Split
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <span className="font-bold">
                                            Method:{" "}
                                        </span>
                                        <span>
                                            {
                                                shipments[index]._deliveryMethod
                                                    .providers[0].name
                                            }
                                        </span>
                                    </div>
                                    <div className="flex space-x-1">
                                        <Button variant="outlined">
                                            Change Method
                                        </Button>
                                        <Button variant="outlined">
                                            Recalculate
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {divider}

                            <div className="flex flex-col space-y-6">
                                {config.map((item) => (
                                    <PaperCard
                                        key={item.label}
                                        label={item.label}
                                        elements={item.elements}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </DetailCard>
            ))}
        </div>
    );
};

export default ShipmentsPage;
