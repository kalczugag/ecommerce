import { processShipments } from "@/utils/processShipments";
import { Divider, useMediaQuery } from "@mui/material";
import { InsertPageBreak } from "@mui/icons-material";
import Table from "@/components/Table";
import DetailCard from "../SummaryPageModule/components/DetailCard";
import PaperCard, { PaperCardProps } from "./components/PaperCard";
import ShipmentActions from "./components/ShipmentActions";
import ShipmentMethod from "./components/ShipmentMethod";
import ShipmentContacts from "./components/ShipmentContacts";
import { tableConfig } from "./tableConfig";
import type { Order } from "@/types/Order";
import type { ManageAction } from "@/modules/ManageModule/types/Manage";

interface ShipmentsPageProps extends ManageAction {
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

const ShipmentsPage = ({ data, handleSubTabChange }: ShipmentsPageProps) => {
    const isMobile = useMediaQuery("(max-width: 1024px)");
    const isTablet = useMediaQuery("(max-width: 1280px)");
    const { shipmentCount, isMoreThanOne, shipments } = processShipments(
        data._shipment
    );

    const enhancedTableData = data.items
        ? data.items.map((row) => ({
              ...row,
              handleDelete: () => console.log("x"),
          }))
        : data.items;

    const shipmentLabel = `Shipment #${
        isMoreThanOne
            ? shipments?.findIndex(
                  (shipment) => shipment._id === data._shipment[0]._id
              )
            : "1"
    } of ${shipmentCount}`;

    const handler = () => {
        console.log("click");
    };

    return (
        <div className="flex flex-col space-y-4">
            {shipments.map((shipment, index) => (
                <DetailCard
                    key={shipment._id}
                    index={index}
                    label={shipmentLabel}
                    variant="accordion"
                >
                    <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:justify-between">
                        <ShipmentContacts
                            shipFrom={shipments[index].shipFrom}
                            shipTo={shipments[index].shipTo}
                            user={{
                                fullName:
                                    data._user?.firstName +
                                    " " +
                                    data._user?.lastName,
                                phone: data._user?.phone,
                            }}
                            onEditAddress={handler}
                        />

                        <Divider
                            orientation={isMobile ? "horizontal" : "vertical"}
                            flexItem
                            sx={isMobile ? { marginY: 4 } : { marginX: 4 }}
                        />

                        <div className="flex-1 flex flex-col xl:flex-row xl:justify-between">
                            <div className="flex flex-col space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <span className="font-bold">
                                            Status:{" "}
                                        </span>
                                        <span>{shipments[index].status}</span>
                                    </div>
                                    <ShipmentActions
                                        isMobile={isMobile}
                                        onShipItems={() =>
                                            handleSubTabChange(2, {
                                                shipmentIndex: index.toString(),
                                            })
                                        }
                                        onEdit={handler}
                                        onSplit={() => handleSubTabChange(1)}
                                    />
                                </div>
                                <ShipmentMethod
                                    deliveryMethod={
                                        shipments[index]._deliveryMethod
                                    }
                                />
                            </div>

                            <Divider
                                orientation={
                                    isTablet ? "horizontal" : "vertical"
                                }
                                flexItem
                                sx={isTablet ? { marginY: 4 } : { marginX: 4 }}
                            />

                            <div className="flex flex-row space-x-6 lg:flex-col lg:space-x-0 lg:space-y-6">
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

                    <Divider
                        orientation="horizontal"
                        flexItem
                        sx={{ marginY: 4 }}
                    />

                    <Table
                        headerOptions={tableConfig}
                        totalItems={data.items.length}
                        rowData={enhancedTableData}
                        isLoading={false}
                    />
                </DetailCard>
            ))}
        </div>
    );
};

export default ShipmentsPage;
