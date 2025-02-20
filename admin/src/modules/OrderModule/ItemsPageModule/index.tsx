import { useMemo } from "react";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import {
    useDeleteBaseItemMutation,
    useRecalculateOrderMutation,
} from "@/store";
import { Divider, useMediaQuery } from "@mui/material";
import Table from "@/components/Table";
import DetailCard from "@/components/DetailCard";
import PaperCard, { PaperCardProps } from "@/components/PaperCard";
import ShipmentContacts from "./components/ShipmentContacts";
import { tableConfig } from "./tableConfig";
import type { ManageAction } from "@/modules/ManageModule/types/Manage";
import type { Order } from "@/types/Order";

interface ItemsPageProps extends ManageAction {
    data: Order;
}

const ItemsPage = ({ data, handleSubTabChange }: ItemsPageProps) => {
    const isMobile = useMediaQuery("(max-width: 1024px)");
    const { handleMutation } = useHandleMutation();

    const [recalculate, { isLoading: isRecalculating }] =
        useRecalculateOrderMutation();
    const [deleteItem, { isLoading: isDeleting }] = useDeleteBaseItemMutation();

    const handleRecalculate = () => {
        handleMutation({
            values: data._id,
            mutation: recalculate,
        });
    };

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
            description:
                "If you modify the items in an order, you may need to recalculate tax and shipping.",
            elements: [
                {
                    label: "Recalculate",
                    onClick: handleRecalculate,
                    isLoading: isRecalculating,
                },
            ],
        },
        {
            description: "Make changes to this shipment",
            elements: [
                {
                    label: "Add Product",
                    onClick: () => handleSubTabChange(1),
                },
                {
                    label: "Add Other Item",
                    onClick: () => handleSubTabChange(2),
                },
            ],
        },
    ];

    return (
        <DetailCard label="Order Contents">
            <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:justify-between">
                <ShipmentContacts
                    billTo={data.billingAddress}
                    shipTo={data.shippingAddress}
                    user={{
                        fullName:
                            data._user?.firstName + " " + data._user?.lastName,
                        phone: data._user?.phone,
                    }}
                />

                <Divider
                    orientation={isMobile ? "horizontal" : "vertical"}
                    flexItem
                    sx={isMobile ? { marginY: 4 } : { marginX: 4 }}
                />

                <div className="flex-1 flex flex-row space-x-6 lg:flex-col lg:space-x-0 lg:space-y-6">
                    {config.map((item) => (
                        <PaperCard
                            key={item.description}
                            description={item.description}
                            elements={item.elements}
                        />
                    ))}
                </div>
            </div>

            <Divider orientation="horizontal" flexItem sx={{ marginY: 4 }} />

            <Table
                headerOptions={tableConfig}
                totalItems={data.items.length}
                rowData={enhancedTableData}
                isLoading={false}
            />
        </DetailCard>
    );
};

export default ItemsPage;
