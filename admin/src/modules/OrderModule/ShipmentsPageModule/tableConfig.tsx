import UnderlineLink from "@/components/UnderlineLink";
import type { Item } from "@/types/Order";
import type { TableColumnProps } from "@/modules/CrudModule";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import EditItemDialog from "./components/EditItemDialog";

interface RowProps extends Item {
    isLoading: boolean;
    handleEdit: () => void;
    handleDelete: () => void;
}

export const tableConfig: TableColumnProps<RowProps>[] = [
    {
        label: "SKU",
        render: (row) => row._product.sku,
    },
    {
        label: "item",
        render: (row) => (
            <UnderlineLink to={`/products/${row._product._id}`}>
                {row._product.title}
            </UnderlineLink>
        ),
    },
    {
        label: "Price",
        render: (row) => `$${row.unitPrice.toFixed(2)}`,
    },
    {
        label: "Quantity",
        render: (row) => row.quantity,
    },
    {
        label: "Total",
        render: (row) => `$${row.total.toFixed(2)}`,
    },
    {
        label: "Actions",

        render: (row) => (
            <div className="flex justify-end">
                <EditItemDialog item={row} />
                <IconButton>
                    <Delete />
                </IconButton>
            </div>
        ),
    },
];
