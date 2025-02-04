import AddProductDialog from "../../components/AddProductDialog";
import type { TableColumnProps } from "@/modules/CrudModule";
import type { Product } from "@/types/Product";
import type { Shipment } from "@/types/Order";

interface RowProps extends Product {
    isLoading: boolean;
    shipments: Shipment[];
}

export const tableConfig: TableColumnProps<RowProps>[] = [
    {
        label: "id",
        render: (row) => row._id,
    },
    {
        label: "item",
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
        render: ({ shipments, ...rest }) => (
            <AddProductDialog data={rest} shipments={shipments} />
        ),
    },
];
