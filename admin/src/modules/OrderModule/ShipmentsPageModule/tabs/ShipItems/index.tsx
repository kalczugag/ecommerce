import { useSearchParams } from "react-router-dom";
import { Form } from "react-final-form";
import { useEditShipmentMutation } from "@/store";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import { deliveryMethods } from "@/constants/deliveryMethods";
import DetailCard from "@/components/DetailCard";
import Contact from "@/modules/OrderModule/SummaryPageModule/components/Contact";
import { Divider, useMediaQuery } from "@mui/material";
import EnterTrackingNumber from "../../components/EnterTrackingNumber";
import type { ManageAction } from "@/modules/ManageModule/types/Manage";
import Table from "@/components/Table";
import type { Order } from "@/types/Order";
import { tableConfig } from "./tableConfig";
import { enqueueSnackbar } from "notistack";
import { useMemo } from "react";

interface ShipItemsProps extends ManageAction {
    data: Order;
}

interface FormProps {
    trackingNumber: string;
}

const ShipItems = ({ data, handleSubTabChange }: ShipItemsProps) => {
    const [searchParams] = useSearchParams();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const { handleMutation } = useHandleMutation();
    const [editShipment, { isLoading }] = useEditShipmentMutation();

    const shipmentIndex = parseInt(searchParams.get("shipmentIndex") || "0");

    const shipment = data.shipments[shipmentIndex];
    const shipFrom = shipment.shipFrom;
    const shipTo = shipment.shipTo;
    const user = {
        fullName: data._user?.firstName + " " + data._user?.lastName,
        phone: data._user?.phone,
    };

    const methodName =
        deliveryMethods[shipment._deliveryMethod.type] +
        " - " +
        shipment._deliveryMethod.providers[0].name;

    const handleSubmit = (values: FormProps) => {
        const { trackingNumber, ...items } = values;

        const itemsArray = Object.entries(items).map(([key]) => key);

        if (itemsArray.length === 0) {
            enqueueSnackbar("No items selected", { variant: "warning" });
            return;
        }

        const updatedShipment = {
            trackingNumber,
            status: "shipped",
            items: itemsArray,
        };

        handleMutation({
            values: { _id: shipment._id, ...updatedShipment },
            mutation: editShipment,
        });
    };
    const shippedProductIds = new Set(
        shipment.items.map((item) => item._product.toString())
    );

    const enhancedTableData = useMemo(() => {
        return data.items.map((row) => ({
            ...row,
            isShippedItem: shippedProductIds.has(row._product._id || ""),
        }));
    }, [data.items, shipment.items]);

    return (
        <DetailCard label="Ship Items">
            <Form
                initialValues={{
                    trackingNumber: shipment.trackingNumber,
                }}
                onSubmit={handleSubmit}
                render={({ handleSubmit, form }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row">
                            <div className="flex-1 flex justify-between">
                                <Contact
                                    label="Ship From"
                                    address={shipFrom}
                                    additionalInfo={
                                        <div>
                                            <span className="font-semibold">
                                                Method:{" "}
                                            </span>
                                            <span>{methodName}</span>
                                        </div>
                                    }
                                />
                                <Contact
                                    label="Ship To"
                                    address={shipTo}
                                    contact={user}
                                />
                            </div>

                            <Divider
                                orientation={
                                    isMobile ? "horizontal" : "vertical"
                                }
                                flexItem
                                sx={isMobile ? { marginY: 4 } : { marginX: 4 }}
                            />

                            <EnterTrackingNumber
                                data={data.shipments[shipmentIndex]}
                                handleBack={() => handleSubTabChange(0)}
                                form={form}
                                isLoading={isLoading}
                            />
                        </div>

                        <Divider
                            orientation="horizontal"
                            flexItem
                            sx={{ marginY: 4 }}
                        />

                        <p className="text-sm mb-4">
                            If needed, change the quantity of items to ship.
                            Remaining item(s) will be moved to create a new
                            shipment.
                        </p>
                        <Table
                            headerOptions={tableConfig}
                            totalItems={data.items.length}
                            rowData={enhancedTableData}
                            isLoading={false}
                        />
                    </form>
                )}
            />
        </DetailCard>
    );
};

export default ShipItems;
