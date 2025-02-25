import AddProductDialog from "../../components/AddProductDialog";
import type { TableColumnProps } from "@/modules/CrudModule";
import { Shipment } from "@/types/Order";
import type { Product } from "@/types/Product";

interface RowProps extends Product {
    shipments: Shipment[];
    isLoading: boolean;
}

export const tableConfig: TableColumnProps<RowProps>[] = [
    {
        label: "SKU",
        render: (row) => row.sku,
    },
    {
        label: "Item",
        render: (row) => row.title,
    },
    {
        label: "Price",
        render: (row) => `$${row.price.toFixed(2)}`,
    },
    {
        label: "Quantity",
        render: (row) => `${row.quantity} pcs.`,
    },
    {
        label: "Add Item",
        render: (row) => <AddProductDialog data={row} />,
    },
];
