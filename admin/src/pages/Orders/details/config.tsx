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

export const config: Manage[] = [
    {
        key: "order_summary",
        label: "Summary",
        element: <SummaryPage />,
    },
    {
        key: "order_payments",
        label: "Payments",
        element: <PaymentsPage />,
    },
    {
        key: "order_shipments",
        label: "Shipments",
        element: <ShipmentsPage />,
    },
    {
        key: "order_items",
        label: "Items",
        element: <ItemsPage />,
    },
    {
        key: "order_returns",
        label: "Returns",
        element: <ReturnsPage />,
    },
    {
        key: "order_notes",
        label: "Notes",
        element: <NotesPage />,
    },
    {
        key: "order_addresses",
        label: "Addresses",
        element: <AddressesPage />,
    },
];
