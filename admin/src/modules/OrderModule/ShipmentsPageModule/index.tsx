import { processShipments } from "@/utils/processFunctions";
import { Divider, useMediaQuery } from "@mui/material";
import { InsertPageBreak } from "@mui/icons-material";
import Table from "@/components/Table";
import NotFound from "@/components/NotFound";
import { PaperCardProps } from "@/components/PaperCard";
import { tableConfig } from "./tableConfig";
import type { Order } from "@/types/Order";
import type { ManageAction } from "@/modules/ManageModule/types/Manage";
import ShipmentDetail from "./components/ShipmentDetail";

interface ShipmentsPageProps extends ManageAction {
    data: Order;
}

const config: PaperCardProps[] = [
    {
        description: "Print for this shipment",
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
        description: "Make changes to this shipment",
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
    const { shipmentCount, shipments } = processShipments(data.shipments);

    const enhancedTableData = data.items
        ? data.items.map((row) => ({
              ...row,
              handleDelete: () => console.log("x"),
          }))
        : data.items;

    return (
        <div className="flex flex-col space-y-4">
            {shipments ? (
                shipments.map((shipment, index) => (
                    <ShipmentDetail
                        key={shipment._id}
                        shipment={shipment}
                        shipmentIndex={index}
                        shipmentCount={shipmentCount}
                        user={{
                            fullName: `${data._user?.firstName} ${data._user?.lastName}`,
                            phone: data._user?.phone,
                        }}
                        config={config}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        handleSubTabChange={handleSubTabChange}
                    />
                ))
            ) : (
                <NotFound title="No shipments found" />
            )}
            <Divider orientation="horizontal" flexItem sx={{ marginY: 4 }} />

            <Table
                headerOptions={tableConfig}
                totalItems={data.items.length}
                rowData={enhancedTableData}
                isLoading={false}
            />
        </div>
    );
};

export default ShipmentsPage;
