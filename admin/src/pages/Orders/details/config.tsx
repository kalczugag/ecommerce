import {
    SummaryPage,
    PaymentsPage,
    ShipmentsPage,
    ItemsPage,
    ReturnsPage,
    NotesPage,
    AddressesPage,
} from "@/modules/ManageModule/pages";
import type { Manage } from "@/modules/ManageModule/types/Manage";
import type { Order } from "@/types/Order";

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
        element: (props: Order) => <ShipmentsPage data={props} />,
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
