import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import { Box, SvgIcon } from "@mui/material";
import { RichTreeView, TreeViewBaseItem, TreeItem } from "@mui/x-tree-view";

interface CustomTreeItem extends TreeViewBaseItem {
    hasNew?: boolean;
    children?: CustomTreeItem[];
}

const items: CustomTreeItem[] = [
    {
        id: "orders",
        label: "Orders",
        children: [
            { id: "placed", label: "Placed", hasNew: true },
            { id: "confirmed", label: "Confirmed" },
            { id: "shipped", label: "Shipped" },
            { id: "delivered", label: "Delivered", hasNew: true },
            { id: "canceled", label: "Canceled" },
            { id: "pending payment", label: "Pending payment" },
            { id: "returned", label: "Returned" },
        ],
    },
];

const SmallCircle = ({ color = "green" }: { color?: string }) => {
    return (
        <SvgIcon viewBox="0 0 10 10" sx={{ fontSize: 10 }}>
            <circle cx="5" cy="5" r="2" fill={color} />
        </SvgIcon>
    );
};

const OrdersTreeView = () => {
    return (
        <Box
            sx={{ minHeight: 352, maxWidth: 250 }}
            className="flex-1 flex flex-col min-w-60 space-y-1 p-4 border rounded-lg bg-[#F5F6FA] dark:border-0 dark:bg-darker"
        >
            <RichTreeView
                defaultExpandedItems={["orders"]}
                slots={{
                    expandIcon: KeyboardArrowRight,
                    collapseIcon: KeyboardArrowDown,
                    endIcon: SmallCircle,
                    item: TreeItem,
                }}
                items={items}
            />
        </Box>
    );
};

export default OrdersTreeView;
