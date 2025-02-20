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
import ShipItems from "@/modules/OrderModule/ShipmentsPageModule/tabs/ShipItems";
import AddProduct from "@/modules/OrderModule/ItemsPageModule/tabs/AddProduct";
import type { Manage, ManageAction } from "@/modules/ManageModule/types/Manage";
import type { Order } from "@/types/Order";
import AddOtherItem from "@/modules/OrderModule/ItemsPageModule/tabs/AddOtherItem";

type EnhancedData = Order & ManageAction;

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
        element: ({ handleSubTabChange, ...rest }: EnhancedData) => (
            <ShipmentsPage
                data={rest}
                handleSubTabChange={handleSubTabChange}
            />
        ),
        subTabs: [
            {
                key: "shipments_split",
                label: "Split Shipment",
                element: ({ handleSubTabChange, ...rest }: EnhancedData) => (
                    <SplitShipment
                        data={rest}
                        handleSubTabChange={handleSubTabChange}
                    />
                ),
            },
            {
                key: "shipments_ship",
                label: "Ship Items",
                element: ({ handleSubTabChange, ...rest }: EnhancedData) => (
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
        element: ({ handleSubTabChange, ...rest }: EnhancedData) => (
            <ItemsPage data={rest} handleSubTabChange={handleSubTabChange} />
        ),
        subTabs: [
            {
                key: "items_add",
                label: "Add Product",
                element: ({ handleSubTabChange, ...rest }: EnhancedData) => (
                    <AddProduct
                        orderData={rest}
                        handleSubTabChange={handleSubTabChange}
                    />
                ),
            },
            {
                key: "items_add_other",
                label: "Add Other Item",
                element: ({ handleSubTabChange, ...rest }: EnhancedData) => (
                    <AddOtherItem
                        orderData={rest}
                        handleSubTabChange={handleSubTabChange}
                    />
                ),
            },
        ],
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
