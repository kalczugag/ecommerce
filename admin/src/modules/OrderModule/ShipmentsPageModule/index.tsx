import { useMemo } from "react";
import { useDeleteBaseItemMutation } from "@/store";
import { useHandleMutation } from "@/hooks/useHandleMutation";
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

const ShipmentsPage = ({ data, handleSubTabChange }: ShipmentsPageProps) => {
    const isMobile = useMediaQuery("(max-width: 1024px)");
    const isTablet = useMediaQuery("(max-width: 1536px)");
    const { handleMutation } = useHandleMutation();

    const [deleteItem, { isLoading: isDeleting }] = useDeleteBaseItemMutation();

    const { shipmentCount, shipments } = processShipments(data.shipments);

    const enhancedTableData = useMemo(() => {
        const handleDelete = (id: string) => {
            handleMutation({
                values: { itemId: id, orderId: data._id },
                mutation: deleteItem,
            });
        };

        return data.items
            ? data.items.map((row) => ({
                  ...row,
                  isLoading: isDeleting,
                  handleDelete,
              }))
            : [];
    }, [data.items, isDeleting]);

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
                    onClick: () =>
                        handleSubTabChange(1, {
                            tab: "3",
                        }),
                },
                {
                    label: "Add Other Item",
                    onClick: () =>
                        handleSubTabChange(2, {
                            tab: "3",
                        }),
                },
            ],
        },
    ];

    return (
        <div className="flex flex-col space-y-4">
            {shipments.length > 0 ? (
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
                    >
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
                    </ShipmentDetail>
                ))
            ) : (
                <NotFound title="No shipments found" />
            )}
        </div>
    );
};

export default ShipmentsPage;
function handleMutation(arg0: {
    values: { itemId: string; orderId: string | undefined };
    mutation: any;
}) {
    throw new Error("Function not implemented.");
}
