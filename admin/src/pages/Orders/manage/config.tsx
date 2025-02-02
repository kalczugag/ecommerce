import {
    SummaryPage,
    PaymentsPage,
    ShipmentsPage,
    ItemsPage,
    ReturnsPage,
    NotesPage,
    AddressesPage,
} from "@/modules/OrderModule";
import SplitShipment from "@/modules/OrderModule/ShipmentsPageModule/tabs/SplitShipment";
import type { Manage, ManageAction } from "@/modules/ManageModule/types/Manage";
import type { Order } from "@/types/Order";
import ShipItems from "@/modules/OrderModule/ShipmentsPageModule/tabs/ShipItems";

export const config: Manage[] = [
    {
        key: "order_summary",
        label: "Summary",
        element: (props: Order) => <SummaryPage data={props} />,
    },
    {
        key: "order_payments",
        label: "Payments",
        element: (props: Order) => <PaymentsPage data={props} />,
    },
    {
        key: "order_shipments",
        label: "Shipments",
        element: ({ handleSubTabChange, ...rest }: Order & ManageAction) => (
            <ShipmentsPage
                data={rest}
                handleSubTabChange={handleSubTabChange}
            />
        ),
        subTabs: [
            {
                key: "shipments_split",
                label: "Split Shipment",
                element: ({
                    handleSubTabChange,
                    ...rest
                }: Order & ManageAction) => (
                    <SplitShipment
                        data={rest}
                        handleSubTabChange={handleSubTabChange}
                    />
                ),
            },
            {
                key: "shipments_ship",
                label: "Ship Items",
                element: ({
                    handleSubTabChange,
                    ...rest
                }: Order & ManageAction) => (
                    <ShipItems
                        data={rest}
                        handleSubTabChange={handleSubTabChange}
                    />
                ),
            },
        ],
    },
    {
        key: "order_items",
        label: "Items",
        element: (props: Order) => <ItemsPage data={props} />,
    },
    {
        key: "order_returns",
        label: "Returns",
        element: (props: Order) => <ReturnsPage data={props} />,
    },
    {
        key: "order_notes",
        label: "Notes",
        element: (props: Order) => <NotesPage data={props} />,
    },
    {
        key: "order_addresses",
        label: "Addresses",
        element: (props: Order) => <AddressesPage data={props} />,
    },
];
